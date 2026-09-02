import type { Metadata } from "next";
import type { Locale } from "../locale-config";
import { LOCALE_CODES } from "../locale-config";
import { SITE_URL } from "../app/site-config";

export function localizedUrl(locale: Locale, path = ""): string {
  const suffix = path ? `/${path.replace(/^\/+/, "")}` : "/";
  return `${SITE_URL}/${locale}${suffix}`;
}

export function localizedAlternates(path = "") {
  return Object.fromEntries([
    ...LOCALE_CODES.map((locale) => [locale, localizedUrl(locale as Locale, path)]),
    ["x-default", localizedUrl("en", path)],
  ]);
}

export function makeLocalizedMetadata({
  locale,
  path,
  title,
  description,
  keywords,
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  keywords?: string[];
}): Metadata {
  const url = localizedUrl(locale, path);
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: url,
      languages: localizedAlternates(path),
    },
    openGraph: {
      type: "website",
      url,
      siteName: "onepagers",
      title,
      description,
      locale,
      alternateLocale: LOCALE_CODES.filter((code) => code !== locale),
      images: [{ url: "/hero.avif", alt: title }],
    },
    robots: { index: true, follow: true },
  };
}
