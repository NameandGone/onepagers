import { LOCALE_CODES } from "../../locale-config";
import { SITE_URL } from "../../app/site-config";

type SitemapPage = {
  path: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
};

const STUDIO_PAGES: readonly SitemapPage[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "why-this-exists", changeFrequency: "monthly", priority: 0.8 },
  { path: "faq", changeFrequency: "weekly", priority: 0.8 },
];

const TOOL_PAGES: readonly SitemapPage[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
];

const SITEMAP_SITES = [
  { baseUrl: SITE_URL, pages: STUDIO_PAGES },
  { baseUrl: "https://closing.molt-rebirth.in", pages: TOOL_PAGES },
  { baseUrl: "https://discovery.molt-rebirth.in", pages: TOOL_PAGES },
  { baseUrl: "https://k1.molt-rebirth.in", pages: TOOL_PAGES },
] as const;

export const revalidate = 86_400;

export function GET(): Response {
  const urls = SITEMAP_SITES.flatMap(({ baseUrl, pages }) =>
    pages.flatMap((page) => LOCALE_CODES.map((locale) => renderUrl(baseUrl, locale, page))),
  );

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    "</urlset>",
  ].join("\n");

  return xmlResponse(body);
}

function renderUrl(baseUrl: string, locale: string, page: SitemapPage): string {
  const pageUrl = localizedUrl(baseUrl, locale, page.path);
  const alternates = [
    ...LOCALE_CODES.map(
      (alternateLocale) =>
        `    <xhtml:link rel="alternate" hreflang="${alternateLocale}" href="${escapeXml(localizedUrl(baseUrl, alternateLocale, page.path))}" />`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(localizedUrl(baseUrl, "en", page.path))}" />`,
  ];

  return [
    "  <url>",
    `    <loc>${escapeXml(pageUrl)}</loc>`,
    ...alternates,
    `    <changefreq>${page.changeFrequency}</changefreq>`,
    `    <priority>${page.priority}</priority>`,
    "  </url>",
  ].join("\n");
}

function localizedUrl(baseUrl: string, locale: string, path: string): string {
  const suffix = path ? `/${path.replace(/^\/+/, "")}` : "";
  return `${baseUrl.replace(/\/$/, "")}/${locale}${suffix}`;
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
  return value.replace(/[<>&'"]/g, (character) => {
    if (character === "<") return "&lt;";
    if (character === ">") return "&gt;";
    if (character === "&") return "&amp;";
    if (character === "'") return "&apos;";
    return "&quot;";
  });
}
