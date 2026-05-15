def identify_infra(headers):
    server = headers.get('Server', '').lower()
    via = headers.get('Via', '').lower()
    x_cache = headers.get('X-Cache', '').lower()
    cf_ray = headers.get('CF-RAY', '')
    
    # Logic based on headers with custom colors
    if 'cloudflare' in server or cf_ray or 'cf-cache-status' in headers:
        return "CLOUDFLARE", "red" # Cloudflare -> Red
    
    if 'cloudfront' in via or 'cloudfront' in x_cache or 'x-amz-cf-id' in headers or 'x-amz-cf-pop' in headers:
        return "CLOUDFRONT", "green" # CloudFront -> Green
    
    if 'fastly' in via or 'x-served-by' in headers:
        return "FASTLY", "blue"
    
    if 'akamai' in server or 'akamai' in via or 'x-akamai-transformed' in headers:
        return "AKAMAI", "yellow"
    
    if 'amz' in str(headers).lower() or 'amazon' in server:
        return "AWS-ORIGIN", "cyan"
    
    if 'nginx' in server:
        return "NGINX", "bright_green"
    
    if 'apache' in server:
        return "APACHE", "bright_yellow"
    
    if 'iis' in server or 'microsoft' in server:
        return "IIS", "white"
    
    return "UNKNOWN", "bright_black"
