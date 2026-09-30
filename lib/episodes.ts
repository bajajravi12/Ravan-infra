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
    return JSON.parse(fs.readFileSync(filePath,"utf8")) as Episode[];
  }catch{
    return [];
  }
}

function db(){
  return process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
}

const SOURCE_URL_MIGRATIONS: Record<number, string> = {
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

  return rows.map((r:any)=>({
    id:String(r.id),
    episodeNo:Number(r.episode_no),
    title:String(r.title),
    date:String(r.date),
    playerUrl:String(r.player_url)
  }));
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
