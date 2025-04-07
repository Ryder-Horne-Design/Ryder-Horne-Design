import { type Metadata } from "next";
import { headers } from "next/headers";
import type { Locale, Messages, NamespaceKeys, NestedKeyOf } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "~/i18n/routing";
import { logger } from "~/lib/axiom/server";

export type Params = Promise<{
  locale: Locale;
}>;
export async function metadata({
  params,
  namespace,
  isRootLayout = false,
  indexable = true,
  delimiter = " - ",
}: {
  params: Params;
  namespace?: NamespaceKeys<Messages, NestedKeyOf<Messages>>;
  isRootLayout?: boolean;
  indexable?: boolean;
  delimiter?: string;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    namespace,
    locale,
  });
  const altT = await getTranslations({
    locale,
  });
  const title = t("name");
  const template = "%s" + delimiter + title;
  const description = t("description");
  const reqHeaders = await headers();
  const url = new URL(
    reqHeaders.get("x-full-url") ?? "https://ryderhorne.design/",
  );
  const images = [
    {
      url: "http://ryderhorne.design/assets/og/banner.png",
      secureUrl: "https://ryderhorne.design/assets/og/banner.png",
      alt: altT("banner"),
      type: "image/png",
      width: 1200,
      height: 630,
    },
  ] as const satisfies {
    url: string | URL;
    secureUrl?: string | URL;
    alt?: string;
    type?: string;
    width?: string | number;
    height?: string | number;
  }[];

  const metadata: Metadata = {
    metadataBase: new URL(url.origin),
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale,
      alternateLocale: routing.locales.filter((l) => l !== locale),
      siteName: title,
      url,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@rhd_az",
      creator: "@rhd_az",
      images,
    },
    icons: {
      icon: [
        {
          url: "/assets/favicons/favicon-16x16.png",
          sizes: "16x16",
        },
        {
          url: "/assets/favicons/favicon-32x32.png",
          sizes: "32x32",
        },
        {
          url: "/assets/favicons/android-chrome-36x36.png",
          sizes: "36x36",
        },
        {
          url: "/assets/favicons/android-chrome-48x48.png",
          sizes: "48x48",
        },
        {
          url: "/assets/favicons/favicon.ico",
          sizes: "48x48",
        },
        {
          url: "/assets/favicons/android-chrome-72x72.png",
          sizes: "72x72",
        },
        {
          url: "/assets/favicons/android-chrome-96x96.png",
          sizes: "96x96",
        },
        {
          url: "/assets/favicons/android-chrome-144x144.png",
          sizes: "144x144",
        },
        {
          url: "/assets/favicons/android-chrome-192x192.png",
          sizes: "192x192",
        },
        {
          url: "/assets/favicons/android-chrome-256x256.png",
          sizes: "256x256",
        },
        {
          url: "/assets/favicons/android-chrome-384x384.png",
          sizes: "384x384",
        },
        {
          url: "/assets/favicons/android-chrome-512x512.png",
          sizes: "512x512",
        },
      ],
      shortcut: ["/assets/favicons/favicon.ico"],
      apple: [
        {
          url: "/assets/favicons/apple-touch-icon-57x57.png",
          sizes: "57x57",
        },
        {
          url: "/assets/favicons/apple-touch-icon-60x60.png",
          sizes: "60x60",
        },
        {
          url: "/assets/favicons/apple-touch-icon-72x72.png",
          sizes: "72x72",
        },
        {
          url: "/assets/favicons/apple-touch-icon-76x76.png",
          sizes: "76x76",
        },
        {
          url: "/assets/favicons/apple-touch-icon-114x114.png",
          sizes: "114x114",
        },
        {
          url: "/assets/favicons/apple-touch-icon-120x120.png",
          sizes: "120x120",
        },
        {
          url: "/assets/favicons/apple-touch-icon-152x152.png",
          sizes: "152x152",
        },
        {
          url: "/assets/favicons/apple-touch-icon-180x180.png",
          sizes: "180x180",
        },
      ],
      other: [
        {
          rel: "mask-icon",
          url: "/assets/favicons/safari-pinned-tab.svg",
        },
        {
          rel: "apple-touch-icon-precomposed",
          url: "/assets/favicons/apple-touch-icon-57x57-precomposed.png",
          sizes: "57x57",
        },
        {
          rel: "apple-touch-icon-precomposed",
          url: "/assets/favicons/apple-touch-icon-60x60-precomposed.png",
          sizes: "60x60",
        },
        {
          rel: "apple-touch-icon-precomposed",
          url: "/assets/favicons/apple-touch-icon-72x72-precomposed.png",
          sizes: "72x72",
        },
        {
          rel: "apple-touch-icon-precomposed",
          url: "/assets/favicons/apple-touch-icon-76x76-precomposed.png",
          sizes: "76x76",
        },
        {
          rel: "apple-touch-icon-precomposed",
          url: "/assets/favicons/apple-touch-icon-114x114-precomposed.png",
          sizes: "114x114",
        },
        {
          rel: "apple-touch-icon-precomposed",
          url: "/assets/favicons/apple-touch-icon-120x120-precomposed.png",
          sizes: "120x120",
        },
        {
          rel: "apple-touch-icon-precomposed",
          url: "/assets/favicons/apple-touch-icon-144x144-precomposed.png",
          sizes: "144x144",
        },
        {
          rel: "apple-touch-icon-precomposed",
          url: "/assets/favicons/apple-touch-icon-152x152-precomposed.png",
          sizes: "152x152",
        },
        {
          rel: "apple-touch-icon-precomposed",
          url: "/assets/favicons/apple-touch-icon-180x180-precomposed.png",
          sizes: "180x180",
        },
      ],
    },
    robots: {
      index: indexable,
      follow: true,
    },
  };
  if (!metadata.openGraph || !metadata.twitter) {
    logger.warn("Forgot to set openGraph or twitter in metadata");
    metadata.openGraph = metadata.twitter = {};
  }
  if (isRootLayout) {
    metadata.openGraph.title =
      metadata.twitter.title =
      metadata.title =
        {
          default: title,
          template,
        };
  }
  return metadata;
}
