import os
from pathlib import Path

# Use the same base directory as settings
BASE_DIR = Path.home() / ".rqrv"
RESULTS_DIR = BASE_DIR / "results"

def save_result(signal, data, save_enabled=True, infra=None, session_file=None):
    if not save_enabled:
        return
        
    if not RESULTS_DIR.exists():
        RESULTS_DIR.mkdir(parents=True, exist_ok=True)
        
    # session_file takes priority for direct logging (requested for CIDR/Bulk)
    if session_file:
        s_file = os.path.join(RESULTS_DIR, session_file)
        with open(s_file, "a") as f:
            f.write(data + "\n")

    # Map signals to filenames
    # Clean signal for filename
    clean_signal = "".join([c if c.isalnum() else "_" for c in signal]).lower()
    
    # Specific mappings for consistency if needed
    file_map = {
        "CloudFront SSH Proxy + SNI": "ssh_proxy.txt",
        "Cloudflare WS Proxy Active": "ws_proxy.txt",
        "Switching Protocols Active": "protocol_upgrade.txt",
        "HTTP Responsive": "http_responsive.txt",
        "Restricted but Live": "restricted.txt",
        "SSH Payload Proxy Found": "ssh_payload.txt"
    }
    
    filename = file_map.get(signal, f"{clean_signal}.txt")
    if len(filename) > 50: filename = "other_hits.txt"
    
    # Signal-based file
    cat_file = os.path.join(RESULTS_DIR, filename)
    with open(cat_file, "a") as f:
        f.write(data + "\n")

    # CloudFront/Cloudflare Auto-Categorization
    if infra == "CLOUDFRONT":
        cf_file = os.path.join(RESULTS_DIR, "cloudfront_hits.txt")
        with open(cf_file, "a") as f:
            f.write(data + "\n")
    elif infra == "CLOUDFLARE":
        clr_file = os.path.join(RESULTS_DIR, "cloudflare_hits.txt")
        with open(clr_file, "a") as f:
            f.write(data + "\n")
        
    # Global hits file requested as live_hits.txt
    live_file = os.path.join(RESULTS_DIR, "live_hits.txt")
    with open(live_file, "a") as f:
        f.write(data + "\n")
