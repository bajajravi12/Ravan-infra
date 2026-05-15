import sys
import os
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

from settings import load_settings, save_settings
from scanner import Scanner
from cidr import generate_ips
from file_parser import parse_file
from utils import detect_target_type
from ui import show_banner, show_menu, console, print_live
from rich.prompt import Prompt
from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn, TaskProgressColumn, TimeElapsedColumn

def run_scan(target_list, settings, total=0):
    scanner = Scanner(settings)
    if total == 0 and hasattr(target_list, '__len__'):
        total = len(target_list)
    found = 0
    
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        BarColumn(bar_width=None),
        TaskProgressColumn(),
        TimeElapsedColumn(),
        console=console,
        expand=True
    ) as progress:
        task = progress.add_task("[cyan]Scanning...", total=total if total > 0 else None)
        
        with ThreadPoolExecutor(max_workers=settings['threads']) as executor:
            futures = {executor.submit(scanner.scan, t): t for t in target_list}
            for future in as_completed(futures):
                result = future.result()
                if result:
                    found += 1
                    print_live(result)
                progress.update(task, advance=1)
                
    console.print(f"\n[bold green]SCAN COMPLETE![/bold green] Found {found} responding targets.")
    time.sleep(2)

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
        
        choice = Prompt.ask("\nSelect option", choices=["1", "2", "3", "4", "5"])
        
        if choice == "1":
            target = Prompt.ask("Enter Domain or IP")
            run_scan([target], settings)
            
        elif choice == "2":
            cidr = Prompt.ask("Enter CIDR (e.g. 1.1.1.0/24)")
            console.print("[yellow]Preparing scan (Memory Optimized)...[/yellow]")
            # For progress bar to work we need total, but for huge CIDR we can just use 0 as total if we don't want to calculate it.
            # However, calculation is fast for CIDR.
            from ipaddress import ip_network
            net = ip_network(cidr.strip(), strict=False)
            total_ips = net.num_addresses
            run_scan(generate_ips(cidr), settings, total=total_ips)
            
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
            handle_settings(settings)
            
        elif choice == "5":
            console.print("[bold yellow]Exiting...[/bold yellow]")
            sys.exit()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        console.print("\n[bold red]Interrupted by user.[/bold red]")
        sys.exit()
