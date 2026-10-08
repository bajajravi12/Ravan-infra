CREATE TABLE IF NOT EXISTS episodes (
  id TEXT PRIMARY KEY,
  episode_no INTEGER NOT NULL UNIQUE,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  player_url TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_episodes_episode_no ON episodes(episode_no);