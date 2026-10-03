import {getEpisodes} from "@/lib/episodes";

export const dynamic="force-dynamic";

export default async function Home(){
  await getEpisodes();

  return <div className="hero">
    <div className="shell heroInner">
      <div className="eyebrow">AARVI LIVE</div>
      <h1>Entertainment Hub</h1>
      <p>Bigg Boss 20 episodes aur Movies — upar se apni category select karo.</p>
    </div>
  </div>;
}
