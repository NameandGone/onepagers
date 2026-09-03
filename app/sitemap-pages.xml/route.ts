import { LOCALE_CODES, type Locale } from "../../locale-config";
import { localizedUrl } from "../../i18n/seo";

const PUBLIC_PATHS = ["", "why-this-exists", "faq"] as const;

export const revalidate = 86_400;

export function GET(): Response {
  const urls = PUBLIC_PATHS.flatMap((path) =>
    LOCALE_CODES.map((code) => {
      const locale = code as Locale;
      const alternates = [
        ...LOCALE_CODES.map((alternateCode) => [alternateCode, localizedUrl(alternateCode as Locale, path)] as const),
        ["x-default", localizedUrl("en", path)] as const,
      ];
      return [
        "  <url>",
        `    <loc>${escapeXml(localizedUrl(locale, path))}</loc>`,
        ...alternates.map(([language, url]) => `    <xhtml:link rel="alternate" hreflang="${language}" href="${escapeXml(url)}" />`),
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
