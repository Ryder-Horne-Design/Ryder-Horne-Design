import "~/styles/globals.css";
import { GeistSansNonVariable } from "geist/font/sans-non-variable";
import { GeistMonoNonVariable } from "geist/font/mono-non-variable";
import { TRPCReactProvider } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { Header, Footer } from "~/components/global";
import { type Params, metadata } from "~/components/metadata";
import { defaultLocale } from "~/locales.config";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { pick } from "lodash";

export async function generateMetadata({
  params,
}: {
  params: Params,
}) {
  return await metadata({
    params,
    isRootLayout: true,
  });
};

export const dynamic = "force-dynamic";
export default function RootLayout({
  children,
  params: {
    locale,
  },
}: {
  children: React.ReactNode;
  params: {
    locale?: string,
  },
}) {
  const messages = useMessages();
  locale = locale ?? defaultLocale;

  return (
    <html className="scroll-smooth bg-slate-50 selection:bg-slate-200/60 subpixel-antialiased" lang={locale}>
      <body className={cn("flex flex-col min-h-screen text-lg text-slate-900 fill-slate-900", GeistSansNonVariable.className, GeistMonoNonVariable.variable)}>
        <NextIntlClientProvider locale={locale} messages={pick(messages, "name", "menu", "home", "portfolio.name", "services.name", "services.contact", "services.design", "services.development", "services.shopify", "services.seo", "contact.name", "contact.description", "contact.form", "contact.email", "contact.call", "contact.instagram", "contact.x", "contact.facebook", "contact.tiktok", "sitemap.name", "close")}>
          <Header />
        </NextIntlClientProvider>
        <TRPCReactProvider>
          <NextIntlClientProvider locale={locale} messages={pick(messages, "404", "error")}>
            {children}
          </NextIntlClientProvider>
        </TRPCReactProvider>
        <NextIntlClientProvider locale={locale} messages={pick(messages, "name", "home", "portfolio.name", "services.name", "contact.name", "sitemap.name", "copyright")}>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
};