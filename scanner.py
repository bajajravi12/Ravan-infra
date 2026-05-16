import requests
import urllib3
from detector import identify_infra
from output import save_result
import socket

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

class Scanner:
    def __init__(self, settings, session_file=None):
        self.settings = settings
        self.session_file = session_file
        self.session = requests.Session()
        self.dns_cache = {}
        self.adapter = requests.adapters.HTTPAdapter(
            pool_connections=settings['threads'], 
            pool_maxsize=settings['threads'],
            max_retries=settings.get('retries', 1)
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
        
        for proto in protocols:
            url = f"{proto}{domain}:{port}"
            
            # Implementation of multiple detection strategies
            strategies = [
                # Strategy 1: Standard clean request
                {"headers": None},
                # Strategy 2: Websocket Upgrade request for 101 detection
                {"headers": {'Connection': 'Upgrade', 'Upgrade': 'websocket'}},
            ]
            
            for strategy in strategies:
                try:
                    resp = self.session.get(
                        url, 
                        timeout=self.settings['timeout'], 
                        verify=False, 
                        allow_redirects=True,
                        stream=True,
                        headers=strategy["headers"]
                    )
                    
                    if resp.status_code in live_codes:
                        infra_info = identify_infra(resp.headers, resp.status_code)
                        ip = self.get_ip(domain)

                        result = {
                            "target": f"{domain}:{port}",
                            "ip": ip,
                            "type": infra_info['infra'],
                            "color": infra_info['color'],
                            "status": resp.status_code,
                            "server": infra_info['server'],
                            "port": port,
                            "method": infra_info['method'],
                            "signal": infra_info['signal'],
                            "high_signal": infra_info.get('high_signal', False),
                            "proxy": infra_info['proxy'],
                            "tls": "Enabled" if proto == "https://" else "Disabled",
                            "confidence": "High" if infra_info['infra'] != "UNKNOWN" else "Medium"
                        }
                        
                        output_data = f"{domain}:{port} | {ip} | {infra_info['infra']} | {infra_info['server']} | {resp.status_code} | {infra_info['signal']}"
                        save_result(infra_info['signal'], output_data, self.settings['save_results'], infra=infra_info['infra'], session_file=self.session_file)
                        return result
                
                except requests.exceptions.SSLError as e:
                    # SSL Handshake Failure still means host is alive and SSL is active
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
                        "high_signal": True, # Always show this as it's interesting
                        "proxy": "Direct",
                        "tls": "Failed",
                        "confidence": "Medium"
                    }
                    output_data = f"{domain}:{port} | {ip} | SSL_ERR | Unknown | SSL_ERR | SSL Handshake Failure"
                    save_result("SSL Handshake Failure", output_data, self.settings['save_results'], infra="UNKNOWN", session_file=self.session_file)
                    return result

                except requests.exceptions.ConnectionError:
                    # Connection might be reset or refused, usually means host is alive but rejecting
                    continue
                except Exception:
                    # If this strategy/proto combination fails, move to next
                    continue
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
