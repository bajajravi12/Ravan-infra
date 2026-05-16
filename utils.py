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
        return socket.gethostbyaddr(ip)[0]
    except:
        return "Not Found"

def get_cidr(ip):
    try:
        from ipwhois import IPWhois
        obj = IPWhois(ip)
        results = obj.lookup_rdap(depth=1)
        # Try to find the smallest CIDR or the one in the network section
        if results.get('network') and results['network'].get('cidr'):
            return results['network']['cidr']
        return "CIDR not found in WHOIS data"
    except Exception as e:
        return f"Error: {str(e)}"

def clean_url(target):
    if not target.startswith(('http://', 'https://')):
        return f"http://{target}"
    return target
