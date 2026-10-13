import Link from "next/link";
import {notFound} from "next/navigation";
import {getEpisodes} from "@/lib/episodes";
import PlayerFrame from "../PlayerFrame";

export const dynamic="force-dynamic";

export default async function Watch({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const episodes=(await getEpisodes()).sort((a,b)=>b.episodeNo-a.episodeNo);
  const requestedEpisodeNo = Number(id.match(/(?:ep)?(\d+)$/i)?.[1]);
  let ep=episodes.find(x=>x.id===id)
    ?? (Number.isFinite(requestedEpisodeNo) ? episodes.find(x=>x.episodeNo===requestedEpisodeNo) : undefined);

  if (!ep && requestedEpisodeNo === 37) {
    ep = { id: "bb20-ep37", episodeNo: 37, title: "Bigg Boss 20 — Episode 37", date: "2026-10-12", playerUrl: "https://articleweb.xyz/vid/video.php?id=S1VjlmzzPehp1" };
  }

  if (!ep && requestedEpisodeNo === 36) {
    ep = {
      id: "bb20-ep36",
      episodeNo: 36,
      title: "Bigg Boss 20 — Episode 36",
      date: "2026-10-11",
      playerUrl: "https://biggboss20.live/video-player/y6oev8-gwLQ2mNvkSJUY5nyK8ZN5W_HNgv_MYLKFjjtk5bZ5U_F3sywK_e4RKjaO_4raW6D32yOkhgWox1vZu0cvG2252j5kOLnqadu0B0B7ksicX2mkWU2bms5YUpKxES6Q79YZh1L6KhgcA8EA65LdHMPZT4yjkYp1HaUsH_QIJJ88LVU"
    };
  }

  if (!ep && requestedEpisodeNo === 35) {
    ep = { id: "bb20-ep35", episodeNo: 35, title: "Bigg Boss 20 — Episode 35", date: "2026-10-10", playerUrl: "https://biggboss20.live/video-player/N6MGtnn213YXuiyMEAfUbX_MzsP6TbM5ffwcE-zJaKB-3taP5G_JopdWMVK7By9evGQUPCFOSLiOJ_3lvcCDe0E3OlcCgba8a8qmfZv7jQgAaaUay1mT3bxDfQNHLVEi2WTMUTCncpsuq_YZ_zDA1UI112TohtRuuZ8kNFcLOkkoK2JatOI" };
  }

  if (!ep && requestedEpisodeNo === 34) {
    ep = {
      id: "bb20-ep34",
      episodeNo: 34,
      title: "Bigg Boss 20 — Episode 34",
      date: "2026-10-09",
      playerUrl: "https://articleweb.xyz/vid/gofile.php?id=OqcxbMRgquqg3w"
    };
  }

  if (!ep && requestedEpisodeNo === 33) {
    ep = {
      id: "bb20-ep33",
      episodeNo: 33,
      title: "Bigg Boss 20 — Episode 33",
      date: "2026-10-08",
      playerUrl: "https://articleweb.xyz/vid/gofile.php?id=Ni4VUaMQbP97ww"
    };
  }

  if (!ep && id === "bb20-ep32") {
    ep = {
      id: "bb20-ep32",
      episodeNo: 32,
      title: "Bigg Boss 20 — Episode 32",
      date: "2026-10-07",
      playerUrl: "https://articleweb.xyz/vid/gofile.php?id=vorh1TQ1qAvmEg"
    };
  }

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
  const index=episodes.findIndex(x=>x.id===ep!.id);
  const next=episodes[index-1];
  const prev=episodes[index+1];
  return <section className="shell watchPage">
    <Link className="back" href="/bigg-boss-20">← All Episodes</Link>
    <PlayerFrame src={ep.playerUrl} title={ep.title} episodeId={ep.id} />
    <div className="watchInfo"><div><div className="eyebrow">EPISODE {ep.episodeNo}</div><h1>{ep.title}</h1><p>{ep.date}</p></div><div className="episodeNav">{prev&&<Link href={"/watch/"+prev.id}>← Previous</Link>}{next&&<Link href={"/watch/"+next.id}>Next →</Link>}</div></div>
  </section>;
}
