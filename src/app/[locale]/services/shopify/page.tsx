import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { linkClass } from "~/components/global";
import { metadata, type Params } from "~/components/metadata";
import { Link } from "~/i18n/navigation";
import { cn } from "~/lib/utils";

export async function generateMetadata({ params }: { params: Params }) {
  return await metadata({
    params,
    namespace: "services.shopify",
  });
}

export default async function ShopifyServices({ params }: { params: Params }) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations();

  return (
    <main className="p-4">
      <header className="bg-linear-to-br mb-4 flex flex-col gap-4 rounded-xl from-sky-500 to-emerald-400 p-4 text-slate-50 shadow-sm lg:basis-1/2 lg:p-6">
        <h1 className="text-4xl">{t("services.shopify.name")}</h1>
        <p className="text-xl">{t("services.shopify.description")}</p>
      </header>
      <main className="flex flex-col gap-4 lg:flex-row">
        <main className="bg-linear-to-br flex flex-col gap-2 rounded-xl from-sky-500 to-emerald-400 p-4 text-slate-50 shadow-sm lg:basis-1/2 lg:p-6">
          <p className="text-lg">{t("services.shopify.long_description")}</p>
          <Link
            href="/portfolio"
            className={cn(linkClass, "bg-slate-50 shadow-sm")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              role="presentation"
              className="h-6 w-6"
            >
              <path d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 0 0-3-3h-3.879a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H6a3 3 0 0 0-3 3v3.162A3.756 3.756 0 0 1 4.094 9h15.812ZM4.094 10.5a2.25 2.25 0 0 0-2.227 2.568l.857 6A2.25 2.25 0 0 0 4.951 21H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-2.227-2.568H4.094Z" />
            </svg>
            {t("hero.view")}
          </Link>
        </main>
        <Image
          src="/assets/services/shopify.jpg"
          alt={t("services.shopify.alt")}
          width={6016}
          height={4016}
          sizes="(min-width: 1024px) 40vw, 80vw"
          className="relative rounded-xl border-[6px] border-transparent bg-[linear-gradient(to_bottom_right,#0EA5E9,#34D399)] bg-[length:calc(100%+12px)_calc(100%+12px)] bg-[position:-6px_-6px] bg-no-repeat object-cover shadow-sm lg:basis-1/2"
        />
      </main>
    </main>
  );
}
