import { SITE_URL } from "../../app/site-config";

const SITEMAP_DOCUMENTS = [
  `${SITE_URL}/sitemap-pages.xml`,
  "https://closing.molt-rebirth.in/sitemap-pages.xml",
  "https://discovery.molt-rebirth.in/sitemap-pages.xml",
  "https://k1.molt-rebirth.in/sitemap-pages.xml",
] as const;

export const revalidate = 86_400;

export function GET(): Response {
  const entries = SITEMAP_DOCUMENTS.map(renderSitemap).join("\n");
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    "</sitemapindex>",
  ].join("\n");

  return xmlResponse(body);
}

function renderSitemap(url: string): string {
  return [
    "  <sitemap>",
    `    <loc>${escapeXml(url)}</loc>`,
    "  </sitemap>",
  ].join("\n");
}

function xmlResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "cache-control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=86400",
      "content-type": "application/xml; charset=utf-8",
    },
  });
}

function escapeXml(value: string): string {
  return value.replace(/[<>&'\"]/g, (character) => {
    if (character === "<") return "&lt;";
    if (character === ">") return "&gt;";
    if (character === "&") return "&amp;";
    if (character === "'") return "&apos;";
    return "&quot;";
  });
}
