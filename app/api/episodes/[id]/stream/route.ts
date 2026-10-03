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

  const direct = html.match(
    /https:\/\/streaming\.disk\.yandex\.net\/hls\/[^"'<>\s]+?master-playlist\.m3u8/i
  );
  if (direct?.[0]) return direct[0];

  const gdriveMatch = html.match(
    /(?:https?:)?\/\/[^"'<>\s]+gdrive\.php[^"'<>\s]*/i
  );

  if (!gdriveMatch?.[0]) {
    throw new Error("No intermediate video URL found");
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

  const hls = html2.match(
    /https:\/\/streaming\.disk\.yandex\.net\/hls\/[^"'<>\s]+?master-playlist\.m3u8/i
  );

  return hls?.[0] || null;
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
      episode = episodes.find((item) => item.id === id);
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
