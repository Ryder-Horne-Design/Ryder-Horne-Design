import { getRequestConfig } from "next-intl/server";
import { hasLocale, Messages } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const jsonFile = (await import(`../../locales/${locale}.json`)) as {
    default: Messages;
  };
  const messages = jsonFile.default;

  return {
    locale,
    messages,
  };
});
