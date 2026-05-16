import os
from pathlib import Path

# Use the same base directory as settings
BASE_DIR = Path.home() / ".rq"
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

    # Map signals to filenames (as requested)
    file_map = {
        "Protocol Upgrade Seen": "protocol_upgrade.txt",
        "HTTP Responsive": "http_responsive.txt",
        "Restricted but Live": "restricted_live.txt",
        "Endpoint Responding": "endpoint_responding.txt"
    }
    
    # Categorize by infra if available
    if infra:
        infra_file = os.path.join(RESULTS_DIR, f"{infra.lower()}.txt")
        with open(infra_file, "a") as f:
            f.write(data + "\n")

    filename = file_map.get(signal, "other_hits.txt")
    
    # Signal-based file
    cat_file = os.path.join(RESULTS_DIR, filename)
    with open(cat_file, "a") as f:
        f.write(data + "\n")
        
    # Global hits file requested as live_hits.txt
    live_file = os.path.join(RESULTS_DIR, "live_hits.txt")
    with open(live_file, "a") as f:
        f.write(data + "\n")
