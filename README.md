# RAVAN INFRA-X ULTRA (RQRV)

The Ultimate Bug Host Hunter Tool.

## 🚀 Installation & Usage

### Method 1: Global Install (Recommended)
Install the tool as a package. This allows you to run it from anywhere using the `rq` command.
```bash
pip install git+https://github.com/bajajravi12/Ravan-infra.git
```
**Run Tool:**
```bash
rq
```

### Method 2: Local Execution
If you prefer running it locally without a global install:
1. **Clone the Project:**
```bash
git clone https://github.com/bajajravi12/Ravan-infra.git
cd Ravan-infra
```
2. **Install Dependencies:**
```bash
pip install -r requirements.txt
```
3. **Run Tool:**
```bash
python main.py
```

---

## 🛠️ GitHub Push Setup (No More Password Errors)
If you are facing "Password authentication is deprecated" errors while pushing code, check the:
👉 **[GITHUB_SETUP.md](./GITHUB_SETUP.md)** guide.

---

## Features
- **🔥 Parallel Hunter Engine**: Simultaneously scans multiple domains AND multiple ports.
- **🎯 Smart Infra Fingerprinting**: Detects Cloudflare, Akamai, AWS, Nginx, etc.
- **🛠️ Bug Method Suggester**: Automatically suggests payloads (WS/gRPC, CDN/SSL).
- **🔍 Reverse DNS & CIDR**: Built-in tools for deep network analysis.
- **📂 Auto-Logger**: Real-time logging to organized files in `~/.rqrv/results`.
- **🚀 Advanced CIDR Scanner**: Memory-optimized range scanning.
- **⚡ Mixed Target Detection**: Automatically identifies if a target is a Domain, IP, or CIDR.

## Legal Disclaimer
This tool is for **authorized** security auditing and inventory tracking **only**. Unauthorized scanning of external assets is strictly prohibited. Use responsibly.
