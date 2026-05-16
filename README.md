# RAVAN INFRA-X ULTRA

Production-grade, high-speed infrastructure inventory and server fingerprinting tool.

## Installation

The easiest way to install **RQ** is via pip:

```bash
pip install rq-tool
```

After installation, you can launch the tool from anywhere by simply typing:

```bash
rq
```

## Features
- **🔥 Parallel Hunter Engine**: Simultaneously scans multiple domains AND multiple ports (80, 443, 2052, etc.) for max speed.
- **🚀 Ultra-Fast Concurrency**: Thread-optimized architecture specifically tuned for high-performance scanning.
- **🎯 Smart Infra Fingerprinting**: Detects Cloudflare, CloudFront, Akamai, Fastly, AWS, Nginx, Apache, and more.
- **🛠️ Bug Method Suggester**: Automatically suggests payloads (WS/gRPC, CDN/SSL, DNS-Tunnel) based on server response.
- **🔍 Reverse DNS LOOKUP**: Built-in tool to resolve IP addresses back to their hostnames.
- **📦 CIDR & Bulk Power**: Memory-efficient generators for processing millions of targets.
- **📂 Auto-Logger**: Real-time logging to organize all discovered hosts.
- **🌐 IP to CIDR Finder**: Automatically find the CIDR range for any given IP.

## Direct Installation (Termux/Linux)

1. **Update Repository:**
   ```bash
   pkg update && pkg upgrade -y
   ```

2. **Install RQ:**
   ```bash
   pip install rq-tool
   root@termux:~# rq
   ```

## Usage
- **Single Scan**: Quick analysis of a single host.
- **CIDR Scan**: Discover active hosts across an entire network range.
- **File Scan**: Bulk scan a list of targets (supports mixed formats).
- **Settings**: Adjust threads and timeouts to match your network speed.

## Legal Disclaimer
This tool is for **authorized** security auditing and inventory tracking **only**. Unauthorized scanning of external assets is strictly prohibited. Use responsibly.
