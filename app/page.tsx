import Link from "next/link";
import {getEpisodes} from "@/lib/episodes";

export const dynamic="force-dynamic";

export default async function Home(){
  const episodes=await getEpisodes().sort((a,b)=>b.episodeNo-a.episodeNo);
  return <div className="hero">
    <div className="shell heroInner">
      <div className="eyebrow">AARVI LIVE</div>
      <h1>Bigg Boss 20</h1>
      <p>Episodes ek jagah — mobile aur laptop dono par clean responsive player ke saath.</p>
      <Link className="primary" href="/bigg-boss-20">Browse Episodes →</Link>
      {episodes[0] && <Link className="secondary" href={"/watch/"+episodes[0].id}>Latest Episode</Link>}
    </div>
  </div>;
}
