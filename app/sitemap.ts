import type { MetadataRoute } from "next";
import { LOCALE_CODES, type Locale } from "../locale-config";
import { localizedUrl } from "../i18n/seo";

const PUBLIC_PATHS = ["", "why-this-exists", "faq"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PATHS.flatMap((path) => LOCALE_CODES.map((code) => ({
    url: localizedUrl(code as Locale, path),
    lastModified: new Date(),
    changeFrequency: path === "faq" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "faq" ? 0.8 : 0.7,
    alternates: {
      languages: Object.fromEntries(
        LOCALE_CODES.map((locale) => [locale, localizedUrl(locale as Locale, path)])
      ),
    },
  })));
}
