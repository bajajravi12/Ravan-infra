import fs from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";

export type Episode = {
  id: string;
  episodeNo: number;
  title: string;
  date: string;
  playerUrl: string;
};

const filePath = path.join(process.cwd(), "data", "episodes.json");

function fileEpisodes(): Episode[] {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as Episode[];
  } catch {
    return [];
  }
}

function db() {
  return process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
}

async function ensureTable(sql: any) {
  await sql(`CREATE TABLE IF NOT EXISTS episodes (
    id TEXT PRIMARY KEY,
    episode_no INTEGER NOT NULL,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    player_url TEXT NOT NULL
  )`);
}

export async function getEpisodes(): Promise<Episode[]> {
  const sql = db();
  if (!sql) return fileEpisodes();

  await ensureTable(sql);
  const rows = await sql(`SELECT id, episode_no, title, date, player_url FROM episodes ORDER BY episode_no DESC`);

  if (!rows.length) {
    const seed = fileEpisodes();
    for (const ep of seed) {
      await sql(`INSERT INTO episodes (id, episode_no, title, date, player_url)
        VALUES (${ep.id}, ${ep.episodeNo}, ${ep.title}, ${ep.date}, ${ep.playerUrl})
        ON CONFLICT (id) DO NOTHING`);
    }
    return seed;
  }

  return rows.map((r: any) => ({
    id: r.id,
    episodeNo: Number(r.episode_no),
    title: r.title,
    date: r.date,
    playerUrl: r.player_url
  }));
}

export async function saveEpisodes(episodes: Episode[]): Promise<void> {
  const sql = db();
  if (!sql) {
    fs.writeFileSync(filePath, JSON.stringify(episodes, null, 2), "utf8");
    return;
  }

  await ensureTable(sql);
  await sql(`DELETE FROM episodes`);

  for (const ep of episodes) {
    await sql(`INSERT INTO episodes (id, episode_no, title, date, player_url)
      VALUES (${ep.id}, ${ep.episodeNo}, ${ep.title}, ${ep.date}, ${ep.playerUrl})`);
  }
}
