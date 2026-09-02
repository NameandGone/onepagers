"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();

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
      <span className="locale-transition-indicator" aria-hidden="true">{isPending ? "///" : ""}</span>
    </label>
  );
}
