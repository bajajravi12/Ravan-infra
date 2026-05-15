def identify_infra(headers):
    server = headers.get('Server', '').lower()
    via = headers.get('Via', '').lower()
    x_cache = headers.get('X-Cache', '').lower()
    cf_ray = headers.get('CF-RAY', '')
    
    # Logic based on headers with specific requested colors
    cdn, color = "UNKNOWN", "bright_black"

    # Specific CDN/Proxy Detection
    if 'cloudflare' in server or cf_ray or 'cf-cache-status' in headers:
        cdn, color = "CLOUDFLARE", "magenta"
    elif 'cloudfront' in via or 'cloudfront' in x_cache or 'x-amz-cf-id' in headers or 'x-amz-cf-pop' in headers:
        cdn, color = "CLOUDFRONT", "cyan"
    elif 'fastly' in via or 'x-served-by' in headers:
        cdn, color = "FASTLY", "blue"
    elif 'akamai' in server or 'akamai' in via or 'x-akamai-transformed' in headers:
        cdn, color = "AKAMAI", "red"
    elif 'varnish' in via or 'x-varnish' in headers:
        cdn, color = "VARNISH", "blue"
    elif 'squid' in via or 'squid' in server:
        cdn, color = "SQUID", "green"
    elif 'haproxy' in server or 'haproxy' in via:
        cdn, color = "HAPROXY", "bright_white"
    elif 'amz' in str(headers).lower() or 'amazon' in server:
        cdn, color = "AWS-ORIGIN", "cyan"
    elif 'nginx' in server:
        cdn, color = "NGINX", "green"
    elif 'apache' in server:
        cdn, color = "APACHE", "yellow"
    elif 'iis' in server or 'microsoft' in server:
        cdn, color = "IIS", "white"
    elif via or any(h in headers for h in ['x-forwarded-for', 'forwarded', 'x-real-ip', 'x-proxy-id', 'x-varnish', 'x-squid-error']):
        cdn, color = "REV-PROXY", "bright_magenta"
    
    # Method Suggestion based on Infra
    method = "DIRECT/HTTP"
    if cdn == "CLOUDFLARE":
        method = "WS/GRPC"
    elif cdn == "CLOUDFRONT":
        method = "CDN/SSL"
    elif cdn == "FASTLY":
        method = "EDGE/PUSH"
    elif cdn == "AKAMAI":
        method = "GHOST/HTTP"
    elif cdn in ["VARNISH", "SQUID", "HAPROXY", "REV-PROXY"]:
        method = "PROXY-TUNNEL"
    elif "proxy" in str(headers).lower() or "via" in headers:
        method = "REVERSE-PROXY"

    return cdn, color, method
