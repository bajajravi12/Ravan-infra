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
[bold gradient(0,255,100,255,255,0)]RAVAN INFRA-X ULTRA[/bold gradient]
[bold white]— EXTREME BUG HOST HUNTER —[/bold white]
    """
    console.print(Panel.fit(banner, border_style="bold magenta", shadow=True))

def show_menu():
    table = Table(show_header=False, box=None, padding=(0, 2))
    table.add_column("Key", style="bold green")
    table.add_column("Option", style="bold white")
    
    table.add_row("[1]", "SINGLE TARGET SCAN")
    table.add_row("[2]", "CIDR RANGE SCAN")
    table.add_row("[3]", "FILE SCAN (AUTO-DETECT)")
    table.add_row("[4]", "IP TO DOMAIN (REVERSE DNS)")
    table.add_row("[5]", "VIEW SCANNED RESULTS")
    table.add_row("[6]", "SETTINGS")
    table.add_row("[7]", "EXIT")
    
    console.print(Panel(table, title="[bold cyan]CONTROL CENTER[/bold cyan]", border_style="bold blue"))

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
