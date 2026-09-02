import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { FaqAccordion } from "../components/faq-accordion";
import { LanguageSwitcher } from "../components/language-switcher";
import { localizedPath, type Locale } from "../../locale-config";
import { makeLocalizedMetadata } from "../../i18n/seo";
import { StackedCircularFooter } from "../components/stacked-circular-footer";

type FaqItem = {
  question: string;
  answer: string;
};

export async function generateMetadata() {
  const locale = await getLocale() as Locale;
  const t = await getTranslations("seo");
  return makeLocalizedMetadata({ locale, path: "faq", title: t("faqTitle"), description: t("faqDescription") });
}

export default async function FaqPage() {
  const locale = await getLocale() as Locale;
  const t = await getTranslations("faq");
  const common = await getTranslations("common");
  const faqItems: readonly FaqItem[] = Array.from({ length: 20 }, (_, index) => ({
    question: t(`q${index + 1}`),
    answer: t(`a${index + 1}`),
  }));
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main className="studio-shell faq-page-shell">
      <header className="studio-header">
        <Link className="studio-wordmark" href={localizedPath(locale)} aria-label={common("homeAria")}>
          <span>onepagers</span>
        </Link>
        <nav className="studio-nav" aria-label={common("mainNavigation")}>
          <Link href={`${localizedPath(locale)}#tools`}>{common("navTools")}</Link>
          <a href={localizedPath(locale, "why-this-exists")}>{common("navWhy")}</a>
        </nav>
        <LanguageSwitcher />
      </header>

      <section className="faq-page-intro" aria-labelledby="faq-page-title">
        <div>
          <p className="studio-eyebrow">{t("eyebrow")}</p>
          <h1 id="faq-page-title">{t("title")}</h1>
        </div>
        <p>{t("intro")}</p>
      </section>

      <section className="faq-page-content" aria-label={common("faqSection")}>
          <FaqAccordion items={faqItems} />
        </section>

      <script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />

      <StackedCircularFooter
        homeHref={localizedPath(locale)}
        toolsHref={`${localizedPath(locale)}#tools`}
        whyHref={localizedPath(locale, "why-this-exists")}
        faqHref={localizedPath(locale, "faq")}
        description={t("intro")}
        note={t("footerPrompt")}
      />
    </main>
  );
}
