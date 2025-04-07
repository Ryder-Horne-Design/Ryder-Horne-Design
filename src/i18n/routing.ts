import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: [
    "en-US",
    // "zh-CN",
    // "ja-JP",
  ],
  defaultLocale: "en-US",
  localePrefix: "as-needed",
});
