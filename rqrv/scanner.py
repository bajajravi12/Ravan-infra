import requests
import urllib3
import socket
try:
    import httpx
    HAS_HTTPX = True
except ImportError:
    HAS_HTTPX = False

from .detector import identify_infra
from .output import save_result
from .utils import reverse_dns

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

class Scanner:
    def __init__(self, settings, session_file=None):
        self.settings = settings
        self.session_file = session_file
        self.session = requests.Session()
        self.dns_cache = {}
        self.rdns_cache = {}
        self.adapter = requests.adapters.HTTPAdapter(
            pool_connections=settings['threads'], 
            pool_maxsize=settings['threads'],
            max_retries=settings.get('retries', 0)
        )
        self.session.mount('http://', self.adapter)
        self.session.mount('https://', self.adapter)
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
        })
        self.ports = [80, 443, 2052, 2053, 2082, 2083, 2086, 2087, 2095, 2096, 8080, 81, 8443, 8880]

    def get_ip(self, domain):
        if domain in self.dns_cache:
            return self.dns_cache[domain]
        try:
            ip = socket.gethostbyname(domain)
            self.dns_cache[domain] = ip
            return ip
        except:
            return "0.0.0.0"

    def scan_port(self, domain, port):
        # Determine protocol based on port
        is_https = port in [443, 2053, 2083, 2087, 2096, 8443]
        protocols = ["https://", "http://"] if is_https else ["http://", "https://"]
        
        # Live status codes that indicate a responsive bug host
        live_codes = [101, 200, 201, 204, 301, 302, 307, 308, 400, 401, 403, 404, 405]
        
        last_error = None

        for proto in protocols:
            url = f"{proto}{domain}:{port}"
            
            # Implementation of multiple detection strategies
            strategies = [
                # Strategy 1: Standard clean request
                {"method": "GET", "headers": None},
                # Strategy 2: Websocket Upgrade request
                {"method": "GET", "headers": {'Connection': 'Upgrade', 'Upgrade': 'websocket'}},
                # Strategy 3: HEAD request (faster/stealthier)
                {"method": "HEAD", "headers": None},
            ]
            
            for strategy in strategies:
                try:
                    # Use httpx for HTTP/2 if enabled and available
                    if self.settings.get('http2', True) and HAS_HTTPX:
                        try:
                            with httpx.Client(http2=True, verify=False, timeout=self.settings['timeout']) as client:
                                if strategy["method"] == "GET":
                                    resp = client.get(url, headers=strategy["headers"], follow_redirects=True)
                                else:
                                    resp = client.head(url, headers=strategy["headers"], follow_redirects=True)
                                
                                status_code = resp.status_code
                                headers = resp.headers
                                protocol = resp.http_version
                        except (httpx.ConnectError, httpx.TimeoutException, httpx.RequestError) as e:
                            # Fallback if httpx fails
                            raise e
                    else:
                        # Fallback to requests if HTTP/2 disabled or specifically requested
                        if strategy["method"] == "GET":
                            resp = self.session.get(url, timeout=self.settings['timeout'], verify=False, allow_redirects=True, stream=True, headers=strategy["headers"])
                        else:
                            resp = self.session.head(url, timeout=self.settings['timeout'], verify=False, allow_redirects=True, headers=strategy["headers"])
                        status_code = resp.status_code
                        headers = resp.headers
                        protocol = "HTTP/1.1"

                    if status_code in live_codes:
                        infra_info = identify_infra(headers, status_code)
                        ip = self.get_ip(domain)
                        
                        if ip not in self.rdns_cache:
                            self.rdns_cache[ip] = reverse_dns(ip)
                        rdns = self.rdns_cache[ip]

                        result = {
                            "target": f"{domain}:{port}",
                            "ip": ip,
                            "dns": rdns,
                            "type": infra_info['infra'],
                            "color": infra_info['color'],
                            "status": status_code,
                            "server": infra_info['server'],
                            "port": port,
                            "method": infra_info['method'],
                            "signal": infra_info['signal'],
                            "high_signal": infra_info.get('high_signal', False),
                            "proxy": infra_info['proxy'],
                            "tls": "Enabled" if proto == "https://" else "Disabled",
                            "protocol": protocol,
                            "confidence": "High" if infra_info['infra'] != "UNKNOWN" else "Medium"
                        }
                        
                        output_data = f"{domain}:{port} | {ip} | {infra_info['infra']} | {infra_info['server']} | {status_code} | {infra_info['signal']}"
                        save_result(infra_info['signal'], output_data, self.settings['save_results'], infra=infra_info['infra'], session_file=self.session_file)
                        return result
                
                except (requests.exceptions.SSLError, httpx.ProxyError, httpx.ConnectError) as e:
                    if "SSL" in str(e) or "handshake" in str(e).lower():
                        ip = self.get_ip(domain)
                        result = {
                            "target": f"{domain}:{port}",
                            "ip": ip,
                            "type": "SSL_HANDSHAKE_FAILURE",
                            "color": "red",
                            "status": "SSL_ERR",
                            "server": "Potential Bug Host",
                            "port": port,
                            "method": "GET",
                            "signal": "Handshake Error",
                            "high_signal": True,
                            "proxy": "Direct",
                            "tls": "Failed",
                            "confidence": "Medium"
                        }
                        output_data = f"{domain}:{port} | {ip} | SSL_ERR | Unknown | SSL_ERR | SSL Handshake Failure"
                        save_result("SSL Handshake Failure", output_data, self.settings['save_results'], infra="UNKNOWN", session_file=self.session_file)
                        return result
                    last_error = "Connection Refused/Reset"
                except (requests.exceptions.Timeout, httpx.TimeoutException):
                    last_error = "Timeout"
                except Exception as e:
                    last_error = str(e)
                    continue
        
        if last_error:
            return {
                "target": f"{domain}:{port}",
                "status": "ERROR",
                "error": last_error,
                "port": port
            }
        return None

    def scan(self, target):
        # Support ip:port input
        if ':' in target and not target.startswith('http'):
            parts = target.split(':')
            domain = parts[0].strip()
            try:
                ports = [int(parts[1])]
            except:
                ports = self.ports
        else:
            domain = target.replace('http://', '').replace('https://', '').split('/')[0].split(':')[0].strip()
            ports = self.ports

        if not domain:
            return None
            
        results = []
        for port in ports:
            res = self.scan_port(domain, port)
            if res:
                results.append(res)
        
        return results if results else None
