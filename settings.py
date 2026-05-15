import json
import os

CONFIG_FILE = "config.json"

DEFAULT_SETTINGS = {
    "threads": 200,
    "timeout": 5,
    "retries": 1,
    "save_results": True
}

def load_settings():
    if not os.path.exists(CONFIG_FILE):
        save_settings(DEFAULT_SETTINGS)
        return DEFAULT_SETTINGS
    try:
        with open(CONFIG_FILE, "r") as f:
            return json.load(f)
    except:
        return DEFAULT_SETTINGS

def save_settings(settings):
    with open(CONFIG_FILE, "w") as f:
        json.dump(settings, f, indent=2)
