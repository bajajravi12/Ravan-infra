import sys
import os
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

from .settings import load_settings, save_settings
from .scanner import Scanner
from .cidr import generate_ips
from .file_parser import parse_file
from .utils import detect_target_type, reverse_dns, get_cidr, reverse_dns_pro
from .ui import show_banner, show_menu, console, print_live, get_width, custom_prompt
import json
import signal
import threading
from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn, TaskProgressColumn
from rich.prompt import Prompt
from rich.table import Table
from rich.panel import Panel
from rich.text import Text

SESSION_FILE = "session_state.json"

def save_session(state):
    try:
        with open(SESSION_FILE, 'w') as f:
            json.dump(state, f)
    except:
        pass

def load_session():
    if os.path.exists(SESSION_FILE):
        try:
            with open(SESSION_FILE, 'r') as f:
                return json.load(f)
        except:
            return None
    return None

def clear_session():
    if os.path.exists(SESSION_FILE):
        try: os.remove(SESSION_FILE)
        except: pass

def detect_txt_files():
    search_paths = [
        os.path.expanduser("~"),
        os.path.expanduser("~/storage/shared"),
        os.path.expanduser("~/storage/downloads"),
        os.path.expanduser("~/storage/documents"),
        os.getcwd()
    ]
    txt_files = []
    for p in search_paths:
        if os.path.exists(p):
            try:
                for f in os.listdir(p):
                    if f.endswith(".txt"):
                        txt_files.append(os.path.join(p, f))
            except:
                continue
    return list(set(txt_files))[:15] # Limit to top 15

def run_scan(target_list, settings, total=0, session_file=None, force_show=False, manual_ports=None, start_index=0, state_meta=None, enable_controls=False):
    scanner = Scanner(settings, session_file=session_file)
    found_count = 0
    seen_hits = set()
    current_index = start_index
    
    # Use manual ports if provided, otherwise scanner defaults
    active_ports = manual_ports if manual_ports else scanner.ports
    num_ports = len(active_ports)
    
    if total > 0:
        real_total = total * num_ports
    elif isinstance(target_list, list):
        real_total = len(target_list) * num_ports
    else:
        real_total = None # Generator mode

    # If resume, adjust progress
    start_advance = start_index * num_ports
    
    if enable_controls:
        console.print(f"\n[bold yellow]Scan Control: [P] Pause | [R] Resume | [Q] Quit & Save[/bold yellow]")

    # Compact progress for Termux/Mobile
    with Progress(
        SpinnerColumn(spinner_name="earth"),
        TextColumn("[bold red]『 HUNTER ACTIVE 』[/]\n[cyan]{task.fields[target]}[/]\n"),
        BarColumn(bar_width=12, complete_style="green", finished_style="blue"),
        TextColumn("[white]{task.percentage:>3.0f}%[/]"),
        TextColumn("[bold blue]H:{task.fields[found]}[/] [bold white]/ T:{task.total}[/]"),
        console=console,
        expand=False,
        refresh_per_second=10
    ) as progress:
        task = progress.add_task("HUNT", total=real_total, found=0, target="Initializing...", completed=start_advance)
        
        if enable_controls:
            def control_listener():
                import sys
                import select
                while not scanner.stop_event.is_set():
                    try:
                        # Non-blocking check for input
                        ready, _, _ = select.select([sys.stdin], [], [], 0.1)
                        if ready:
                            line = sys.stdin.readline().strip().lower()
                            if not line: continue
                            cmd = line[0]
                            if cmd == 'p':
                                scanner.pause_event.clear()
                                console.print("\n[bold yellow]⚠ SCAN PAUSED. Press 'R' to Resume.[/bold yellow]")
                            elif cmd == 'r':
                                scanner.pause_event.set()
                                console.print("\n[bold green]▶ SCAN RESUMED.[/bold green]")
                            elif cmd == 'q':
                                scanner.stop_event.set()
                                scanner.pause_event.set()
                                console.print("\n[bold red]Stopping... Saving Session.[/bold red]")
                    except:
                        break

            t = threading.Thread(target=control_listener, daemon=True)
            t.start()

        with ThreadPoolExecutor(max_workers=settings['threads']) as executor:
            futures_to_target = {}
            
            # Use iterator for non-blocking stream processing
            target_iter = iter(target_list)
            
            # Skip for resume
            if start_index > 0:
                for _ in range(start_index):
                    try: next(target_iter)
                    except StopIteration: break

            finished = False
            while not finished and not scanner.stop_event.is_set():
                # Fill batch dynamically
                batch_size = max(1, settings['threads'] * 2)
                batch = []
                for _ in range(batch_size):
                    try:
                        val = next(target_iter)
                        if val: batch.append(val)
                    except StopIteration:
                        finished = True
                        break
                
                if not batch: break
                
                futures_to_target = {}
                for target in batch:
                    # Deduplicate at the target list level
                    if target in seen_hits:
                        progress.update(task, advance=num_ports)
                        current_index += 1
                        continue

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
                        current_index += 1
                        continue
                        
                    for port in scan_ports:
                        f = executor.submit(scanner.scan_port, domain, port)
                        futures_to_target[f] = f"{domain}:{port}"

                for future in as_completed(futures_to_target):
                    if scanner.stop_event.is_set(): break
                    
                    t_str = futures_to_target[future]
                    progress.update(task, target=t_str)
                    
                    result = future.result()
                    if result and result.get('status') != "ERROR":
                        # Deduplicate by IP:PORT as requested
                        hit_id = f"{result['ip']}:{result['port']}"
                        if hit_id not in seen_hits:
                            seen_hits.add(hit_id)
                            found_count += 1
                            progress.update(task, found=found_count)
                            print_live(result, force_show=force_show, settings=settings)
                            
                            # Auto-save notification logic
                            infra = result.get('type')
                            if infra == "CLOUDFRONT":
                                console.print("[cyan]☁ CLOUDFRONT DETECTED → saved to results/cloudfront_hits.txt[/cyan]")
                            elif infra == "CLOUDFLARE":
                                console.print("[magenta]☁ CLOUDFLARE DETECTED → saved to results/cloudflare_hits.txt[/magenta]")
                    
                    progress.update(task, advance=1)
                
                current_index += len(batch)
                
                # Save progress periodically
                if state_meta:
                    state_meta['current_index'] = current_index
                    state_meta['found_count'] = found_count
                    save_session(state_meta)

    if scanner.stop_event.is_set():
        console.print(f"\n[bold yellow]Scan stopped at index {current_index}. Session saved.[/bold yellow]")
    else:
        console.print(f"\n[bold green]SCAN COMPLETE![/bold green] Found {found_count} unique hits.")
        clear_session()
    
    if found_count > 0:
        save = Prompt.ask("\nSave results to file?", choices=["Y", "N"], default="Y")
        if save.upper() == "N":
            console.print("[yellow]Results were already logged to the results/ directory.[/yellow]")
    
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
        console.print("[bold cyan]VIEW SAVED LOGS[/bold cyan]")
        for i, f in enumerate(files, 1):
            console.print(f"{i}. {f}")
        console.print(f"{len(files)+1}. [bold red]DELETE ALL LOGS[/bold red]")
        console.print(f"{len(files)+2}. Back")
        
        choice = Prompt.ask("\nSelect option", default=str(len(files)+2))
        
        if choice.isdigit() and 1 <= int(choice) <= len(files):
            file_name = files[int(choice)-1]
            file_path = os.path.join(RESULTS_DIR, file_name)
            
            # Action menu for selected file
            console.print(f"\n[cyan]File: {file_name}[/cyan]")
            console.print("1. [green]View log content[/green]")
            console.print("2. [red]Delete this log[/red]")
            console.print("3. Back")
            
            file_choice = Prompt.ask("Action", choices=["1", "2", "3"], default="1")
            
            if file_choice == "1":
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
            elif file_choice == "2":
                confirm = Prompt.ask(f"Are you sure you want to delete {file_name}?", choices=["Y", "N"], default="N")
                if confirm.upper() == "Y":
                    os.remove(file_path)
                    console.print(f"[bold green]Deleted {file_name}[/bold green]")
                    files.pop(int(choice)-1)
                    time.sleep(1)
            
        elif choice == str(len(files)+1):
            confirm = Prompt.ask("Are you sure you want to delete ALL logs?", choices=["Y", "N"], default="N")
            if confirm.upper() == "Y":
                for f in files:
                    os.remove(os.path.join(RESULTS_DIR, f))
                console.print("[bold green]All logs deleted successfully![/bold green]")
                time.sleep(2)
                break
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
    
    # Check for unfinished sessions
    session = load_session()
    if session:
        console.clear()
        show_banner()
        console.print(f"\n[bold yellow]⚡ Interrupted Scan Found[/bold yellow]")
        console.print(f"Type: [cyan]{session['type']}[/cyan]")
        console.print(f"Target: [cyan]{session['input']}[/cyan]")
        console.print(f"Progress: [cyan]{session['current_index']}[/cyan] hits: [cyan]{session['found_count']}[/cyan]")
        
        choice = Prompt.ask("\n[1] Resume [2] Restart Fresh", choices=["1", "2"], default="1")
        if choice == "1":
            if session['type'] == 'cidr':
                cidr = session['input']
                from ipaddress import ip_network
                net = ip_network(cidr, strict=False)
                run_scan(generate_ips(cidr), settings, total=net.num_addresses, 
                         session_file=f"{cidr.replace('/', '_')}.txt", start_index=session['current_index'], 
                         state_meta=session, enable_controls=True)
            elif session['type'] == 'file':
                path = session['input']
                def target_generator():
                    raw_targets = parse_file(path)
                    for rt in raw_targets:
                        t_type = detect_target_type(rt)
                        if t_type == 'cidr':
                            for ip in generate_ips(rt): yield str(ip)
                        else: yield rt
                run_scan(target_generator(), settings, session_file="bughosts_results.txt", 
                         start_index=session['current_index'], state_meta=session, enable_controls=True)
            # After resume or finish, continue
        else:
            clear_session()

    while True:
        try:
            if os.name == 'nt': os.system('cls')
            else: os.system('clear')
        except: console.clear()
            
        show_banner()
        show_menu()
        
        choice = custom_prompt("INPUT SEC-X", "Select Option", default="1")
        
        if choice in ["q", "quit", "exit", "9"]:
            console.print("[bold yellow]Exiting...[/bold yellow]")
            sys.exit()

        if choice == "1":
            target = custom_prompt("SINGLE HUNTER", "Enter Domain or IP")
            p = get_manual_ports()
            run_scan([target], settings, total=1, force_show=True, manual_ports=p)
            
        elif choice == "2":
            cidr = custom_prompt("CIDR ATTACK", "Enter CIDR (e.g. 56.228.0.0/20)")
            p = get_manual_ports()
            console.print("[yellow]Preparing scan...[/yellow]")
            from ipaddress import ip_network
            try:
                clean_cidr = cidr.strip().replace('/', '_')
                session_file = f"{clean_cidr}.txt"
                net = ip_network(cidr.strip(), strict=False)
                state = {"type": "cidr", "input": cidr.strip(), "current_index": 0, "found_count": 0}
                save_session(state)
                run_scan(generate_ips(cidr), settings, total=net.num_addresses, session_file=session_file, manual_ports=p, state_meta=state, enable_controls=True)
            except Exception as e:
                console.print(f"[bold red]Error: {e}[/bold red]")
                time.sleep(2)
            
        elif choice == "3":
            # File auto-detection
            txt_files = detect_txt_files()
            if txt_files:
                console.print("\n[bold yellow]Detected TXT Files:[/bold yellow]")
                for i, f in enumerate(txt_files, 1):
                    console.print(f"[{i}] {os.path.basename(f)}")
                console.print(f"[{len(txt_files)+1}] Custom Path")
                
                f_choice = Prompt.ask("\nSelect file or custom", default="1")
                if f_choice.isdigit() and 1 <= int(f_choice) <= len(txt_files):
                    path = txt_files[int(f_choice)-1]
                else:
                    path = custom_prompt("FILE PATH", "Enter Path")
            else:
                path = custom_prompt("FILE PATH", "Enter Path")

            if os.path.exists(path):
                start_line = int(custom_prompt("START LINE", "Start from line", default="0"))
                p = get_manual_ports()
                
                def target_generator():
                    raw_targets = parse_file(path)
                    for rt in raw_targets:
                        t_type = detect_target_type(rt)
                        if t_type == 'cidr':
                            for ip in generate_ips(rt): yield str(ip)
                        else: yield rt

                state = {"type": "file", "input": path, "current_index": start_line, "found_count": 0}
                save_session(state)
                run_scan(target_generator(), settings, session_file="bughosts_results.txt", manual_ports=p, start_index=start_line, state_meta=state, enable_controls=True)
            else:
                console.print("[bold red]File not found![/bold red]")
                time.sleep(2)
                
        elif choice == "4":
            target = custom_prompt("METHOD ANALYZER", "Enter Target")
            p = get_manual_ports()
            run_scan([target], settings, total=1, force_show=True, manual_ports=p)

        elif choice == "5":
            ip = custom_prompt("REVERSE DNS", "Enter IP")
            results = reverse_dns_pro(ip)
            console.print(f"\n[bold green]Target:[/bold green] {ip}")
            if isinstance(results, list):
                for d in results: console.print(f"- {d}")
            else: console.print(f"- {results}")
            Prompt.ask("\n[bold yellow]Press ENTER to continue[/bold yellow]")

        elif choice == "6":
            ip = custom_prompt("IP TO CIDR", "Enter IP")
            result = get_cidr(ip)
            if isinstance(result, dict):
                table = Table(show_header=False, box=None, padding=(0, 1))
                table.add_row("IP", ip); table.add_row("CIDR", result['cidr']); table.add_row("ASN", result['asn'])
                console.print(Panel(table, title="[bold green]Network Info[/bold green]", border_style="bold green"))
            else: console.print(f"[bold red]{result}[/bold red]")
            Prompt.ask("\n[bold yellow]Press ENTER to continue[/bold yellow]")

        elif choice == "7":
            view_results()

        elif choice == "8":
            handle_settings(settings)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        console.print("\n[bold red]Interrupted by user.[/bold red]")
        sys.exit()
