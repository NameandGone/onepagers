import { LOCALE_CODES, type Locale } from "../../locale-config";
import { localizedUrl } from "../../i18n/seo";

const INDEXABLE_PAGES = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "why-this-exists", changeFrequency: "monthly", priority: 0.8 },
  { path: "faq", changeFrequency: "weekly", priority: 0.8 },
] as const;

export const revalidate = 86_400;

export function GET(): Response {
  const urls = INDEXABLE_PAGES.flatMap((page) =>
    LOCALE_CODES.map((code) => {
      const locale = code as Locale;
      const alternates = [
        ...LOCALE_CODES.map((alternateCode) => [alternateCode, localizedUrl(alternateCode as Locale, page.path)] as const),
        ["x-default", localizedUrl("en", page.path)] as const,
      ];
      return [
        "  <url>",
        `    <loc>${escapeXml(localizedUrl(locale, page.path))}</loc>`,
        ...alternates.map(([language, url]) => `    <xhtml:link rel="alternate" hreflang="${language}" href="${escapeXml(url)}" />`),
        `    <changefreq>${page.changeFrequency}</changefreq>`,
        `    <priority>${page.priority}</priority>`,
        "  </url>",
      ].join("\n");
    }),
  );
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    "</urlset>",
  ].join("\n");

  return xmlResponse(body);
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
