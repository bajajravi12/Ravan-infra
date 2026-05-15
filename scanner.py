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
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) RAVAN-INFRA-X/1.0',
            'Connection': 'close'
        })

    def scan_port(self, domain, port):
        # Determine protocol based on port
        proto = "https://" if port == 443 else "http://"
        url = f"{proto}{domain}:{port}"
        
        try:
            # Optimized for non-recharge detection
            # We want to know if it responds at all on this port
            try:
                resp = self.session.head(
                    url, 
                    timeout=self.settings['timeout'], 
                    verify=False, 
                    allow_redirects=True,
                    stream=True
                )
                if resp.status_code in [405, 403, 400]:
                    resp = self.session.get(url, timeout=self.settings['timeout'], verify=False, stream=True)
            except:
                resp = self.session.get(url, timeout=self.settings['timeout'], verify=False, stream=True)

            # Non-RC Compatible: 200, 101, 301, 302 are prime targets
            # We accept a wide range but focus on visibility
            if resp.status_code in [200, 201, 204, 301, 302, 307, 308, 400, 401, 403, 404]:
                infra_type, color = identify_infra(resp.headers)
                
                try:
                    ip = socket.gethostbyname(domain)
                except:
                    ip = "0.0.0.0"

                result = {
                    "target": f"{domain}:{port}",
                    "ip": ip,
                    "type": infra_type,
                    "color": color,
                    "status": resp.status_code,
                    "server": resp.headers.get('Server', 'Unknown'),
                    "port": port
                }
                
                save_result(infra_type, f"{domain}:{port} | {ip} | {resp.status_code}", self.settings['save_results'])
                return result
        except:
            pass
        return None

    def scan(self, target):
        domain = target.replace('http://', '').replace('https://', '').split('/')[0].split(':')[0].strip()
        if not domain:
            return None
            
        ports = [80, 443, 8080]
        results = []
        
        # Scan ports individually
        for port in ports:
            res = self.scan_port(domain, port)
            if res:
                results.append(res)
        
        return results if results else None
