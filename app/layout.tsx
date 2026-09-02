import type { Metadata } from "next";
import { headers } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import "./globals.css";
import { getDirection, isLocale, type Locale } from "../locale-config";
import { SITE_URL } from "./site-config";

async function requestLocale(): Promise<Locale> {
  const requestHeaders = await headers();
  const value = requestHeaders.get("x-next-intl-locale");
  return value && isLocale(value) ? value : "en";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await requestLocale();
  const t = await getTranslations({ locale, namespace: "seo" });
  return {
    metadataBase: new URL(SITE_URL),
    title: t("homeTitle"),
    description: t("homeDescription"),
    keywords: [
      "PDF extraction tools",
      "Closing Disclosure extractor",
      "Loan Estimate extractor",
      "discovery document extraction",
      "K-1 extractor",
      "1099 extractor",
      "source-backed PDF data",
    ],
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await requestLocale();
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={getDirection(locale)} suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
