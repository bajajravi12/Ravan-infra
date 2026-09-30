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
    const episodes = await getEpisodes();
    const episode = episodes.find((item) => item.id === id);

    if (!episode) {
      return NextResponse.json({ error: "Episode not found" }, { status: 404 });
    }

    const hlsUrl = await resolveArticleWeb(episode.playerUrl);

    if (!hlsUrl) {
      return NextResponse.json(
        { error: "Playable HLS stream was not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { episodeId: episode.id, episodeNo: episode.episodeNo, hlsUrl },
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
