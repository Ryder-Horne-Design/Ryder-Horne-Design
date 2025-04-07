import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { TRPCReactProvider } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { Header, Footer } from "~/components/global";
import { type Params, metadata } from "~/components/metadata";
import { pick } from "lodash";
import { Toaster } from "~/components/ui/sonner";
import { WebVitals } from "~/lib/axiom/client";

export async function generateMetadata({ params }: { params: Params }) {
  return await metadata({
    params,
    isRootLayout: true,
  });
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html
      className="scroll-smooth bg-slate-50 subpixel-antialiased selection:bg-slate-200/60"
      lang={locale}
    >
      <WebVitals />
      <body
        className={cn(
          "flex min-h-screen flex-col fill-slate-900 text-lg text-slate-900",
          GeistSans.className,
          GeistMono.variable,
        )}
      >
        <NextIntlClientProvider
          locale={locale}
          messages={pick(
            messages,
            "name",
            "menu",
            "home",
            "portfolio.name",
            "services.name",
            "services.contact",
            "services.design",
            "services.development",
            "services.shopify",
            "services.seo",
            "contact.name",
            "contact.description",
            "contact.form.title",
            "contact.email",
            "contact.call",
            "contact.instagram",
            "contact.x",
            "contact.facebook",
            "contact.tiktok",
            "sitemap.name",
            "close",
          )}
        >
          <Header />
        </NextIntlClientProvider>
        <TRPCReactProvider>
          <NextIntlClientProvider
            locale={locale}
            messages={pick(messages, "404", "error")}
          >
            {children}
          </NextIntlClientProvider>
        </TRPCReactProvider>
        <NextIntlClientProvider
          locale={locale}
          messages={pick(
            messages,
            "name",
            "home",
            "portfolio.name",
            "services.name",
            "contact.name",
            "sitemap.name",
            "copyright",
          )}
        >
          <Footer />
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
