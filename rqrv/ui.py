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
[bold red]R[/bold red][bold yellow]A[/bold yellow][bold green]V[/bold green][bold cyan]A[/bold cyan][bold blue]N[/bold blue] [bold magenta]I[/bold magenta][bold red]N[/bold red][bold yellow]F[/bold yellow][bold green]R[/bold green][bold cyan]A[/bold cyan][bold blue]-[/bold blue][bold magenta]X[/bold magenta] [bold red]U[/bold red][bold yellow]L[/bold yellow][bold green]T[/bold green][bold cyan]R[/bold cyan][bold blue]A[/bold blue]
[bold white]⚡ THE ULTIMATE BUG HOST HUNTER ⚡[/bold white]
    """
    console.print(Panel.fit(banner, border_style="bold green", subtitle="[bold yellow]v3.6.4 - STABLE[/bold yellow]"))

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
    table.add_row("❌ [9]", "[bold red]EXIT PROGRAM[/bold red]")
    
    console.print(Panel(table, title="[bold red]──『 RAVAN CONTROL CENTER 』──[/bold red]", border_style="bold green", padding=(1, 1)))

import datetime

def show_hit_panel(res):
    now = datetime.datetime.now().strftime("%H:%M:%S")
    
    status_code = res.get('status')
    protocol = res.get('protocol', 'HTTP/1.1')
    
    border_style = "bold red" if status_code == "SSL_ERR" else "bold green"
    title = f"[bold red]⚠ SSL ERROR [{now}][/bold red]" if status_code == "SSL_ERR" else f"[bold green]✓ HIT [{now}][/bold green]"
    
    table = Table(show_header=False, box=None, padding=(0, 1))
    table.add_column("Key", style="bold cyan", width=12)
    table.add_column("Value", style="white")
    
    target_val = f"[bold yellow]{res['target']}[/bold yellow]"
    table.add_row("Proxy", target_val)
    
    server_val = res.get('server', 'Unknown')
    if res.get('type') != "UNKNOWN" and res.get('type') != "SSL_HANDSHAKE_FAILURE":
        server_val = f"{res['type']} {server_val}"
    table.add_row("Server", server_val)
    
    if status_code == 101:
        status_text = f"{protocol} 101 [bold red]KennXV Switching Protocols[/bold red]"
    elif status_code == "SSL_ERR":
        status_text = f"{protocol} [bold red]SSL Handshake Failure[/bold red]"
    else:
        status_text = f"{protocol} {status_code}"
    
    table.add_row("Status", status_text)
    
    if res.get('proxy'):
        table.add_row("Method", f"[bold cyan]{res.get('method', 'GET')}[/bold cyan]")
    
    table.add_row("Signal", f"[bold {res.get('color', 'green')}]{res['signal']}[/bold {res.get('color', 'green')}]")
    
    panel = Panel(
        table,
        title=title,
        border_style=border_style,
        expand=False
    )
    console.print(panel)

def print_live(result, force_show=False, settings=None):
    if not result:
        return
    
    high_signals = settings.get('high_signals', []) if settings else []
    
    def should_show_panel(res):
        if force_show: return True
        if res.get('status') == "SSL_ERR": return True
        if res.get('high_signal'): return True
        
        # Custom checks
        sig = res.get('signal', '')
        infra = res.get('type', '')
        status = str(res.get('status', ''))
        
        for hs in high_signals:
            if hs.lower() in sig.lower() or hs.lower() in infra.lower() or hs.lower() in status.lower():
                return True
        return False

    def handle_res(res):
        if res.get('status') == "ERROR":
            if force_show: # Only show explicit errors in single/analyze mode
                console.print(f"[bold red][ERR][/bold red] [white]{res['target']}[/white] | [red]{res['error']}[/red]")
            return

        if should_show_panel(res):
            show_hit_panel(res)
        else:
            color = res.get('color', 'white')
            status = res.get('status', 'UNK')
            proto = res.get('protocol', 'H1')
            if proto == "HTTP/2": proto = "H2"
            elif proto == "HTTP/1.1": proto = "H1"
            
            text = f"[bold green][LIVE][/bold green] [white]{res['target']}[/white] | [bold yellow]{res['ip']}[/bold yellow] | [bold {color}]{res['type']}[/bold {color}] | {proto} {status}"
            console.print(text)

    if isinstance(result, list):
        for r in result:
            handle_res(r)
    else:
        handle_res(result)
