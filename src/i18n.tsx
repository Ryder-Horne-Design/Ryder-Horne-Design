import { notFound } from "next/navigation";
import { type AbstractIntlMessages } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { locales } from "~/locales.config";

export default getRequestConfig(async function({ locale }) {
  if (!locales.includes(locale)) {
    notFound();
  };
  const json = await import(`../locales/${locale}.json`) as {
    default: AbstractIntlMessages,
  };
  const messages = json.default;
  return {
    defaultTranslationValues: {
      // Markdown
      bold: function(chunks) {
        return (
          <b className="inline">{chunks}</b>
        );
      },
      strong: function(chunks) {
        return (
          <strong className="inline">{chunks}</strong>
        );
      },
      italics: function(chunks) {
        return (
          <i className="inline">{chunks}</i>
        );
      },
    },
    messages,
  };
});