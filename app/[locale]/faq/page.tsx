import { getTranslations } from "next-intl/server";
import FaqPage from "../../faq/page";
import { isLocale, type Locale } from "../../../locale-config";
import { makeLocalizedMetadata } from "../../../i18n/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  const locale: Locale = isLocale(value) ? value : "en";
  const t = await getTranslations({ locale, namespace: "seo" });
  return makeLocalizedMetadata({ locale, path: "faq", title: t("faqTitle"), description: t("faqDescription") });
}

export default function LocalizedFaqPage() {
  return <FaqPage />;
}
