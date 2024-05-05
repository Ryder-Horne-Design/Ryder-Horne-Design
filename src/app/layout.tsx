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
    <html className="scroll-smooth bg-slate-50 selection:bg-slate-200/60" lang={locale}>
      <body className={cn("flex flex-col flex-wrap min-h-screen text-lg text-slate-900 fill-slate-900", GeistSansNonVariable.className, GeistMonoNonVariable.variable)}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
        </NextIntlClientProvider>
        <TRPCReactProvider>
          <NextIntlClientProvider locale={locale} messages={pick(messages, "404", "error")}>
            {children}
          </NextIntlClientProvider>
        </TRPCReactProvider>
        <NextIntlClientProvider locale={locale} messages={pick(messages, "")}>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
};