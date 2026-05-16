import sys
import os
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

from .settings import load_settings, save_settings
from .scanner import Scanner
from .cidr import generate_ips
from .file_parser import parse_file
from .utils import detect_target_type, reverse_dns, get_cidr
from .ui import show_banner, show_menu, console, print_live
from rich.prompt import Prompt
from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn, TaskProgressColumn, TimeElapsedColumn, MofNCompleteColumn, TimeRemainingColumn
from rich.table import Table
from rich.panel import Panel

def run_scan(target_list, settings, total=0, session_file=None, force_show=False, manual_ports=None):
    scanner = Scanner(settings, session_file=session_file)
    found = 0
    
    # Use manual ports if provided, otherwise scanner defaults
    active_ports = manual_ports if manual_ports else scanner.ports
    num_ports = len(active_ports)
    
    if total > 0:
        real_total = total * num_ports
    elif isinstance(target_list, list):
        real_total = len(target_list) * num_ports
    else:
        real_total = None # Generator mode

    with Progress(
        SpinnerColumn(spinner_name="earth"),
        TextColumn("[bold magenta]{task.description}"),
        TextColumn("[white]{task.fields[current_target]}"),
        BarColumn(bar_width=None, complete_style="bold green", finished_style="bold cyan"),
        MofNCompleteColumn(),
        TaskProgressColumn(),
        TextColumn("[blue]Found: {task.fields[found]}"),
        TimeRemainingColumn(),
        console=console,
        expand=True
    ) as progress:
        task = progress.add_task("[bold red]『 HUNTER ACTIVE 』[/bold red]", total=real_total, found=0, current_target="")
        
        with ThreadPoolExecutor(max_workers=settings['threads']) as executor:
            futures_to_target = {}
            for target in target_list:
                if ':' in target and not target.startswith('http'):
                    parts = target.split(':')
                    domain = parts[0].strip()
                    try:
                        scan_ports = [int(parts[1])]
                    except:
                        scan_ports = active_ports
                else:
                    domain = target.replace('http://', '').replace('https://', '').split('/')[0].split(':')[0].strip()
                    scan_ports = active_ports

                if not domain:
                    progress.update(task, advance=num_ports)
                    continue
                for port in scan_ports:
                    f = executor.submit(scanner.scan_port, domain, port)
                    futures_to_target[f] = f"{domain}:{port}"

            for future in as_completed(futures_to_target):
                result = future.result()
                current_t = futures_to_target[future]
                progress.update(task, current_target=f"[white]{current_t}[/white]")
                if result:
                    found += 1
                    progress.update(task, found=found)
                    print_live(result, force_show=force_show, settings=settings)
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
    from .output import RESULTS_DIR
    if not RESULTS_DIR.exists():
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
        console.print(f"3. HTTP/2 Protocol: [yellow]{settings.get('http2', True)}[/yellow]")
        console.print(f"4. High Signals: [yellow]{', '.join(settings.get('high_signals', []))}[/yellow]")
        console.print(f"5. Save Results: [yellow]{settings['save_results']}[/yellow]")
        console.print("6. Back to Main Menu")
        
        choice = Prompt.ask("\nSelect option", choices=["1", "2", "3", "4", "5", "6"])
        
        if choice == "1":
            t = Prompt.ask("Enter threads", default=str(settings['threads']))
            settings['threads'] = int(t)
        elif choice == "2":
            to = Prompt.ask("Enter timeout", default=str(settings['timeout']))
            settings['timeout'] = int(to)
        elif choice == "3":
            settings['http2'] = not settings.get('http2', True)
        elif choice == "4":
            console.print("\n[cyan]Enter new high signals separated by comma (e.g. CloudFront, 101, Cloudflare)[/cyan]")
            val = Prompt.ask("High Signals")
            if val:
                settings['high_signals'] = [v.strip() for v in val.split(',')]
        elif choice == "5":
            settings['save_results'] = not settings['save_results']
        else:
            save_settings(settings)
            break
        save_settings(settings)

def get_manual_ports():
    ports_input = Prompt.ask("Enter Ports (e.g. 80,443,8080) or blank for default")
    if not ports_input.strip():
        return None
    try:
        # Handle comma separated
        if ',' in ports_input:
            return [int(p.strip()) for p in ports_input.split(',')]
        # Handle range
        if '-' in ports_input:
            start, end = map(int, ports_input.split('-'))
            return list(range(start, end + 1))
        # Single port
        return [int(ports_input.strip())]
    except Exception as e:
        console.print(f"[bold red]Invalid port input: {e}. Using defaults.[/bold red]")
        return None

def main():
    settings = load_settings()

    while True:
        try:
            if os.name == 'nt':
                os.system('cls')
            else:
                os.system('clear')
        except:
            console.clear()
            
        show_banner()
        show_menu()
        
        choice = Prompt.ask("\n[bold white]INPUT SEC-X[/bold white]", choices=["1", "2", "3", "4", "5", "6", "7", "8", "9"])
        
        if choice == "1":
            target = Prompt.ask("Enter Domain or IP")
            p = get_manual_ports()
            run_scan([target], settings, total=1, force_show=True, manual_ports=p)
            
        elif choice == "2":
            cidr = Prompt.ask("Enter CIDR (e.g. 1.1.1.0/24)")
            p = get_manual_ports()
            console.print("[yellow]Preparing scan (Memory Optimized)...[/yellow]")
            from ipaddress import ip_network
            try:
                clean_cidr = cidr.strip().replace('/', '_')
                session_file = f"{clean_cidr}.txt"
                net = ip_network(cidr.strip(), strict=False)
                total_ips = net.num_addresses
                run_scan(generate_ips(cidr), settings, total=total_ips, session_file=session_file, manual_ports=p)
            except Exception as e:
                console.print(f"[bold red]Invalid CIDR: {e}[/bold red]")
                time.sleep(2)
            
        elif choice == "3":
            path = Prompt.ask("Enter file path")
            if os.path.exists(path):
                p = get_manual_ports()
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
                run_scan(target_generator(), settings, session_file=session_file, manual_ports=p)
            else:
                console.print("[bold red]File not found![/bold red]")
                time.sleep(2)
                
        elif choice == "4":
            target = Prompt.ask("Enter Target to Analyze")
            p = get_manual_ports()
            console.print(f"\n[bold cyan]Analyzing {target}...[/bold cyan]")
            # For analyzer, we specifically want to see details
            run_scan([target], settings, total=1, force_show=True, manual_ports=p)

        elif choice == "5":
            ip = Prompt.ask("Enter IP for Reverse DNS")
            result = reverse_dns(ip)
            console.print(f"\n[bold green]IP:[/bold green] {ip}")
            console.print(f"[bold green]Domain:[/bold green] {result}")
            Prompt.ask("\n[bold yellow]Press ENTER to continue[/bold yellow]")

        elif choice == "6":
            ip = Prompt.ask("Enter IP to find CIDR")
            console.print(f"\n[bold cyan]Fetching WHOIS/RDAP data for {ip}...[/bold cyan]")
            result = get_cidr(ip)
            console.print(f"\n[bold green]IP:[/bold green] {ip}")
            console.print(f"[bold green]CIDR:[/bold green] [bold yellow]{result}[/bold yellow]")
            Prompt.ask("\n[bold yellow]Press ENTER to continue[/bold yellow]")

        elif choice == "7":
            view_results()

        elif choice == "8":
            handle_settings(settings)
            
        elif choice == "9":
            console.print("[bold yellow]Exiting...[/bold yellow]")
            sys.exit()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        console.print("\n[bold red]Interrupted by user.[/bold red]")
        sys.exit()
