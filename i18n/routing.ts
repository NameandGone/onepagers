import { defineRouting } from "next-intl/routing";
import { LOCALE_CODES } from "../locale-config";

export const routing = defineRouting({
  locales: LOCALE_CODES,
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
});
