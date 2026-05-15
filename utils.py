import re
import ipaddress
import socket

def detect_target_type(target):
    target = target.strip()
    # Check for CIDR
    if '/' in target:
        try:
            ipaddress.ip_network(target, strict=False)
            return 'cidr'
        except:
            pass
    
    # Check for IP
    try:
        ipaddress.ip_address(target)
        return 'ip'
    except:
        pass
    
    # Check for Domain (Simple regex)
    if re.match(r'^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$', target.lower()):
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
