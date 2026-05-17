import re
import ipaddress
import socket

def detect_target_type(target):
    target = target.strip().replace('http://', '').replace('https://', '').split('/')[0]
    
    # Remove port for classification if present
    host = target.split(':')[0]
    
    # Check for CIDR
    if '/' in host:
        try:
            ipaddress.ip_network(host, strict=False)
            return 'cidr'
        except:
            pass
    
    # Check for IP
    try:
        ipaddress.ip_address(host)
        return 'ip'
    except:
        pass
    
    # Check for Domain
    if re.match(r'^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}.*$', host.lower()):
        return 'domain'
    
    return 'unknown'

def reverse_dns(ip):
    try:
        socket.setdefaulttimeout(2)
        # Try standard host lookup
        host = socket.gethostbyaddr(ip)[0]
        return host
    except:
        # Fallback to getnameinfo for potentially better results on some systems
        try:
            return socket.getnameinfo((ip, 0), 0)[0]
        except:
            return "Unknown Host"

def reverse_dns_pro(target):
    # Try multiple methods to detect domains
    domains = set()
    
    # Method 1: PTR Lookup
    ptr = reverse_dns(target)
    if ptr and ptr != "Unknown Host":
        domains.add(ptr)

    # Method 2: Header Probing & Common Signatures
    try:
        import requests
        # Rapid probe for headers that might leak hostnames
        r = requests.get(f"http://{target}", timeout=2, verify=False, allow_redirects=True)
        
        # Check Location header
        loc = r.headers.get('Location', '')
        if loc:
            d = loc.replace('http://', '').replace('https://', '').split('/')[0].split(':')[0]
            if d and not re.match(r'^\d+\.\d+\.\d+\.\d+$', d): domains.add(d)
                
        # Check Server/X-Powered-By etc
        server = r.headers.get('Server', '')
        if server: domains.add(f"Server: {server}")
        
    except:
        pass

    return list(domains) if domains else ["No Hosted Domains Detected"]

def get_cidr(ip):
    try:
        # First attempt: ipwhois (RDAP/WHOIS)
        try:
            from ipwhois import IPWhois
            import warnings
            warnings.filterwarnings("ignore")
            
            # Use offline-friendly lookup if possible or handle the resolv.conf error
            obj = IPWhois(ip)
            try:
                # Try RDAP first
                results = obj.lookup_rdap(depth=1)
            except Exception:
                # Fallback to WHOIS (less likely to need system DNS files in some libs)
                results = obj.lookup_whois()

            network = results.get('network', {})
            asn = results.get('asn', 'N/A')
            country = results.get('asn_country_code', 'N/A')
            cidr_val = network.get('cidr', 'N/A')
            org = network.get('name', network.get('org', 'N/A'))
            
            if cidr_val != 'N/A':
                return {
                    "cidr": cidr_val,
                    "asn": f"AS{asn}",
                    "org": org.upper(),
                    "country": country
                }
        except Exception:
            pass

        # Fallback: Local calculation for nearest CIDR based on common ranges
        # This is for when external APIs/system files are totally blocked/broken
        ip_obj = ipaddress.ip_address(ip)
        # Just default to a /24 or /22 based on class or simply return something safe
        # but let's try to be a bit smarter
        first_octet = int(ip.split('.')[0])
        if 1 <= first_octet <= 126: # Class A
            cidr = f"{ip.split('.')[0]}.0.0.0/8"
        elif 128 <= first_octet <= 191: # Class B
            cidr = f"{ip.split('.')[0]}.{ip.split('.')[1]}.0.0/16"
        else: # Class C etc
            cidr = f"{ip.split('.')[0]}.{ip.split('.')[1]}.{ip.split('.')[2]}.0/24"
            
        return {
            "cidr": cidr,
            "asn": "LOCAL-CALC",
            "org": "UNKNOWN-INFRA",
            "country": "UNKNOWN"
        }
    except Exception as e:
        return f"Error: {str(e)}"

def clean_url(target):
    if not target.startswith(('http://', 'https://')):
        return f"http://{target}"
    return target
