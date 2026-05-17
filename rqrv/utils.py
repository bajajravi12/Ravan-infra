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
        host = socket.gethostbyaddr(ip)[0]
        return host
    except:
        return "Unknown Host"

def get_cidr(ip):
    try:
        # Use a more reliable way to get CIDR/ASN info that works in Termux
        # ipwhois often fails due to DNS issues in restricted environments
        from ipwhois import IPWhois
        import warnings
        warnings.filterwarnings("ignore")
        
        obj = IPWhois(ip)
        # Avoid rdap if it's causing resolv.conf issues, try legacy whois first or handle error
        try:
            results = obj.lookup_rdap(depth=1)
        except Exception:
            results = obj.lookup_whois()

        network = results.get('network', {})
        asn = results.get('asn', 'N/A')
        country = results.get('asn_country_code', 'N/A')
        
        # Build a detailed response
        cidr_val = network.get('cidr', 'N/A')
        org = network.get('name', network.get('org', 'N/A'))
        
        return {
            "cidr": cidr_val,
            "asn": f"AS{asn}",
            "org": org.upper(),
            "country": country
        }
    except Exception as e:
        return f"Error: {str(e)}"

def clean_url(target):
    if not target.startswith(('http://', 'https://')):
        return f"http://{target}"
    return target
