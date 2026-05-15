# RAVAN INFRA-X ULTRA

Production-grade, high-speed infrastructure inventory and server fingerprinting tool.

## Features
- **Ultra-Fast Engine**: Multithreaded scanning using `ThreadPoolExecutor`.
- **Smart Detection**: Detects Cloudflare, CloudFront, Akamai, Fastly, AWS, Nginx, Apache, and more.
- **CIDR Optimized**: Memory-efficient CIDR scanning using Python generators.
- **Auto-Detect**: Seamlessly parses files containing Domains, IPs, and CIDRs.
- **Network Optimized**: Low-bandwidth HTTP HEAD requests with smart GET fallback.
- **Termux Ready**: Optimized for Android (Termux) with a beautiful `rich` terminal UI.

## Installation (Termux)

1. **Update and Upgrade Package Repository:**
```bash
pkg update && pkg upgrade -y
```

2. **Install Python and Git:**
```bash
pkg install python git -y
```

3. **Clone the Repository:**
```bash
git clone https://github.com/bajajravi12/ravan-infra
```

4. **Navigate to Directory:**
```bash
cd ravan-infra
```

5. **Install Requirements:**
```bash
pip install -r requirements.txt
```

6. **Run the Tool:**
```bash
python main.py
```

## Usage
- **Single Scan**: Quick analysis of a single host.
- **CIDR Scan**: Discover active hosts across an entire network range.
- **File Scan**: Bulk scan a list of targets (supports mixed formats).
- **Settings**: Adjust threads and timeouts to match your network speed.

## Legal Disclaimer
This tool is for **authorized** security auditing and inventory tracking **only**. Unauthorized scanning of external assets is strictly prohibited. Use responsibly.
