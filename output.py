import os

RESULTS_DIR = "results"

def save_result(signal, data, save_enabled=True):
    if not save_enabled:
        return
        
    if not os.path.exists(RESULTS_DIR):
        os.makedirs(RESULTS_DIR)
        
    # Map signals to filenames
    file_map = {
        "Protocol Upgrade Seen": "protocol_upgrade.txt",
        "HTTP Responsive": "http_responsive.txt",
        "Restricted but Live": "restricted_live.txt",
        "Endpoint Responding": "endpoint_responding.txt"  # Adding this as well
    }
    
    filename = file_map.get(signal, "other_hits.txt")
    
    # Categorized file
    cat_file = os.path.join(RESULTS_DIR, filename)
    with open(cat_file, "a") as f:
        f.write(data + "\n")
        
    # Global hits file requested as live_hits.txt
    live_file = os.path.join(RESULTS_DIR, "live_hits.txt")
    with open(live_file, "a") as f:
        f.write(data + "\n")
