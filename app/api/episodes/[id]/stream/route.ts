import { NextResponse } from "next/server";
import { getEpisodes } from "@/lib/episodes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeHtml(value: string) {
  return value
    .replace(/\\\//g, "/")
    .replace(/&amp;/g, "&")
    .replace(/\\u0026/g, "&")
    .replace(/\\u003d/g, "=");
}

function getArticleHost(url: string) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function findHlsUrl(html: string, baseUrl: string): string | null {
  const candidates = html.match(
    /(?:https?:)?\/\/[^"'<>\s]+?\.m3u8(?:\?[^"'<>\s]*)?|(?:\/|\.{1,2}\/)[^"'<>\s]+?\.m3u8(?:\?[^"'<>\s]*)?/gi
  ) ?? [];

  for (const candidate of candidates) {
    try {
      const normalized = candidate.startsWith("//") ? \`https:\${candidate}\` : candidate;
      const parsed = new URL(normalized, baseUrl);
      if (parsed.protocol === "https:" && /\.m3u8$/i.test(parsed.pathname)) {
        return parsed.toString();
      }
    } catch {
      // Ignore malformed candidates.
    }
  }

  return null;
}

async function resolveArticleWeb(sourceUrl: string): Promise<string | null> {
  const sourceHost = getArticleHost(sourceUrl);

  if (sourceHost !== "articleweb.xyz" && !sourceHost.endsWith(".articleweb.xyz")) {
    throw new Error("Unsupported source host");
  }

  const first = await fetch(sourceUrl, {
    cache: "no-store",
    redirect: "follow",
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept": "text/html,application/xhtml+xml"
    }
  });

  if (!first.ok) {
    throw new Error(`Source returned HTTP ${first.status}`);
  }

  const html = normalizeHtml(await first.text());

  const directHls = findHlsUrl(html, sourceUrl);
  if (directHls) return directHls;

  const gdriveMatch = html.match(
    /(?:https?:)?\/\/[^"'<>\s]+gdrive\.php[^"'<>\s]*/i
  );

  if (!gdriveMatch?.[0]) {
    return null;
  }

  const gdriveUrl = new URL(
    gdriveMatch[0].replace(/^\\?\//, "/"),
    sourceUrl
  ).toString();

  const gdriveHost = getArticleHost(gdriveUrl);
  if (gdriveHost !== "articleweb.xyz" && !gdriveHost.endsWith(".articleweb.xyz")) {
    throw new Error("Unsupported intermediate host");
  }

  const second = await fetch(gdriveUrl, {
    cache: "no-store",
    redirect: "follow",
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept": "text/html,application/xhtml+xml"
    }
  });

  if (!second.ok) {
    throw new Error(`Intermediate URL returned HTTP ${second.status}`);
  }

  const html2 = normalizeHtml(await second.text());

  return findHlsUrl(html2, gdriveUrl);
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const requestUrl = new URL(_req.url);
    const sourceOverride = requestUrl.searchParams.get("source");

    let sourceUrl = sourceOverride;
    let episode: { id: string; episodeNo: number; playerUrl: string } | undefined;

    if (!sourceUrl) {
      const episodes = await getEpisodes();
      const requestedEpisodeNo = Number(id.match(/(?:ep)?(\d+)$/i)?.[1]);
      episode = episodes.find((item) => item.id === id)
        ?? (Number.isFinite(requestedEpisodeNo) ? episodes.find((item) => item.episodeNo === requestedEpisodeNo) : undefined);

      if (!episode && requestedEpisodeNo === 34) {
        episode = {
          id: "bb20-ep34",
          episodeNo: 34,
          playerUrl: "https://articleweb.xyz/vid/gofile.php?id=OqcxbMRgquqg3w"
        };
      }

      if (!episode && requestedEpisodeNo === 33) {
        episode = {
          id: "bb20-ep33",
          episodeNo: 33,
          playerUrl: "https://articleweb.xyz/vid/gofile.php?id=Ni4VUaMQbP97ww"
        };
      }

      if (!episode && id === "bb20-ep32") {
        episode = {
          id: "bb20-ep32",
          episodeNo: 32,
          playerUrl: "https://articleweb.xyz/vid/gofile.php?id=vorh1TQ1qAvmEg"
        };
      }

      if (!episode && id === "bb20-ep31") {
        episode = {
          id: "bb20-ep31",
          episodeNo: 31,
          playerUrl: "https://articleweb.xyz/vid/gofile.php?id=awIT7U3qcY13_w"
        };
      }

      if (!episode && id === "bb20-ep30") {
        episode = {
          id: "bb20-ep30",
          episodeNo: 30,
          playerUrl: "https://articleweb.xyz/vid/gofile.php?id=FPpOkRJdo1sToA"
        };
      }

      if (!episode && id === "bb20-ep29") {
        episode = {
          id: "bb20-ep29",
          episodeNo: 29,
          playerUrl: "https://articleweb.xyz/vid/gofile.php?id=iAXzDcKk-GkA0A"
        };
      }

      if (!episode) {
        return NextResponse.json({ error: "Episode not found" }, { status: 404 });
      }
      sourceUrl = episode.playerUrl;
    }

    const hlsUrl = await resolveArticleWeb(sourceUrl);

    if (!hlsUrl) {
      return NextResponse.json(
        { error: "Playable HLS stream was not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { episodeId: episode?.id || id, episodeNo: episode?.episodeNo || 0, hlsUrl },
      {
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
  } catch (error) {
    console.error("Stream resolve error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Stream resolution failed" },
      { status: 502 }
    );
  }
}
