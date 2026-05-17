def identify_infra(headers, status_code):
    server = headers.get('Server', 'Unknown')
    via = headers.get('Via', '').lower()
    x_cache = headers.get('X-Cache', '').lower()
    cf_ray = headers.get('CF-RAY', '')
    upgrade = headers.get('Upgrade', '').lower()
    alt_svc = headers.get('Alt-Svc', '').lower()
    connection = headers.get('Connection', '').lower()
    
    # Logic based on headers with specific requested colors
    cdn, color = "UNKNOWN", "bright_black"

    # Specific CDN/Proxy Detection
    if 'cloudflare' in server.lower() or cf_ray or 'cf-cache-status' in headers:
        cdn, color = "CLOUDFLARE", "magenta"
    elif 'cloudfront' in via or 'cloudfront' in x_cache or 'x-amz-cf-id' in headers or 'x-amz-cf-pop' in headers:
        cdn, color = "CLOUDFRONT", "cyan"
    elif 'fastly' in via or 'x-served-by' in headers:
        cdn, color = "FASTLY", "blue"
    elif 'akamai' in server.lower() or 'akamai' in via or 'x-akamai-transformed' in headers:
        cdn, color = "AKAMAI", "red"
    elif 'varnish' in via or 'x-varnish' in headers:
        cdn, color = "VARNISH", "blue"
    elif 'squid' in via or 'squid' in server.lower():
        cdn, color = "SQUID", "green"
    elif 'haproxy' in server.lower() or 'haproxy' in via:
        cdn, color = "HAPROXY", "bright_white"
    elif 'amz' in str(headers).lower() or 'amazon' in server.lower() or 'awselb' in str(headers).lower():
        cdn, color = "AWS-ORIGIN", "cyan"
    elif 'nginx' in server.lower():
        cdn, color = "NGINX", "green"
    elif 'apache' in server.lower():
        cdn, color = "APACHE", "yellow"
    elif 'iis' in server.lower() or 'microsoft' in server.lower():
        cdn, color = "IIS", "white"
    elif server.lower() == "gws" or "google" in server.lower():
        cdn, color = "GOOGLE", "bright_red"
    elif via or any(h in headers for h in ['x-forwarded-for', 'forwarded', 'x-real-ip', 'x-proxy-id', 'x-varnish', 'x-squid-error']):
        cdn, color = "REV-PROXY", "bright_magenta"
    
    # Advanced Method Detection Heuristics
    method = "DIRECT/HTTP"
    if status_code == 101:
        if cdn == "CLOUDFRONT":
            method = "WS/SSH + SNI"
        elif cdn == "CLOUDFLARE":
            method = "WS/GRPC"
        else:
            method = "WS/PAYLOAD"
    elif cdn == "CLOUDFLARE":
        method = "WS/SSH+SNI"
    elif cdn == "CLOUDFRONT":
        method = "CDN/SSL + SNI"
    elif cdn == "FASTLY":
        method = "EDGE/PUSH"
    elif cdn == "AKAMAI":
        method = "GHOST/HTTP"
    elif "h3=" in alt_svc or "h2=" in alt_svc:
        method = "QUIC/HTTP3"
    elif cdn in ["VARNISH", "SQUID", "HAPROXY", "REV-PROXY"]:
        method = "PROXY-TUNNEL"
    elif "proxy" in str(headers).lower() or "via" in headers:
        method = "REVERSE-PROXY"
    elif status_code == 200:
        if cdn != "UNKNOWN":
            method = f"{cdn} PAYLOAD"
        else:
            method = "SSL PAYLOAD"

    # Signal Classification (Strictly Clean - NO HTML)
    signal = "Unknown Activity"
    high_signal = False
    
    if status_code == 101:
        if cdn == "CLOUDFRONT":
            signal = "CloudFront SSH Proxy Detected"
        elif cdn == "CLOUDFLARE":
            signal = "Cloudflare WS Proxy Active"
        else:
            signal = "Switching Protocols Active"
        high_signal = True
    elif status_code in [200, 201, 204]:
        if cdn != "UNKNOWN":
            signal = f"{cdn} Payload Compatible"
        else:
            signal = "HTTP Responsive (Payload Ready)"
    elif status_code in [301, 302, 307, 308]:
        signal = "HTTP Redirect (Live)"
    elif status_code == 403:
        if cdn != "UNKNOWN":
            signal = f"{cdn} Forbidden (Live)"
        else:
            signal = "Forbidden (403 Live)"
    elif status_code == 404:
        signal = "Endpoint Responding (404)"
    elif status_code == 502:
        signal = "Bad Gateway (Live)"
    else:
        signal = f"Response {status_code} Alive"

    # SSH over HTTP/WS Detection
    if status_code == 101 and ("ssh" in server.lower() or "ssh" in str(headers).lower() or "ssh" in connection):
        signal = "SSH Payload Proxy Found"
        method = "SSH+WS"

    # Payload compatibility signals
    if any(h in headers for h in ['x-amz-cf-id', 'cf-ray', 'x-served-by']):
        high_signal = True
    
    if high_signal or (cdn != "UNKNOWN" and status_code in [101, 200, 403]):
        high_signal = True

    return {
        "infra": cdn,
        "color": color,
        "method": method,
        "server": server,
        "signal": signal,
        "high_signal": high_signal,
        "proxy": "Responsive" if (via or "proxy" in str(headers).lower() or cdn != "UNKNOWN") else "Direct"
    }
