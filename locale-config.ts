export const LOCALES = [
  { code: "en", name: "English", dir: "ltr" },
  { code: "zh", name: "中文", dir: "ltr" },
  { code: "hi", name: "हिन्दी", dir: "ltr" },
  { code: "es", name: "Español", dir: "ltr" },
  { code: "ar", name: "العربية", dir: "rtl" },
  { code: "fr", name: "Français", dir: "ltr" },
  { code: "pt", name: "Português", dir: "ltr" },
  { code: "id", name: "Bahasa Indonesia", dir: "ltr" },
  { code: "ur", name: "اردو", dir: "rtl" },
  { code: "ru", name: "Русский", dir: "ltr" },
  { code: "de", name: "Deutsch", dir: "ltr" },
  { code: "ja", name: "日本語", dir: "ltr" },
] as const;

export const LOCALE_CODES = LOCALES.map(({ code }) => code) as [string, ...string[]];

export type Locale = (typeof LOCALES)[number]["code"];

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.some(({ code }) => code === value);
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return LOCALES.find(({ code }) => code === locale)?.dir ?? "ltr";
}

export function localizedPath(locale: Locale, path = ""): string {
  const suffix = path ? `/${path.replace(/^\/+/, "")}` : "/";
  return `/${locale}${suffix}`;
}
