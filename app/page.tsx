import Link from "next/link";
import {getEpisodes} from "@/lib/episodes";

export const dynamic="force-dynamic";

const MOVIE_PLAYER =
  "https://hbplay.pages.dev/?u=aHR0cHM6Ly9jZG4ubGVuaW4uYnV6ei9EcmlzaHlhbTMgLSBUaGUgQ29uY2x1c2lvbiAyMDI2IEJvbGx5d29vZCBIaW5kaSBNb3ZpZSBQcmVEdkQgNzIwcC5ta3Y/dG9rZW49NWJjNzlkNmQ1MThjZDdmOGViMjc0MDE1ZDUyMDNlZjA=&m=dmlkZW8veC1tYXRyb3Nr&t=RHJpc2h5YW0zIC0gVGhlIENvbmNsdXNpb24gKDIwMjYpIEJvbGx5d29vZCBIaW5kaSBNb3ZpZSBQcmVEdkQgNzIwcC5ta3Y=";

export default async function Home(){
  const episodes=(await getEpisodes()).sort((a,b)=>b.episodeNo-a.episodeNo);
  return <div>
    <div className="hero">
      <div className="shell heroInner">
        <div className="eyebrow">AARVI LIVE</div>
        <h1>Bigg Boss 20</h1>
        <p>Episodes ek jagah — mobile aur laptop dono par clean responsive player ke saath.</p>
        <Link className="primary" href="/bigg-boss-20">Browse Episodes →</Link>
        {episodes[0] && <Link className="secondary" href={"/watch/"+episodes[0].id}>Latest Episode</Link>}
      </div>
    </div>

    <section className="page movieFeature">
      <div className="shell">
        <div className="sectionHead">
          <div>
            <div className="eyebrow">FEATURED MOVIE</div>
            <h1>Drishyam 3</h1>
            <p>The Conclusion — 2026</p>
          </div>
        </div>

        <div className="moviePlayer">
          <iframe
            src={MOVIE_PLAYER}
            title="Drishyam 3 — The Conclusion (2026)"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  </div>;
}
