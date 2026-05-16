import requests
import urllib3
from detector import identify_infra
from output import save_result
import socket

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

class Scanner:
    def __init__(self, settings):
        self.settings = settings
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
            'Connection': 'keep-alive'
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
        proto = "https://" if port in [443, 2053, 2083, 2087, 2096, 8443] else "http://"
        url = f"{proto}{domain}:{port}"
        
        try:
            # Fast check with stream=True to avoid downloading body
            resp = self.session.get(
                url, 
                timeout=self.settings['timeout'], 
                verify=False, 
                allow_redirects=True,
                stream=True
            )

            if resp.status_code < 500:
                infra_type, color, method = identify_infra(resp.headers)
                ip = self.get_ip(domain)

                result = {
                    "target": f"{domain}:{port}",
                    "ip": ip,
                    "type": infra_type,
                    "color": color,
                    "status": resp.status_code,
                    "server": resp.headers.get('Server', 'Unknown'),
                    "port": port,
                    "method": method
                }
                
                save_result(infra_type, f"{domain}:{port} | {ip} | {resp.status_code} | {method}", self.settings['save_results'])
                return result
        except:
            pass
        return None

    def scan(self, target):
        domain = target.replace('http://', '').replace('https://', '').split('/')[0].split(':')[0].strip()
        if not domain:
            return None
            
        results = []
        for port in self.ports:
            res = self.scan_port(domain, port)
            if res:
                results.append(res)
        
        return results if results else None
