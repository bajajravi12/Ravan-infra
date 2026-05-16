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

def clean_url(target):
    if not target.startswith(('http://', 'https://')):
        return f"http://{target}"
    return target
