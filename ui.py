from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.live import Live
from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn, TaskProgressColumn
import os

console = Console()

def show_banner():
    banner = """
[bold cyan]██████╗  ██████╗ 
██╔══██╗██╔═══██╗
██████╔╝██║   ██║
██╔══██╗██║▄▄ ██║
██║  ██║╚██████╔╝
╚═╝  ╚═╝ ╚══▀▀═╝[/bold cyan]
[bold green]RAVAN INFRA-X ULTRA[/bold green]
[bold yellow]PRODUCTION-GRADE INFRA DETECTOR[/bold yellow]
    """
    console.print(Panel.fit(banner, border_style="cyan"))

def show_menu():
    table = Table(show_header=False, box=None)
    table.add_column("Key", style="green", justify="right")
    table.add_column("Option", style="white")
    
    table.add_row("1", "SINGLE TARGET SCAN")
    table.add_row("2", "CIDR RANGE SCAN")
    table.add_row("3", "FILE SCAN (AUTO-DETECT)")
    table.add_row("4", "SETTINGS")
    table.add_row("5", "EXIT")
    
    console.print(Panel(table, title="[bold white]MAIN MENU[/bold white]", border_style="bright_black"))

def print_live(result):
    if not result:
        return
    text = f"[bold green]LIVE[/bold green] [white]{result['target']}[/white] | [bold yellow]{result['ip']}[/bold yellow] | [bold {result['color']}]{result['type']}[/bold {result['color']}] | {result['status']}"
    console.print(text)
