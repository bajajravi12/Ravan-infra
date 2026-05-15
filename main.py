import sys
import os
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

from settings import load_settings, save_settings
from scanner import Scanner
from cidr import generate_ips
from file_parser import parse_file
from utils import detect_target_type, reverse_dns
from ui import show_banner, show_menu, console, print_live
from rich.prompt import Prompt
from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn, TaskProgressColumn, TimeElapsedColumn, MofNCompleteColumn, TimeRemainingColumn
from rich.table import Table
from rich.panel import Panel

def run_scan(target_list, settings, total=0):
    scanner = Scanner(settings)
    if total == 0 and hasattr(target_list, '__len__'):
        total = len(target_list)
    found = 0
    
    with Progress(
        SpinnerColumn(spinner_name="earth"),
        TextColumn("[bold magenta]{task.description}"),
        BarColumn(bar_width=None, complete_style="bold green", finished_style="bold cyan"),
        MofNCompleteColumn(),
        TaskProgressColumn(),
        TimeRemainingColumn(),
        console=console,
        expand=True
    ) as progress:
        task = progress.add_task("[bold red]『 HUNTER ACTIVE 』[/bold red]", total=total if total > 0 else None)
        
        with ThreadPoolExecutor(max_workers=settings['threads']) as executor:
            futures = {executor.submit(scanner.scan, t): t for t in target_list}
            for future in as_completed(futures):
                result = future.result()
                if result:
                    found += 1
                    print_live(result)
                progress.update(task, advance=1)
                
    console.print(f"\n[bold green]SCAN COMPLETE![/bold green] Found {found} responding hosts.")
    Prompt.ask("\n[bold yellow]Press ENTER to return to menu[/bold yellow]")

def view_results():
    RESULTS_DIR = "results"
    if not os.path.exists(RESULTS_DIR):
        console.print("[bold red]No scan results found yet![/bold red]")
        time.sleep(2)
        return
        
    files = [f for f in os.listdir(RESULTS_DIR) if f.endswith(".txt")]
    if not files:
        console.print("[bold red]No scan results found yet![/bold red]")
        time.sleep(2)
        return

    while True:
        console.clear()
        show_banner()
        console.print("[bold cyan]SCAN RESULTS LOG[/bold cyan]")
        for i, f in enumerate(files, 1):
            console.print(f"{i}. {f}")
        console.print(f"{len(files)+1}. Back")
        
        choice = Prompt.ask("\nSelect file to view", default=str(len(files)+1))
        if choice.isdigit() and 1 <= int(choice) <= len(files):
            file_path = os.path.join(RESULTS_DIR, files[int(choice)-1])
            with open(file_path, 'r') as f:
                content = f.read()
            console.print(Panel(content, title=f"[bold green]{files[int(choice)-1]}[/bold green]"))
            Prompt.ask("\n[bold yellow]Press ENTER to go back[/bold yellow]")
        else:
            break

def handle_settings(settings):
    while True:
        console.clear()
        show_banner()
        console.print("[bold white]SETTINGS[/bold white]")
        console.print(f"1. Threads: [yellow]{settings['threads']}[/yellow]")
        console.print(f"2. Timeout: [yellow]{settings['timeout']}s[/yellow]")
        console.print(f"3. Save Results: [yellow]{settings['save_results']}[/yellow]")
        console.print("4. Back to Main Menu")
        
        choice = Prompt.ask("\nSelect option", choices=["1", "2", "3", "4"])
        
        if choice == "1":
            t = Prompt.ask("Enter threads", default=str(settings['threads']))
            settings['threads'] = int(t)
        elif choice == "2":
            to = Prompt.ask("Enter timeout", default=str(settings['timeout']))
            settings['timeout'] = int(to)
        elif choice == "3":
            settings['save_results'] = not settings['save_results']
        else:
            save_settings(settings)
            break
        save_settings(settings)

def main():
    settings = load_settings()

    while True:
        console.clear()
        show_banner()
        show_menu()
        
        choice = Prompt.ask("\n[bold white]INPUT SEC-X[/bold white]", choices=["1", "2", "3", "4", "5", "6", "7", "8"])
        
        if choice == "1":
            target = Prompt.ask("Enter Domain or IP")
            run_scan([target], settings)
            
        elif choice == "2":
            cidr = Prompt.ask("Enter CIDR (e.g. 1.1.1.0/24)")
            console.print("[yellow]Preparing scan (Memory Optimized)...[/yellow]")
            from ipaddress import ip_network
            try:
                net = ip_network(cidr.strip(), strict=False)
                total_ips = net.num_addresses
                run_scan(generate_ips(cidr), settings, total=total_ips)
            except:
                console.print("[bold red]Invalid CIDR![/bold red]")
                time.sleep(2)
            
        elif choice == "3":
            path = Prompt.ask("Enter file path")
            if os.path.exists(path):
                raw_targets = parse_file(path)
                final_targets = []
                for rt in raw_targets:
                    t_type = detect_target_type(rt)
                    if t_type == 'cidr':
                        final_targets.extend(generate_ips(rt))
                    else:
                        final_targets.append(rt)
                run_scan(final_targets, settings)
            else:
                console.print("[bold red]File not found![/bold red]")
                time.sleep(2)
                
        elif choice == "4":
            target = Prompt.ask("Enter Target to Analyze")
            console.print(f"\n[bold cyan]Analyzing {target}...[/bold cyan]")
            scanner = Scanner(settings)
            res = scanner.scan(target)
            if res:
                console.print("\n[bold green]ANALYSIS COMPLETE[/bold green]")
                if isinstance(res, list):
                    for r in res:
                        console.print(f" Port: [yellow]{r['port']}[/yellow] | IP: [green]{r['ip']}[/green] | Method: [bold cyan]{r['method']}[/bold cyan]")
                else:
                    console.print(f" IP: [green]{res['ip']}[/green] | Method: [bold cyan]{res['method']}[/bold cyan]")
            else:
                console.print("[bold red]Host not responding or invalid.[/bold red]")
            Prompt.ask("\n[bold yellow]Press ENTER to return[/bold yellow]")

        elif choice == "5":
            ip = Prompt.ask("Enter IP for Reverse DNS")
            result = reverse_dns(ip)
            console.print(f"\n[bold green]IP:[/bold green] {ip}")
            console.print(f"[bold green]Domain:[/bold green] {result}")
            Prompt.ask("\n[bold yellow]Press ENTER to continue[/bold yellow]")

        elif choice == "6":
            view_results()

        elif choice == "7":
            handle_settings(settings)
            
        elif choice == "8":
            console.print("[bold yellow]Exiting...[/bold yellow]")
            sys.exit()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        console.print("\n[bold red]Interrupted by user.[/bold red]")
        sys.exit()
