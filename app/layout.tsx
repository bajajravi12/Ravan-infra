import "./globals.css";
import Link from "next/link";

export const metadata={title:"AARVI LIVE — Bigg Boss 20",description:"AARVI LIVE — Bigg Boss 20 episode player and episode list"};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body>
    <header className="topbar">
      <div className="shell nav">
        <Link href="/" className="brand"><span>AL</span> AARVI LIVE</Link>
        <nav><Link href="/">Home</Link><Link href="/bigg-boss-20">Bigg Boss 20</Link><Link href="/admin">Admin</Link></nav>
      </div>
    </header>
    <main>{children}</main>
    <footer className="footer">AARVI LIVE · Bigg Boss 20</footer>
  </body></html>;
}