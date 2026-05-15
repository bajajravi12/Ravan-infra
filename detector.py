def identify_infra(headers):
    server = headers.get('Server', '').lower()
    via = headers.get('Via', '').lower()
    x_cache = headers.get('X-Cache', '').lower()
    cf_ray = headers.get('CF-RAY', '')
    
    # Logic based on headers with specific requested colors
    if 'cloudflare' in server or cf_ray or 'cf-cache-status' in headers:
        return "CLOUDFLARE", "magenta" # Cloudflare -> Magenta
    
    if 'cloudfront' in via or 'cloudfront' in x_cache or 'x-amz-cf-id' in headers or 'x-amz-cf-pop' in headers:
        return "CLOUDFRONT", "cyan" # CloudFront -> Cyan
    
    if 'fastly' in via or 'x-served-by' in headers:
        return "FASTLY", "blue" # Fastly -> Blue
    
    if 'akamai' in server or 'akamai' in via or 'x-akamai-transformed' in headers:
        return "AKAMAI", "red" # Akamai -> Red
    
    if 'amz' in str(headers).lower() or 'amazon' in server:
        return "AWS-ORIGIN", "cyan"
    
    if 'nginx' in server:
        return "NGINX", "green" # nginx -> Green
    
    if 'apache' in server:
        return "APACHE", "yellow" # Apache -> Yellow
    
    if 'iis' in server or 'microsoft' in server:
        return "IIS", "white" # IIS -> White
    
    return "UNKNOWN", "bright_black" # Unknown -> Gray/Bright Black
