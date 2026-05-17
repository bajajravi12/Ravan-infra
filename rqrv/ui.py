from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.live import Live
from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn, TaskProgressColumn
import os

console = Console()

def show_banner():
    banner = """
[bold red]██████╗  ██████╗ [/bold red]
[bold yellow]██╔══██╗██╔═══██╗[/bold yellow]
[bold green]██████╔╝██║   ██║[/bold green]
[bold cyan]██╔══██╗██║▄▄ ██║[/bold cyan]
[bold blue]██║  ██║╚██████╔╝[/bold blue]
[bold magenta]╚═╝  ╚═╝ ╚══▀▀═╝[/bold magenta]
[bold red]R[/bold red][bold yellow]A[/bold yellow][bold green]V[/bold green][bold cyan]A[/bold cyan][bold blue]N[/bold blue] [bold magenta]I[/bold magenta][bold red]N[/bold red][bold yellow]F[/bold yellow][bold green]R[/bold green][bold cyan]A[/bold cyan][bold blue]X[/bold blue] [bold magenta]U[/bold magenta][bold red]L[/bold red][bold yellow]T[/bold yellow][bold green]R[/bold green][bold cyan]A[/bold cyan]
[bold white]⚡ THE ULTIMATE BUG HOST HUNTER ⚡[/bold white]
    """
    console.print(Panel.fit(banner, border_style="bold green", subtitle="[bold yellow]v3.6.6 - STABLE[/bold yellow]"))

def show_menu():
    table = Table(show_header=False, box=None, padding=(0, 2))
    table.add_column("Key", style="bold yellow")
    table.add_column("Option", style="bold white")
    
    table.add_row("🔥 [1]", "[bold green]SINGLE BUG HUNTER[/bold green]")
    table.add_row("🚀 [2]", "[bold cyan]CIDR RANGE ATTACK[/bold cyan]")
    table.add_row("📦 [3]", "[bold blue]BULK SCAN (LIST/FILE)[/bold blue]")
    table.add_row("🎯 [4]", "[bold magenta]METHOD ANALYZER[/bold magenta]")
    table.add_row("🔍 [5]", "[bold bright_white]REVERSE DNS PRO[/bold bright_white]")
    table.add_row("🌐 [6]", "[bold green]IP TO CIDR FINDER[/bold green]")
    table.add_row("📂 [7]", "[bold yellow]VIEW SAVED LOGS[/bold yellow]")
    table.add_row("⚙️ [8]", "[bold white]HUNTER SETTINGS[/bold white]")
    table.add_row("ℹ️ [9]", "[bold cyan]ABOUT RQRV[/bold cyan]")
    table.add_row("❌ [10]", "[bold red]EXIT PROGRAM[/bold red]")
    
    # Use Panel.fit for main menu too if it helps alignment, or just keep it centered.
    console.print(Panel(table, title="[bold red]──『 RAVAN MENU 』──[/bold red]", border_style="bold green", padding=(1, 1), expand=False))

import datetime

def show_hit_panel(res):
    now = datetime.datetime.now().strftime("%H:%M:%S")
    
    status_code = res.get('status')
    protocol = res.get('protocol', 'HTTP/1.1')
    
    # Premium Colors
    border_style = "bold green"
    if status_code == 101: border_style = "bold yellow"
    elif status_code == "SSL_ERR": border_style = "bold red"
    
    title = f"[bold green]✓ HIT [{now}][/bold green]"
    if status_code == "SSL_ERR": title = f"[bold red]⚠ SSL ERROR [{now}][/bold red]"
    
    table = Table(show_header=False, box=None, padding=(0, 1))
    table.add_column("Key", style="bold cyan", width=14)
    table.add_column("Value", style="white")
    
    table.add_row("Proxy IP:PORT", f"[bold yellow]{res['target']}[/bold yellow]")

    if res.get('dns') and res['dns'] != "Unknown Host":
        table.add_row("DNS Hostname", f"[bold magenta]{res['dns']}[/bold magenta]")
    
    server_val = res.get('server', 'Unknown')
    infra_type = res.get('type', 'UNKNOWN')
    if infra_type != "UNKNOWN" and infra_type != "SSL_HANDSHAKE_FAILURE":
        server_val = f"[bold {res.get('color', 'white')}]{infra_type}[/bold {res.get('color', 'white')}] ({server_val})"
    
    table.add_row("Server", server_val)
    
    if status_code == 101:
        status_text = f"[bold white]{protocol}[/bold white] [bold yellow]101 Switching Protocols[/bold yellow]"
    elif status_code == "SSL_ERR":
        status_text = f"[bold white]{protocol}[/bold white] [bold red]Handshake Failure[/bold red]"
    else:
        status_text = f"[bold white]{protocol}[/bold white] [bold green]{status_code}[/bold green]"
    
    table.add_row("Status", status_text)
    table.add_row("Method", f"[bold cyan]{res.get('method', 'HTTP')}[/bold cyan]")
    table.add_row("Signal", f"[bold {res.get('color', 'green')}]{res['signal']}[/bold {res.get('color', 'green')}]")

    tls_status = res.get('tls', 'Enabled')
    tls_color = "green" if tls_status == "Enabled" else "red"
    table.add_row("TLS", f"[bold {tls_color}]{tls_status}[/bold {tls_color}]")
    
    http_v = res.get('protocol', 'HTTP/1.1')
    table.add_row("HTTP Version", f"[bold white]{http_v}[/bold white]")
    
    panel = Panel(
        table,
        title=title,
        border_style=border_style,
        expand=False,
        width=min(console.width - 2, 48), # Mobile safe width
        padding=(0, 1)
    )
    console.print(panel)

def print_live(result, force_show=False, settings=None):
    if not result:
        return
    
    def should_show_premium(res):
        if force_show: return True
        # Only show the premium box for these interesting statuses or high signals
        status = res.get('status')
        if status in [101, 200, "SSL_ERR"]: return True
        if res.get('high_signal'): return True
        return False

    def handle_res(res):
        if res.get('status') == "ERROR":
            return # Silent errors in bulk mode

        if should_show_premium(res):
            show_hit_panel(res)
        else:
            # Filter out non-interesting 404/403/502 etc unless they have unique infra
            infra = res.get('type', 'UNKNOWN')
            status = res.get('status')
            if infra == "UNKNOWN" and status in [404, 403, 502, 503, 504, 400]:
                return # Silence noise
                
            color = res.get('color', 'white')
            proto = res.get('protocol', 'H1')
            if "2" in str(proto): proto = "H2"
            else: proto = "H1"
            
            text = f"[bold green][LIVE][/bold green] [white]{res['target']}[/white] | [bold yellow]{res['ip']}[/bold yellow] | [bold {color}]{infra}[/bold {color}] | {proto} {status}"
            console.print(text)

    if isinstance(result, list):
        for r in result:
            handle_res(r)
    else:
        handle_res(result)
