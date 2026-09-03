"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { isLocale, LOCALES } from "../../locale-config";
import { LocaleScramble } from "./locale-scramble";

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
  const providerLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common");
  const [isPending, startTransition] = useTransition();
  const pathLocale = pathname.split("/")[1];
  const currentLocale = isLocale(pathLocale) ? pathLocale : providerLocale;

  useEffect(() => {
    const metadata = LOCALES.find(({ code }) => code === currentLocale);
    if (!metadata) return;
    document.documentElement.lang = metadata.code;
    document.documentElement.dir = metadata.dir;
  }, [currentLocale]);

  useEffect(() => {
    if (!isPending) document.documentElement.removeAttribute("data-locale-transition");
  }, [isPending]);

  function changeLocale(locale: string) {
    if (locale === currentLocale) return;
    document.documentElement.setAttribute("data-locale-transition", "true");
    startTransition(() => router.replace(withLocale(pathname, locale), { scroll: false }));
  }

  return (
    <label className="language-switcher">
      <span className="sr-only">{t("languageSwitcher")}</span>
      <select
        aria-label={t("languageSwitcher")}
        value={currentLocale}
        onChange={(event) => changeLocale(event.target.value)}
        disabled={isPending}
        aria-busy={isPending}
      >
        {LOCALES.map(({ code, name }) => (
          <option key={code} value={code}>{name}</option>
        ))}
      </select>
      <span className="locale-transition-indicator">
        <LocaleScramble active={isPending} />
      </span>
    </label>
  );
}
