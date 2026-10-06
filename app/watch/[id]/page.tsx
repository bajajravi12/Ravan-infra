import Link from "next/link";
import {notFound} from "next/navigation";
import {getEpisodes} from "@/lib/episodes";
import PlayerFrame from "../PlayerFrame";

export const dynamic="force-dynamic";

export default async function Watch({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const episodes=(await getEpisodes()).sort((a,b)=>b.episodeNo-a.episodeNo);
  let ep=episodes.find(x=>x.id===id);

  if (!ep && id === "bb20-ep31") {
    ep = {
      id: "bb20-ep31",
      episodeNo: 31,
      title: "Bigg Boss 20 — Episode 31",
      date: "2026-10-06",
      playerUrl: "https://articleweb.xyz/vid/gofile.php?id=awIT7U3qcY13_w"
    };
  }

  if (!ep && id === "bb20-ep30") {
    ep = {
      id: "bb20-ep30",
      episodeNo: 30,
      title: "Bigg Boss 20 — Episode 30",
      date: "2026-10-05",
      playerUrl: "https://articleweb.xyz/vid/gofile.php?id=FPpOkRJdo1sToA"
    };
  }

  if (!ep && id === "bb20-ep29") {
    ep = {
      id: "bb20-ep29",
      episodeNo: 29,
      title: "Bigg Boss 20 — Episode 29",
      date: "2026-10-04",
      playerUrl: "https://articleweb.xyz/vid/gofile.php?id=iAXzDcKk-GkA0A"
    };
  }

  if(!ep) notFound();
  const index=episodes.findIndex(x=>x.id===id);
  const next=episodes[index-1];
  const prev=episodes[index+1];
  return <section className="shell watchPage">
    <Link className="back" href="/bigg-boss-20">← All Episodes</Link>
    <PlayerFrame src={ep.playerUrl} title={ep.title} episodeId={ep.id} />
    <div className="watchInfo"><div><div className="eyebrow">EPISODE {ep.episodeNo}</div><h1>{ep.title}</h1><p>{ep.date}</p></div><div className="episodeNav">{prev&&<Link href={"/watch/"+prev.id}>← Previous</Link>}{next&&<Link href={"/watch/"+next.id}>Next →</Link>}</div></div>
  </section>;
}
