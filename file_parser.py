import os
from utils import detect_target_type

def parse_file(file_path):
    if not os.path.exists(file_path):
        return []
    
    targets = []
    with open(file_path, "r") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            targets.append(line)
    return targets
