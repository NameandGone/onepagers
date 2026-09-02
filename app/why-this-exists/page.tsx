import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { ExpandingArrowLink } from "../components/expanding-arrow-link";
import { LanguageSwitcher } from "../components/language-switcher";
import { localizedPath, type Locale } from "../../locale-config";
import { makeLocalizedMetadata } from "../../i18n/seo";

export async function generateMetadata() {
  const locale = await getLocale() as Locale;
  const t = await getTranslations("seo");
  return makeLocalizedMetadata({ locale, path: "why-this-exists", title: t("whyTitle"), description: t("whyDescription") });
}

export default async function WhyThisExistsPage() {
  const locale = await getLocale() as Locale;
  const t = await getTranslations("why");
  const common = await getTranslations("common");

  return (
    <main className="studio-shell studio-page-shell">
      <header className="studio-header">
        <Link className="studio-wordmark" href={localizedPath(locale)} aria-label={common("homeAria")}>
          <span>onepagers</span>
        </Link>
        <nav className="studio-nav" aria-label={common("mainNavigation")}>
          <Link href={`${localizedPath(locale)}#tools`}>{common("navTools")}</Link>
          <a href={localizedPath(locale, "why-this-exists")} aria-current="page">{common("navWhy")}</a>
        </nav>
        <LanguageSwitcher />
      </header>

      <section className="why-page" aria-labelledby="why-page-title">
        <div className="why-page-intro">
          <div>
            <p className="studio-eyebrow">{t("eyebrow")}</p>
            <h1 id="why-page-title">
              {t("titleLine1")}<br />
              <span>{t("titleLine2")}</span>
            </h1>
          </div>
          <p className="why-page-lede">
            {t("lede")}
          </p>
        </div>

        <div className="why-page-rule">
          <p className="why-page-claim">{t("claim")}</p>
          <div className="why-page-principles">
            <article className="why-page-principle">
              <h2>{t("principle1Title")}</h2>
              <p>{t("principle1Description")}</p>
            </article>
            <article className="why-page-principle">
              <h2>{t("principle2Title")}</h2>
              <p>{t("principle2Description")}</p>
            </article>
            <article className="why-page-principle">
              <h2>{t("principle3Title")}</h2>
              <p>{t("principle3Description")}</p>
            </article>
          </div>
        </div>

        <div className="why-page-cta">
          <p>{t("cta")}</p>
          <div className="why-page-cta-links">
            <a className="why-page-text-link" href={localizedPath(locale, "faq")}>{common("readAnswers")}</a>
            <ExpandingArrowLink href={`${localizedPath(locale)}#tools`}>{common("openTools")}</ExpandingArrowLink>
          </div>
        </div>
      </section>
    </main>
  );
}
