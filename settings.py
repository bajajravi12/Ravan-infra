import json
import os
from pathlib import Path

# Use a persistent directory in the user's home folder for settings and results
BASE_DIR = Path.home() / ".rqrv"
CONFIG_FILE = BASE_DIR / "config.json"

DEFAULT_SETTINGS = {
    "threads": 400,
    "timeout": 5,
    "retries": 0,
    "save_results": True,
    "http2": True,
    "high_signals": ["101 Switching Protocols", "CloudFront", "Cloudflare", "GWS"]
}

def load_settings():
    if not BASE_DIR.exists():
        BASE_DIR.mkdir(parents=True, exist_ok=True)
        
    if not CONFIG_FILE.exists():
        save_settings(DEFAULT_SETTINGS)
        return DEFAULT_SETTINGS.copy()
    try:
        with open(CONFIG_FILE, "r") as f:
            settings = json.load(f)
            # Merge defaults for missing keys (e.g. after update)
            for key, value in DEFAULT_SETTINGS.items():
                if key not in settings:
                    settings[key] = value
            return settings
    except:
        return DEFAULT_SETTINGS.copy()

def save_settings(settings):
    if not BASE_DIR.exists():
        BASE_DIR.mkdir(parents=True, exist_ok=True)
    with open(CONFIG_FILE, "w") as f:
        json.dump(settings, f, indent=2)
