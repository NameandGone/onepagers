import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { ExpandingArrowLink } from "./components/expanding-arrow-link";
import { LanguageSwitcher } from "./components/language-switcher";
import { TextScramble } from "./components/text-scramble";
import { StackedCircularFooter } from "./components/stacked-circular-footer";
import { localizedPath, type Locale } from "../locale-config";
import { SITE_URL } from "./site-config";

const TOOLS = [
  {
    key: "closing",
    href: "https://closing.molt-rebirth.in/en",
  },
  {
    key: "discovery",
    href: "https://discovery.molt-rebirth.in/en",
  },
  {
    key: "k1",
    href: "https://k1.molt-rebirth.in/en",
  },
];

export default async function HomePage() {
  const locale = await getLocale() as Locale;
  const t = await getTranslations("home");
  const common = await getTranslations("common");
  const toolList = TOOLS.map((tool, index) => {
    const key = `${tool.key[0].toUpperCase()}${tool.key.slice(1)}`;
    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: t(`tool${key}Name`),
        description: t(`tool${key}Description`),
        url: tool.href,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
      },
    };
  });
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "onepagers",
    url: `${SITE_URL}/${locale}`,
    description: t("heroLede"),
    inLanguage: locale,
  };
  const toolsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("toolsTitle"),
    itemListElement: toolList,
  };

  return (
    <main className="studio-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsSchema).replace(/</g, "\\u003c") }} />
      <header className="studio-header">
        <a className="studio-wordmark" href={localizedPath(locale)} aria-label={common("homeAria")}>
          <span>onepagers</span>
        </a>
        <nav className="studio-nav" aria-label={common("mainNavigation")}>
          <a href="#tools" aria-current="page">{common("navTools")}</a>
          <a href={localizedPath(locale, "why-this-exists")}>{common("navWhy")}</a>
        </nav>
        <LanguageSwitcher />
      </header>

      <section className="studio-hero" id="top" aria-labelledby="studio-title">
        <div className="studio-hero-copy">
          <p className="studio-eyebrow">{t("heroEyebrow")}</p>
          <h1 id="studio-title">
            <TextScramble text={t("heroTitle")} className="hero-title-text" />
          </h1>
          <p className="studio-hero-lede">{t("heroLede")}</p>
          <ExpandingArrowLink href="#tools">{t("seeTools")}</ExpandingArrowLink>
        </div>

        <figure className="hero-image-frame">
          <Image
            className="hero-image"
            src="/hero.avif"
            alt={t("heroImageAlt")}
            width={1536}
            height={1024}
            priority
          />
        </figure>
      </section>

      <section className="tools-section" id="tools" aria-labelledby="tools-title">
        <div className="section-heading section-heading--center">
          <p className="section-kicker">{t("toolsEyebrow")}</p>
          <h2 id="tools-title">{t("toolsTitle")}</h2>
          <p>{t("toolsIntro")}</p>
        </div>

        <div className="tool-showcase-list">
          {TOOLS.map((tool, index) => (
            <article className={`tool-showcase${index % 2 ? " tool-showcase--reverse" : ""}`} key={tool.key}>
              <div className="tool-showcase-copy">
                <p className="tool-kind">{t(`tool${tool.key[0].toUpperCase()}${tool.key.slice(1)}Kind`)}</p>
                <h3>{t(`tool${tool.key[0].toUpperCase()}${tool.key.slice(1)}Name`)}</h3>
                <p>{t(`tool${tool.key[0].toUpperCase()}${tool.key.slice(1)}Description`)}</p>
                <a className="tool-open-link" href={tool.href} target="_blank" rel="noreferrer">
                  {t("openTool")}
                </a>
              </div>

              <div className="tool-browser">
                <iframe src={tool.href} title={`${t(`tool${tool.key[0].toUpperCase()}${tool.key.slice(1)}Name`)} ${t("toolFrameSuffix")}`} loading="lazy" scrolling="no" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="thinking-section" id="why" aria-labelledby="thinking-title">
        <div className="thinking-heading">
          <h2 id="thinking-title">{t("thinkingTitle")}</h2>
          <p>{t("thinkingIntro")}</p>
        </div>
        <div className="thinking-grid">
          <article>
            <span>{t("pointScopeLabel")}</span>
            <h3>{t("pointScopeTitle")}</h3>
            <p>{t("pointScopeDescription")}</p>
          </article>
          <article>
            <span>{t("pointSourceLabel")}</span>
            <h3>{t("pointSourceTitle")}</h3>
            <p>{t("pointSourceDescription")}</p>
          </article>
          <article>
            <span>{t("pointHandoffLabel")}</span>
            <h3>{t("pointHandoffTitle")}</h3>
            <p>{t("pointHandoffDescription")}</p>
          </article>
        </div>
      </section>

      <section className="studio-outro" aria-labelledby="outro-title">
        <div>
          <p className="section-kicker">{t("outroEyebrow")}</p>
          <h2 id="outro-title">{t("outroTitle")}</h2>
          <p>{t("outroDescription")}</p>
        </div>
        <a className="outline-link" href="#tools">{common("backToTools")}</a>
      </section>

      <StackedCircularFooter
        homeHref={localizedPath(locale)}
        toolsHref={`${localizedPath(locale)}#tools`}
        whyHref={localizedPath(locale, "why-this-exists")}
        faqHref={localizedPath(locale, "faq")}
        description={t("thinkingIntro")}
        note={t("footerLine")}
      />
    </main>
  );
}
