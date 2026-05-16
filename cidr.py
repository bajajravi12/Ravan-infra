import ipaddress

def generate_ips(cidr):
    try:
        network = ipaddress.ip_network(cidr.strip(), strict=False)
        for ip in network:
            yield str(ip)
    except Exception as e:
        print(f"Error parsing CIDR {cidr}: {e}")
