# RAVAN INFRA-X ULTRA

Production-grade, high-speed infrastructure inventory and server fingerprinting tool.

## Features
- **🔥 Parallel Hunter Engine**: Simultaneously scans multiple domains AND multiple ports (80, 443, 2052, etc.) for max speed.
- **🚀 Ultra-Fast Concurrency**: Thread-optimized architecture specifically tuned for Termux environments.
- **🎯 Smart Infra Fingerprinting**: Detects Cloudflare, CloudFront, Akamai, Fastly, AWS, Nginx, Apache, and more.
- **🛠️ Bug Method Suggester**: Automatically suggests payloads (WS/gRPC, CDN/SSL, DNS-Tunnel) based on server response.
- **🔍 Reverse DNS LOOKUP**: Built-in tool to resolve IP addresses back to their hostnames.
- **📦 CIDR & Bulk Power**: Memory-efficient generators for processing millions of targets without crashing.
- **📂 Auto-Logger**: Real-time logging of all discovered hosts to organized text files.

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
