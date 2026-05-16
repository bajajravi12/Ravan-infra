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
            max_retries=0
        )
        self.session.mount('http://', self.adapter)
        self.session.mount('https://', self.adapter)
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) RAVAN-INFRA-X/1.0',
            'Connection': 'close'
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
        
        for proto in protocols:
            url = f"{proto}{domain}:{port}"
            try:
                # HEAD request first
                resp = self.session.head(
                    url, 
                    timeout=self.settings['timeout'], 
                    verify=False, 
                    allow_redirects=True,
                    stream=True
                )
                # Fallback to GET if HEAD fails or returns certain status
                if resp.status_code >= 400:
                    resp = self.session.get(
                        url, 
                        timeout=self.settings['timeout'], 
                        verify=False, 
                        allow_redirects=True,
                        stream=True
                    )
            except:
                try:
                    resp = self.session.get(
                        url, 
                        timeout=self.settings['timeout'], 
                        verify=False, 
                        allow_redirects=True,
                        stream=True
                    )
                except:
                    continue

            # Live status codes: 101, 200, 201, 204, 301, 302, 307, 308, 400, 401, 403, 404
            live_codes = [101, 200, 201, 204, 301, 302, 307, 308, 400, 401, 403, 404]
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
