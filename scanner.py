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

    def scan(self, target):
        domain = target.replace('http://', '').replace('https://', '').split('/')[0].strip()
        if not domain:
            return None
            
        protocols = ['https://', 'http://']
        
        for proto in protocols:
            url = f"{proto}{domain}"
            try:
                # 1. Try HEAD first for speed
                try:
                    resp = self.session.head(
                        url, 
                        timeout=self.settings['timeout'], 
                        verify=False, 
                        allow_redirects=True,
                        stream=True
                    )
                    # If HEAD is blocked or method not allowed, try GET
                    if resp.status_code in [405, 403, 400]:
                        resp = self.session.get(url, timeout=self.settings['timeout'], verify=False, stream=True)
                except:
                    resp = self.session.get(url, timeout=self.settings['timeout'], verify=False, stream=True)

                # Check if it was a successful response
                # Accept a wide range of status codes as "Responding"
                if resp.status_code in [200, 201, 204, 301, 302, 307, 308, 400, 401, 403, 404]:
                    infra_type, color = identify_infra(resp.headers)
                    
                    # Resolve IP
                    try:
                        ip = socket.gethostbyname(domain)
                    except:
                        ip = "0.0.0.0"

                    result = {
                        "target": target,
                        "ip": ip,
                        "type": infra_type,
                        "color": color,
                        "status": resp.status_code,
                        "server": resp.headers.get('Server', 'Unknown')
                    }
                    
                    # Save
                    save_result(infra_type, f"{target} | {ip} | {resp.status_code}", self.settings['save_results'])
                    return result
                    
            except requests.exceptions.RequestException:
                # If HTTPS fails, loop will try HTTP
                continue
            except Exception:
                continue
                
        return None
