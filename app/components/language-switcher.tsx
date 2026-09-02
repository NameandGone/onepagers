"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { isLocale, LOCALES } from "../../locale-config";

function withLocale(pathname: string, locale: string): string {
  const segments = pathname.split("/");
  if (isLocale(segments[1])) {
    segments[1] = locale;
  } else {
    segments.splice(1, 0, locale);
  }
  return segments.join("/") || `/${locale}`;
}

export function LanguageSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common");

  return (
    <label className="language-switcher">
      <span className="sr-only">{t("languageSwitcher")}</span>
      <select
        aria-label={t("languageSwitcher")}
        value={currentLocale}
        onChange={(event) => router.push(withLocale(pathname, event.target.value))}
      >
        {LOCALES.map(({ code, name }) => (
          <option key={code} value={code}>{name}</option>
        ))}
      </select>
    </label>
  );
}
