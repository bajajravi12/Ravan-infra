CREATE TABLE IF NOT EXISTS episodes (
  id TEXT PRIMARY KEY,
  episode_no INTEGER NOT NULL UNIQUE,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  player_url TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_episodes_episode_no ON episodes(episode_no);

INSERT INTO episodes (id, episode_no, title, date, player_url) VALUES
('bb20-ep14',14,'Bigg Boss 20 — Episode 14','2026-09-29','https://articleweb.xyz/vid/gofile.php?id=c_o1kLYy0mLtPA'),
('bb20-ep15',15,'Bigg Boss 20 — Episode 15','2026-09-29','https://articleweb.xyz/vid/gofile.php?id=88YgNUCmaUzK2w'),
('bb20-ep16',16,'Bigg Boss 20 — Episode 16','2026-09-29','https://articleweb.xyz/vid/gofile.php?id=yUsNPNBn98TdeQ'),
('bb20-ep17',17,'Bigg Boss 20 — Episode 17','2026-09-29','https://articleweb.xyz/vid/gofile.php?id=LFz4HJAS924syA'),
('bb20-ep18',18,'Bigg Boss 20 — Episode 18','2026-09-29','https://articleweb.xyz/vid/gofile.php?id=DZyVommnhMBrPw'),
('bb20-ep19',19,'Bigg Boss 20 — Episode 19','2026-09-29','https://articleweb.xyz/vid/gofile.php?id=wJc__5OC63W9DA'),
('bb20-ep20',20,'Bigg Boss 20 — Episode 20','2026-09-29','https://articleweb.xyz/vid/gofile.php?id=89pbEp1i_zhi1g'),
('bb20-ep21',21,'Bigg Boss 20 — Episode 21','2026-09-29','https://articleweb.xyz/vid/gofile.php?id=OfhO74WIGZrj2Q'),
('bb20-ep22',22,'Bigg Boss 20 — Episode 22','2026-09-29','https://articleweb.xyz/vid/gofile.php?id=jjDh0ejkvVJtKw'),
('bb20-ep23',23,'Bigg Boss 20 — Episode 23','2026-09-29','https://articleweb.xyz/vid/gofile.php?id=_xPpLZssg6ZFCQ'),
('bb20-ep24',24,'Bigg Boss 20 — Episode 24','2026-09-29','https://articleweb.xyz/vid/gofile.php?id=itq-7pDh_U1hFQ'),
('bb20-ep25',25,'Bigg Boss 20 — Episode 25','2026-09-30','https://articleweb.xyz/vid/gofile.php?id=QSWrrpG_0p9eFg'),
('bb20-ep26',26,'Bigg Boss 20 — Episode 26','2026-10-01','https://articleweb.xyz/vid/gofile.php?id=FHLXnSJbffqQkw'),
('bb20-ep27',27,'Bigg Boss 20 — Episode 27','2026-10-02','https://articleweb.xyz/vid/gofile.php?id=t8KIc5dyez35Wg'),
('bb20-ep28',28,'Bigg Boss 20 — Episode 28','2026-10-03','https://articleweb.xyz/vid/gofile.php?id=bCQt4ecbb1FBcw'),
('bb20-ep29',29,'Bigg Boss 20 — Episode 29','2026-10-04','https://articleweb.xyz/vid/gofile.php?id=iAXzDcKk-GkA0A'),
('bb20-ep30',30,'Bigg Boss 20 — Episode 30','2026-10-05','https://articleweb.xyz/vid/gofile.php?id=FPpOkRJdo1sToA'),
('bb20-ep31',31,'Bigg Boss 20 — Episode 31','2026-10-06','https://articleweb.xyz/vid/gofile.php?id=awIT7U3qcY13_w'),
('bb20-ep32',32,'Bigg Boss 20 — Episode 32','2026-10-07','https://articleweb.xyz/vid/gofile.php?id=vorh1TQ1qAvmEg'),
('bb20-ep1',1,'Bigg Boss 20 — 26 September 2026','2026-09-26','https://articleweb.xyz/vid/gofile.php?id=sOj7YGRytgHjqQ')
ON CONFLICT(id) DO UPDATE SET
  title=excluded.title,
  date=excluded.date,
  player_url=excluded.player_url;
