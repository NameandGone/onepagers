import { getTranslations } from "next-intl/server";
import WhyThisExistsPage from "../../why-this-exists/page";
import { isLocale, type Locale } from "../../../locale-config";
import { makeLocalizedMetadata } from "../../../i18n/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  const locale: Locale = isLocale(value) ? value : "en";
  const t = await getTranslations({ locale, namespace: "seo" });
  return makeLocalizedMetadata({ locale, path: "why-this-exists", title: t("whyTitle"), description: t("whyDescription") });
}

export default function LocalizedWhyPage() {
  return <WhyThisExistsPage />;
}
