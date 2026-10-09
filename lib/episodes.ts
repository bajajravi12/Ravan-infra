import fs from "fs";
import path from "path";
import {neon} from "@neondatabase/serverless";

export type Episode={
  id:string;
  episodeNo:number;
  title:string;
  date:string;
  playerUrl:string;
};

const filePath=path.join(process.cwd(),"data","episodes.json");

function fileEpisodes():Episode[]{
  try{
    const episodes = JSON.parse(fs.readFileSync(filePath,"utf8")) as Episode[];
    if (!episodes.some((ep) => ep.episodeNo === 28)) {
      episodes.push({
        id: "bb20-ep28",
        episodeNo: 28,
        title: "Bigg Boss 20 — Episode 28",
        date: "2026-10-03",
        playerUrl: "https://articleweb.xyz/vid/gofile.php?id=bCQt4ecbb1FBcw"
      });
    }
    return episodes.sort((a,b)=>b.episodeNo-a.episodeNo);
  }catch{
    return [{
      id: "bb20-ep28",
      episodeNo: 28,
      title: "Bigg Boss 20 — Episode 28",
      date: "2026-10-03",
      playerUrl: "https://articleweb.xyz/vid/gofile.php?id=bCQt4ecbb1FBcw"
    }];
  }
}

function db(){
  return process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
}

const SOURCE_URL_MIGRATIONS: Record<number, string> = {
  33: "https://articleweb.xyz/vid/gofile.php?id=Ni4VUaMQbP97ww",
  33: "https://articleweb.xyz/vid/gofile.php?id=Ni4VUaMQbP97ww",
  32: "https://articleweb.xyz/vid/gofile.php?id=vorh1TQ1qAvmEg",
  31: "https://articleweb.xyz/vid/gofile.php?id=awIT7U3qcY13_w",
  30: "https://articleweb.xyz/vid/gofile.php?id=FPpOkRJdo1sToA",
  29: "https://articleweb.xyz/vid/gofile.php?id=iAXzDcKk-GkA0A",
  28: "https://articleweb.xyz/vid/gofile.php?id=bCQt4ecbb1FBcw",
  14: "https://articleweb.xyz/vid/gofile.php?id=c_o1kLYy0mLtPA",
  15: "https://articleweb.xyz/vid/gofile.php?id=88YgNUCmaUzK2w",
  16: "https://articleweb.xyz/vid/gofile.php?id=yUsNPNBn98TdeQ",
  17: "https://articleweb.xyz/vid/gofile.php?id=LFz4HJAS924syA",
  18: "https://articleweb.xyz/vid/gofile.php?id=DZyVommnhMBrPw",
  19: "https://articleweb.xyz/vid/gofile.php?id=wJc__5OC63W9DA",
  20: "https://articleweb.xyz/vid/gofile.php?id=89pbEp1i_zhi1g",
  21: "https://articleweb.xyz/vid/gofile.php?id=OfhO74WIGZrj2Q",
  22: "https://articleweb.xyz/vid/gofile.php?id=jjDh0ejkvVJtKw",
  23: "https://articleweb.xyz/vid/gofile.php?id=_xPpLZssg6ZFCQ"
};

async function ensureTable(sql:any){
  await sql`CREATE TABLE IF NOT EXISTS episodes (
    id TEXT PRIMARY KEY,
    episode_no INTEGER NOT NULL,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    player_url TEXT NOT NULL
  )`;
}

export async function getEpisodes():Promise<Episode[]>{
  const sql=db();
  if(!sql) return fileEpisodes();

  await ensureTable(sql);

  for (const [episodeNo, sourceUrl] of Object.entries(SOURCE_URL_MIGRATIONS)) {
    await sql`UPDATE episodes
      SET player_url = ${sourceUrl}
      WHERE episode_no = ${Number(episodeNo)}
        AND player_url NOT LIKE 'https://articleweb.xyz/%'`;
  }

  await sql`DELETE FROM episodes WHERE episode_no = 33`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep33', 33, 'Bigg Boss 20 — Episode 33', '2026-10-08', 'https://articleweb.xyz/vid/gofile.php?id=Ni4VUaMQbP97ww')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date

  await sql`DELETE FROM episodes WHERE episode_no = 32`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep32', 32, 'Bigg Boss 20 — Episode 32', '2026-10-07', 'https://articleweb.xyz/vid/gofile.php?id=vorh1TQ1qAvmEg')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date`;

  await sql`DELETE FROM episodes WHERE episode_no = 31`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep31', 31, 'Bigg Boss 20 — Episode 31', '2026-10-06', 'https://articleweb.xyz/vid/gofile.php?id=awIT7U3qcY13_w')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date`;

  await sql`DELETE FROM episodes WHERE episode_no = 30`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep30', 30, 'Bigg Boss 20 — Episode 30', '2026-10-05', 'https://articleweb.xyz/vid/gofile.php?id=FPpOkRJdo1sToA')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date`;

  await sql`DELETE FROM episodes WHERE episode_no = 29`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep29', 29, 'Bigg Boss 20 — Episode 29', '2026-10-04', 'https://articleweb.xyz/vid/gofile.php?id=iAXzDcKk-GkA0A')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date`;

  await sql`DELETE FROM episodes WHERE episode_no = 28`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep28', 28, 'Bigg Boss 20 — Episode 28', '2026-10-03', 'https://articleweb.xyz/vid/gofile.php?id=bCQt4ecbb1FBcw')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date`;

  const rows=await sql`SELECT id, episode_no, title, date, player_url
    FROM episodes ORDER BY episode_no DESC`;

  if(!rows.length){
    const seed=fileEpisodes();
    for(const ep of seed){
      await sql`INSERT INTO episodes (id,episode_no,title,date,player_url)
        VALUES (${ep.id},${ep.episodeNo},${ep.title},${ep.date},${ep.playerUrl})
        ON CONFLICT (id) DO NOTHING`;
    }
    return seed.sort((a,b)=>b.episodeNo-a.episodeNo);
  }

  const episodes = rows.map((r:any)=>({
    id:String(r.id),
    episodeNo:Number(r.episode_no),
    title:String(r.title),
    date:String(r.date),
    playerUrl:String(r.player_url)
  }));

  if (!episodes.some((ep) => ep.episodeNo === 29)) {
    episodes.push({
      id: "bb20-ep29",
      episodeNo: 29,
      title: "Bigg Boss 20 — Episode 29",
      date: "2026-10-04",
      playerUrl: "https://articleweb.xyz/vid/gofile.php?id=iAXzDcKk-GkA0A"
    });
  }

  if (!episodes.some((ep) => ep.episodeNo === 28)) {
    episodes.push({
      id: "bb20-ep28",
      episodeNo: 28,
      title: "Bigg Boss 20 — Episode 28",
      date: "2026-10-03",
      playerUrl: "https://articleweb.xyz/vid/gofile.php?id=bCQt4ecbb1FBcw"
    });
  }

  return episodes.sort((a,b)=>b.episodeNo-a.episodeNo);
}

export async function saveEpisodes(episodes:Episode[]):Promise<void>{
  const sql=db();

  if(!sql){
    fs.writeFileSync(filePath,JSON.stringify(episodes,null,2),"utf8");
    return;
  }

  await ensureTable(sql);
  await sql`DELETE FROM episodes`;

  for(const ep of episodes){
    await sql`INSERT INTO episodes (id,episode_no,title,date,player_url)
      VALUES (${ep.id},${ep.episodeNo},${ep.title},${ep.date},${ep.playerUrl})`;
  }
}
