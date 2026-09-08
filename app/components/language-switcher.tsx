"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, useTransition } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const pathLocale = pathname.split("/")[1];
  const currentLocale = isLocale(pathLocale) ? pathLocale : providerLocale;
  const currentIndex = Math.max(0, LOCALES.findIndex(({ code }) => code === currentLocale));
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const currentMetadata = LOCALES[currentIndex];

  useEffect(() => {
    const metadata = LOCALES.find(({ code }) => code === currentLocale);
    if (!metadata) return;
    document.documentElement.lang = metadata.code;
    document.documentElement.dir = metadata.dir;
  }, [currentLocale]);

  useEffect(() => {
    if (!isPending) document.documentElement.removeAttribute("data-locale-transition");
  }, [isPending]);

  useEffect(() => {
    if (!isOpen) return;
    optionRefs.current[activeIndex]?.focus();
  }, [activeIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  function changeLocale(locale: string) {
    setIsOpen(false);
    if (locale === currentLocale) return;
    document.documentElement.setAttribute("data-locale-transition", "true");
    startTransition(() => router.replace(withLocale(pathname, locale), { scroll: false }));
  }

  return (
    <div
      ref={rootRef}
      className="language-switcher"
      onBlur={(event) => {
        if (!event.relatedTarget || !event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className="language-switcher-trigger"
        aria-label={t("languageSwitcher")}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        disabled={isPending}
        aria-busy={isPending}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex(currentIndex);
            setIsOpen(true);
          }
        }}
      >
        <span className="language-switcher-value">{currentMetadata?.name ?? currentLocale}</span>
        <span className="locale-transition-indicator"><LocaleScramble active={isPending} /></span>
        <svg className="language-switcher-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
          <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <div id={menuId} className="language-switcher-menu" role="menu" aria-label={t("languageSwitcher")}>
          {LOCALES.map(({ code, name }, index) => (
            <button
              key={code}
              ref={(node) => { optionRefs.current[index] = node; }}
              type="button"
              role="menuitemradio"
              className="language-switcher-option"
              aria-checked={code === currentLocale}
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => changeLocale(code)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                  event.preventDefault();
                  const direction = event.key === "ArrowDown" ? 1 : -1;
                  const nextIndex = (index + direction + LOCALES.length) % LOCALES.length;
                  setActiveIndex(nextIndex);
                  optionRefs.current[nextIndex]?.focus();
                } else if (event.key === "Home" || event.key === "End") {
                  event.preventDefault();
                  const nextIndex = event.key === "Home" ? 0 : LOCALES.length - 1;
                  setActiveIndex(nextIndex);
                  optionRefs.current[nextIndex]?.focus();
                } else if (event.key === "Escape") {
                  event.preventDefault();
                  setIsOpen(false);
                  triggerRef.current?.focus();
                } else if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  changeLocale(code);
                }
              }}
            >
              <span className="language-switcher-option-check" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none" focusable="false">
                  <path d="m3 8.5 3.2 3.2L13 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>{name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
