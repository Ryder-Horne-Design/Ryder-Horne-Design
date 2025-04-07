import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { type Params, metadata } from "~/components/metadata";
import { Button } from "~/components/ui/button";
import { Link } from "~/i18n/navigation";

export async function generateMetadata({ params }: { params: Params }) {
  return await metadata({
    params,
    namespace: "portfolio.websites.sr",
  });
}

export default async function SabercatRobotics({ params }: { params: Params }) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations("portfolio");

  return (
    <main className="flex flex-col gap-4 p-4">
      <header className="bg-linear-to-br flex flex-col gap-4 rounded-xl from-sky-500 to-emerald-400 p-4 text-slate-50 shadow-sm lg:basis-1/2 lg:p-6">
        <h1 className="text-4xl">{t("websites.sr.name")}</h1>
        <p className="text-xl">{t("websites.sr.description")}</p>
      </header>
      <main className="flex flex-col gap-4 lg:flex-row">
        <main className="flex flex-col gap-4 lg:basis-1/2">
          <section className="flex flex-col gap-2">
            <h2 className="text-3xl">{t("problem")}</h2>
            <p className="text-xl">{t("websites.sr.problem")}</p>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="text-3xl">{t("solution")}</h2>
            <p className="text-xl">{t("websites.sr.solution")}</p>
          </section>
          <Button className="flex gap-1" asChild>
            <Link
              href="https://www.sabercatrobotics.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z"
                  clipRule="evenodd"
                />
              </svg>
              {t("visit")}
            </Link>
          </Button>
        </main>
        <Image
          src="/assets/portfolio/sabercat-robotics.png"
          alt={t("websites.sr.name")}
          width={2880}
          height={2048}
          sizes="(min-width: 1024px) 40vw, 80vw"
          className="h-full rounded-xl shadow-sm lg:basis-1/2"
        />
      </main>
    </main>
  );
}
