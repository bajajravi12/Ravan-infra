import "./globals.css";
import Link from "next/link";

export const metadata={title:"AARVI LIVE — Bigg Boss 20 & Movies",description:"AARVI LIVE — Bigg Boss 20 episodes and movies"};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body>
    <header className="topbar">
      <div className="shell nav">
        <Link href="/" className="brand"><span>AL</span><strong>AARVI LIVE</strong></Link>
        <nav><Link href="/bigg-boss-20">Bigg Boss 20</Link><Link href="/movies">Movies</Link></nav>
      </div>
    </header>
    <main>{children}</main>
    <footer className="footer">AARVI LIVE · Bigg Boss 20 · Movies</footer>
  </body></html>;
}
