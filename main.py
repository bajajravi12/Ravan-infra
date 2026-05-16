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

def run_scan(target_list, settings, total=0, session_file=None):
    scanner = Scanner(settings, session_file=session_file)
    found = 0
    
    # Calculate real total for progress bar (targets * ports)
    num_ports = len(scanner.ports)
    
    if total > 0:
        real_total = total * num_ports
    elif isinstance(target_list, list):
        real_total = len(target_list) * num_ports
    else:
        real_total = None # Generator mode

    with Progress(
        SpinnerColumn(spinner_name="earth"),
        TextColumn("[bold magenta]{task.description}"),
        BarColumn(bar_width=None, complete_style="bold green", finished_style="bold cyan"),
        MofNCompleteColumn(),
        TaskProgressColumn(),
        TextColumn("[blue]Found: {task.fields[found]}"),
        TimeRemainingColumn(),
        console=console,
        expand=True
    ) as progress:
        task = progress.add_task("[bold red]『 HUNTER ACTIVE 』[/bold red]", total=real_total, found=0)
        
        with ThreadPoolExecutor(max_workers=settings['threads']) as executor:
            futures = []
            for target in target_list:
                if ':' in target and not target.startswith('http'):
                    parts = target.split(':')
                    domain = parts[0].strip()
                    try:
                        scan_ports = [int(parts[1])]
                    except:
                        scan_ports = scanner.ports
                else:
                    domain = target.replace('http://', '').replace('https://', '').split('/')[0].split(':')[0].strip()
                    scan_ports = scanner.ports

                if not domain:
                    progress.update(task, advance=num_ports)
                    continue
                for port in scan_ports:
                    futures.append(executor.submit(scanner.scan_port, domain, port))

            for future in as_completed(futures):
                result = future.result()
                if result:
                    found += 1
                    progress.update(task, found=found)
                    print_live(result)
                progress.update(task, advance=1)
                
    console.print(f"\n[bold green]SCAN COMPLETE![/bold green] Found {found} responding hosts.")
    
    if found > 0:
        save = Prompt.ask("\nSave results to file?", choices=["Y", "N"], default="Y")
        if save.upper() == "N":
            # If they don't want to save, we should ideally not have saved them automatically
            # but current architecture saves as it goes. We can just leave it or manage it better.
            # For now, let's just confirm they were logged.
            console.print("[yellow]Results were logged to the results/ directory.[/yellow]")
    
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
            file_name = files[int(choice)-1]
            file_path = os.path.join(RESULTS_DIR, file_name)
            
            table = Table(title=f"[bold cyan]Content of {file_name}[/bold cyan]", show_lines=True)
            table.add_column("Target", style="white")
            table.add_column("IP", style="yellow")
            table.add_column("Infra", style="magenta")
            table.add_column("Server", style="green")
            table.add_column("Status", style="cyan")
            table.add_column("Signal", style="white")

            with open(file_path, 'r') as f:
                for line in f:
                    if '|' in line:
                        parts = [p.strip() for p in line.split('|')]
                        if len(parts) >= 6:
                            table.add_row(*parts[:6])
                        else:
                            table.add_row(line.strip(), "", "", "", "", "")
                    else:
                        table.add_row(line.strip(), "", "", "", "", "")
            
            console.print(table)
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
            run_scan([target], settings, total=1)
            
        elif choice == "2":
            cidr = Prompt.ask("Enter CIDR (e.g. 1.1.1.0/24)")
            console.print("[yellow]Preparing scan (Memory Optimized)...[/yellow]")
            from ipaddress import ip_network
            try:
                clean_cidr = cidr.strip().replace('/', '_')
                session_file = f"{clean_cidr}.txt"
                net = ip_network(cidr.strip(), strict=False)
                total_ips = net.num_addresses
                run_scan(generate_ips(cidr), settings, total=total_ips, session_file=session_file)
            except Exception as e:
                console.print(f"[bold red]Invalid CIDR: {e}[/bold red]")
                time.sleep(2)
            
        elif choice == "3":
            path = Prompt.ask("Enter file path")
            if os.path.exists(path):
                def target_generator():
                    raw_targets = parse_file(path)
                    for rt in raw_targets:
                        t_type = detect_target_type(rt)
                        if t_type == 'cidr':
                            for ip in generate_ips(rt):
                                yield str(ip)
                        else:
                            yield rt
                
                # Estimate total matches for progress
                # Note: This reads the generator once, which is slow for huge files. 
                # Better to just use None total if it's too big, but let's try to keep it simple.
                session_file = "bughosts_results.txt"
                run_scan(target_generator(), settings, session_file=session_file)
            else:
                console.print("[bold red]File not found![/bold red]")
                time.sleep(2)
                
        elif choice == "4":
            target = Prompt.ask("Enter Target to Analyze")
            console.print(f"\n[bold cyan]Analyzing {target}...[/bold cyan]")
            scanner = Scanner(settings)
            results = scanner.scan(target)
            if results:
                console.print("\n[bold green]ANALYSIS COMPLETE[/bold green]")
                for r in results:
                    from ui import show_hit_panel
                    show_hit_panel(r)
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
