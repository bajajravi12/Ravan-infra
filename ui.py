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
    console.print(Panel.fit(banner, border_style="bold green", subtitle="[bold yellow]v3.0 - STABLE[/bold yellow]"))

def show_menu():
    table = Table(show_header=False, box=None, padding=(0, 2))
    table.add_column("Key", style="bold yellow")
    table.add_column("Option", style="bold white")
    
    table.add_row("🔥 [1]", "[bold green]SINGLE BUG HUNTER[/bold green]")
    table.add_row("🚀 [2]", "[bold cyan]CIDR RANGE ATTACK[/bold cyan]")
    table.add_row("📦 [3]", "[bold blue]BULK SCAN (LIST/FILE)[/bold blue]")
    table.add_row("🎯 [4]", "[bold magenta]METHOD ANALYZER[/bold magenta]")
    table.add_row("🔍 [5]", "[bold bright_white]REVERSE DNS PRO[/bold bright_white]")
    table.add_row("📂 [6]", "[bold yellow]VIEW SAVED LOGS[/bold yellow]")
    table.add_row("⚙️ [7]", "[bold white]HUNTER SETTINGS[/bold white]")
    table.add_row("❌ [8]", "[bold red]EXIT PROGRAM[/bold red]")
    
    console.print(Panel(table, title="[bold red]──『 RAVAN CONTROL CENTER 』──[/bold red]", border_style="bold green", padding=(1, 1)))

import datetime

def show_hit_panel(res):
    now = datetime.datetime.now().strftime("%H:%M:%S")
    
    table = Table(show_header=False, box=None, padding=(0, 1))
    table.add_column("Key", style="bold cyan", width=12)
    table.add_column("Value", style="white")
    
    table.add_row("Target", f"[bold yellow]{res['target']}[/bold yellow]")
    table.add_row("IP", res['ip'])
    table.add_row("Infra", f"[bold {res.get('color', 'white')}]{res['type']}[/bold {res.get('color', 'white')}]")
    if res.get('server'):
        table.add_row("Server", res['server'])
    table.add_row("Proxy", res.get('proxy', 'Direct'))
    table.add_row("Status", f"HTTP {res['status']}")
    table.add_row("Signal", f"[bold green]{res['signal']}[/bold green]")
    table.add_row("TLS", res.get('tls', 'Disabled'))
    
    panel = Panel(
        table,
        title=f"[bold green]✓ HIT [{now}][/bold green]",
        border_style="bold green",
        expand=False
    )
    console.print(panel)

def print_live(result):
    if not result:
        return
    
    # Live rendering for normal responses + HIT panels for interesting ones
    if isinstance(result, list):
        for res in result:
            if res.get('high_signal'):
                show_hit_panel(res)
            else:
                color = res.get('color', 'white')
                text = f"[bold green][LIVE][/bold green] [white]{res['target']}[/white] | [bold yellow]{res['ip']}[/bold yellow] | [bold {color}]{res['type']}[/bold {color}] | {res['status']}"
                console.print(text)
    else:
        if result.get('high_signal'):
            show_hit_panel(result)
        else:
            color = result.get('color', 'white')
            text = f"[bold green][LIVE][/bold green] [white]{result['target']}[/white] | [bold yellow]{result['ip']}[/bold yellow] | [bold {color}]{result['type']}[/bold {color}] | {result['status']}"
            console.print(text)
