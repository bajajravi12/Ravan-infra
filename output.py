import os

RESULTS_DIR = "results"

def save_result(category, data, save_enabled=True):
    if not save_enabled:
        return
        
    if not os.path.exists(RESULTS_DIR):
        os.makedirs(RESULTS_DIR)
        
    # Categorized file
    cat_file = os.path.join(RESULTS_DIR, f"{category.lower()}.txt")
    with open(cat_file, "a") as f:
        f.write(data + "\n")
        
    # Global live file
    live_file = os.path.join(RESULTS_DIR, "live.txt")
    with open(live_file, "a") as f:
        f.write(data + "\n")
