# RAVAN INFRA-X ULTRA (RQRV)

Production-grade, high-speed infrastructure inventory and server fingerprinting tool.

## 🚀 Easy Installation (Only 2 Commands)

Ab aap is tool ko sirf 2 simple commands se install aur run kar sakte hain:

**1. Install Tool:**
```bash
pip install git+https://github.com/bajajravi12/Ravan-infra.git
```

**2. Run Tool:**
```bash
rqrv
```

---

## Features
- **🔥 Parallel Hunter Engine**: Simultaneously scans multiple domains AND multiple ports.
- **🎯 Smart Infra Fingerprinting**: Detects Cloudflare, Akamai, AWS, Nginx, etc.
- **🛠️ Bug Method Suggester**: Automatically suggests payloads (WS/gRPC, CDN/SSL).
- **🔍 Reverse DNS & CIDR**: Built-in tools for deep network analysis.
- **📂 Auto-Logger**: Real-time logging to organized files in `~/.rqrv/results`.

## Use Cases
- **Single Scan**: Quick analysis of a single host.
- **Bulk Scan**: Scan a list of domains from a file.
- **CIDR Scan**: Scan an entire IP range.
- **Reverse DNS**: Find hostnames for a list of IPs.

## Note for Termux Users
Agar aap Termux use kar rahe hain, toh pehle ye command zaroor chalayein:
```bash
pkg update && pkg upgrade -y && pkg install python git -y
```
Uske baad upar di gayi **2 Commands** se install karein.

## Usage
- **Single Scan**: Quick analysis of a single host.
- **CIDR Scan**: Discover active hosts across an entire network range.
- **File Scan**: Bulk scan a list of targets (supports mixed formats).
- **Settings**: Adjust threads and timeouts to match your network speed.

## Legal Disclaimer
This tool is for **authorized** security auditing and inventory tracking **only**. Unauthorized scanning of external assets is strictly prohibited. Use responsibly.
