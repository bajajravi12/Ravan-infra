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
    
    table.add_row("➔ [1]", "SINGLE DOMAIN/IP SCAN")
    table.add_row("➔ [2]", "CIDR RANGE SCAN (ULTRA)")
    table.add_row("➔ [3]", "FILE BULK SCAN (AUTO)")
    table.add_row("➔ [4]", "IP ➔ DOMAIN LOOKUP")
    table.add_row("➔ [5]", "BROWSE LOGGED RESULTS")
    table.add_row("➔ [6]", "SYSTEM SETTINGS")
    table.add_row("➔ [7]", "EXIT PROGRAM")
    
    console.print(Panel(table, title="[bold magenta]『 MAIN CONTROL PANEL 』[/bold magenta]", border_style="bold cyan", border_style_attr=True))

def print_live(result):
    if not result:
        return
    # Result can be a list of results for multiple ports
    if isinstance(result, list):
        for res in result:
            text = f"[bold green]LIVE[/bold green] [white]{res['target']}[/white] | [bold yellow]{res['ip']}[/bold yellow] | [bold {res['color']}]{res['type']}[/bold {res['color']}] | {res['status']}"
            console.print(text)
    else:
        text = f"[bold green]LIVE[/bold green] [white]{result['target']}[/white] | [bold yellow]{result['ip']}[/bold yellow] | [bold {result['color']}]{result['type']}[/bold {result['color']}] | {result['status']}"
        console.print(text)
