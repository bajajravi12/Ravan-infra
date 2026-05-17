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
    if 'cloudflare' in server.lower() or cf_ray or 'cf-cache-status' in headers or 'cdn-cgi' in str(headers).lower():
        cdn, color = "CLOUDFLARE", "magenta"
    elif 'cloudfront' in via or 'cloudfront' in x_cache or 'x-amz-cf-id' in headers or 'x-amz-cf-pop' in headers or 'server: cloudfront' in str(headers).lower():
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
    elif via or any(h in headers for h in ['x-forwarded-for', 'forwarded', 'x-real-ip', 'x-proxy-id', 'x-varnish', 'x-squid-error', 'alt-svc', 'cf-ray', 'x-cache']):
        cdn, color = "REV-PROXY", "bright_magenta"
    
    # Advanced Method Detection Heuristics
    method = "DIRECT/HTTP"
    if status_code == 101:
        if cdn == "CLOUDFRONT":
            method = "WS/SSH Proxy"
        elif cdn == "CLOUDFLARE":
            method = "WS/gRPC Proxy"
        else:
            method = "WebSocket Upgrade"
    elif cdn == "CLOUDFRONT":
        method = "CloudFront SNI"
    elif cdn == "CLOUDFLARE":
        method = "Cloudflare SNI"
    elif cdn == "FASTLY":
        method = "Fastly Edge"
    elif cdn == "AKAMAI":
        method = "Akamai GHost"
    elif "h3=" in alt_svc or "h2=" in alt_svc:
        method = "QUIC/H3 Proxy"
    elif cdn in ["VARNISH", "SQUID", "HAPROXY", "REV-PROXY"]:
        method = "Proxy-Tunnel"
    elif status_code == 200:
        if cdn != "UNKNOWN":
            method = f"{cdn} Payload"
        else:
            method = "SSL Payload"

    # Signal Classification (Strictly Clean - NO HTML)
    signal = "Unknown Activity"
    high_signal = False
    
    if status_code == 101:
        if cdn == "CLOUDFRONT":
            signal = "CloudFront SSH Over WS"
        elif cdn == "CLOUDFLARE":
            signal = "Cloudflare WS Tunnel"
        else:
            signal = "Switching Protocols"
        high_signal = True
    elif status_code in [200, 201, 204]:
        if cdn != "UNKNOWN":
            signal = f"{cdn} Bug Host"
        else:
            signal = "Responsive Payload"
    elif status_code in [301, 302, 307, 308]:
        signal = "Redirect Loop"
    elif status_code == 403:
        if cdn != "UNKNOWN":
            signal = f"{cdn} WAF Restricted"
        else:
            signal = "Forbidden (Live)"
    elif status_code == 404:
        signal = "NotFound (Alive)"
    elif status_code == 502:
        signal = "Gateway/Live"
    else:
        signal = f"ALIVE ({status_code})"

    # SSH over HTTP/WS Detection
    if status_code == 101 and ("ssh" in server.lower() or "ssh" in str(headers).lower() or "ssh" in connection or "sec-websocket-accept" in headers):
        signal = "SSH over WebSocket Found"
        method = "SSH/WS Proxy"

    # Special Detection for CDN headers
    if 'x-amz-cf-id' in headers or 'x-amz-cf-pop' in headers:
        high_signal = True
        cdn = "CLOUDFRONT"
    if 'cf-ray' in headers or 'cf-cache-status' in headers:
        high_signal = True
        cdn = "CLOUDFLARE"
    
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
