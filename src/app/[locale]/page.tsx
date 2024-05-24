import { useTranslations } from "next-intl";
import Image from "next/image";
import { linkClass } from "~/components/global";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Link } from "~/navigation";
import { Architects_Daughter } from "next/font/google";

const handwritten = Architects_Daughter({
  display: "swap",
  subsets: ["latin"],
  weight: ["400"],
});
export default function Home() {
  const t = useTranslations();

  return (
    <main className="p-4">
      <header className="2xl:px-18 -m-4 flex flex-col gap-x-8 gap-y-4 bg-gradient-to-br from-sky-500 to-emerald-400 px-4 py-8 text-slate-50 shadow sm:px-8 sm:py-16 md:px-10 md:py-20 lg:flex-row lg:px-12 lg:py-24 xl:px-14 xl:py-28 2xl:py-36">
        <main className="flex flex-col lg:basis-1/2">
          <h1 className="text-4xl">{t("hero.title")}</h1>
          <p className="mb-2 text-xl">{t("hero.description")}</p>
          <nav className="flex flex-wrap gap-2">
            <Button variant="secondary" asChild>
              <Link href="/portfolio">{t("hero.view")}</Link>
            </Button>
            <Button asChild>
              <Link href="/contact">{t("contact.name")}</Link>
            </Button>
          </nav>
        </main>
        <aside
          className={cn(
            "relative grid grid-cols-[repeat(3,1fr)] gap-2 overflow-x-scroll text-slate-900 sm:flex sm:items-center sm:justify-center sm:overflow-x-visible sm:py-16 lg:basis-1/2",
            handwritten.className,
          )}
        >
          <Link
            href="https://www.sabercatrobotics.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex max-h-fit w-48 flex-col items-center justify-center gap-2 bg-white p-4 shadow transition-transform duration-300 hover:z-20 hover:scale-105 focus:z-20 focus:scale-105 sm:absolute sm:left-[15%] sm:top-0 sm:-rotate-6"
          >
            <Image
              src="/assets/hero/sabercat-robotics.png"
              alt={t("portfolio.websites.sr.name")}
              width={1536}
              height={1536}
              sizes="(min-width: 640px) 25vw, 50vw"
              className="w-full bg-slate-200 shadow"
            />
            <p className="text-center">{t("portfolio.websites.sr.name")}</p>
          </Link>
          <Link
            href="https://www.sistersinstem.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="z-10 flex max-h-fit w-48 flex-col items-center justify-center gap-2 bg-white p-4 shadow transition-transform duration-300 hover:z-20 hover:scale-105 focus:z-20 focus:scale-105"
          >
            <Image
              src="/assets/hero/sisters-in-stem.png"
              alt={t("portfolio.websites.sis.name")}
              width={1536}
              height={1536}
              sizes="(min-width: 640px) 25vw, 50vw"
              className="w-full bg-slate-200 shadow"
            />
            <p className="text-center">{t("portfolio.websites.sis.name")}</p>
          </Link>
          <Link
            href="https://www.petitecurioboutique.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex max-h-fit w-48 flex-col items-center justify-center gap-2 bg-white p-4 shadow transition-transform duration-300 hover:z-20 hover:scale-105 focus:z-20 focus:scale-105 sm:absolute sm:bottom-0 sm:right-[15%] sm:rotate-6"
          >
            <Image
              src="/assets/hero/petite-curio-boutique.png"
              alt={t("portfolio.websites.pcb.name")}
              width={1536}
              height={1536}
              sizes="(min-width: 640px) 25vw, 50vw"
              className="w-full bg-slate-200 shadow"
            />
            <p className="text-center">{t("portfolio.websites.pcb.name")}</p>
          </Link>
        </aside>
      </header>
      <main className="my-8 flex flex-col gap-4">
        <section className="flex flex-col gap-4 lg:flex-row lg:flex-nowrap">
          <main className="flex flex-col gap-4 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-400 p-4 text-slate-50 shadow lg:basis-1/2 lg:p-6">
            <header className="flex flex-col">
              <h2 className="text-3xl">{t("home.services.title")}</h2>
              <p className="text-xl">{t("home.services.description")}</p>
            </header>
            <main className="flex flex-wrap gap-2">
              <Link
                href="/services/design"
                className={cn(linkClass, "bg-slate-50 shadow")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="presentation"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 0 0-3.471 2.987 10.04 10.04 0 0 1 4.815 4.815 18.748 18.748 0 0 0 2.987-3.472l3.386-5.079A1.902 1.902 0 0 0 20.599 1.5Zm-8.3 14.025a18.76 18.76 0 0 0 1.896-1.207 8.026 8.026 0 0 0-4.513-4.513A18.75 18.75 0 0 0 8.475 11.7l-.278.5a5.26 5.26 0 0 1 3.601 3.602l.502-.278ZM6.75 13.5A3.75 3.75 0 0 0 3 17.25a1.5 1.5 0 0 1-1.601 1.497.75.75 0 0 0-.7 1.123 5.25 5.25 0 0 0 9.8-2.62 3.75 3.75 0 0 0-3.75-3.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                {t("services.design.name")}
              </Link>
              <Link
                href="/services/development"
                className={cn(linkClass, "bg-slate-50 shadow")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="presentation"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm14.25 6a.75.75 0 0 1-.22.53l-2.25 2.25a.75.75 0 1 1-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 1 1 1.06-1.06l2.25 2.25c.141.14.22.331.22.53Zm-10.28-.53a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L8.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-2.25 2.25Z"
                    clipRule="evenodd"
                  />
                </svg>
                {t("services.development.name")}
              </Link>
              <Link
                href="/services/shopify"
                className={cn(linkClass, "bg-slate-50 shadow")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  role="presentation"
                  className="h-6 w-6"
                >
                  <path d="M388.3 104.1a4.7 4.7 0 0 0 -4.4-4c-2 0-37.2-.8-37.2-.8s-21.6-20.8-29.6-28.8V503.2L442.8 472S388.7 106.5 388.3 104.1zM288.7 70.5a116.7 116.7 0 0 0 -7.2-17.6C271 32.9 255.4 22 237 22a15 15 0 0 0 -4 .4c-.4-.8-1.2-1.2-1.6-2C223.4 11.6 213 7.6 200.6 8c-24 .8-48 18-67.3 48.8-13.6 21.6-24 48.8-26.8 70.1-27.6 8.4-46.8 14.4-47.2 14.8-14 4.4-14.4 4.8-16 18-1.2 10-38 291.8-38 291.8L307.9 504V65.7a41.7 41.7 0 0 0 -4.4 .4S297.9 67.7 288.7 70.5zM233.4 87.7c-16 4.8-33.6 10.4-50.8 15.6 4.8-18.8 14.4-37.6 25.6-50 4.4-4.4 10.4-9.6 17.2-12.8C232.2 54.9 233.8 74.5 233.4 87.7zM200.6 24.4A27.5 27.5 0 0 1 215 28c-6.4 3.2-12.8 8.4-18.8 14.4-15.2 16.4-26.8 42-31.6 66.5-14.4 4.4-28.8 8.8-42 12.8C131.3 83.3 163.8 25.2 200.6 24.4zM154.2 244.6c1.6 25.6 69.3 31.2 73.3 91.7 2.8 47.6-25.2 80.1-65.7 82.5-48.8 3.2-75.7-25.6-75.7-25.6l10.4-44s26.8 20.4 48.4 18.8c14-.8 19.2-12.4 18.8-20.4-2-33.6-57.2-31.6-60.8-86.9-3.2-46.4 27.2-93.3 94.5-97.7 26-1.6 39.2 4.8 39.2 4.8L221.4 225.4s-17.2-8-37.6-6.4C154.2 221 153.8 239.8 154.2 244.6zM249.4 82.9c0-12-1.6-29.2-7.2-43.6 18.4 3.6 27.2 24 31.2 36.4Q262.6 78.7 249.4 82.9z" />
                </svg>
                {t("services.shopify.name")}
              </Link>
              <Link
                href="/services/seo"
                className={cn(linkClass, "bg-slate-50 shadow")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="presentation"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                {t("services.seo.name")}
              </Link>
            </main>
          </main>
          <Image
            src="/assets/home/women-looking-at-macbook.jpg"
            alt={t("home.services.alt")}
            width={6016}
            height={4016}
            sizes="(min-width: 1024px) 40vw, 80vw"
            className="rounded-xl border-[6px] border-transparent bg-[linear-gradient(to_bottom_right,#0EA5E9,#34D399)] bg-[length:calc(100%+12px)_calc(100%+12px)] bg-[position:-6px_-6px] bg-no-repeat object-cover shadow lg:basis-1/2"
          />
        </section>
        <section className="flex flex-col gap-4 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-400 p-4 text-slate-50 shadow lg:p-6">
          <h2 className="text-3xl">{t("home.portfolio.title")}</h2>
          <p className="text-xl">{t("home.portfolio.description")}</p>
          <Link href="/portfolio" className={cn(linkClass, "bg-slate-50 shadow")}>
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
        </section>
      </main>
      <footer className="2xl:px-18 -m-4 flex flex-col gap-x-8 gap-y-4 bg-gradient-to-br from-sky-500 to-emerald-400 px-4 py-8 text-slate-50 shadow sm:px-8 sm:py-16 md:px-10 md:py-20 lg:flex-row lg:px-12 lg:py-24 xl:px-14 xl:py-28 2xl:py-36">
        <Image
          src="/assets/home/woman-typing-on-macbook.jpg"
          alt={t("home.services.alt")}
          width={6016}
          height={4016}
          sizes="(min-width: 1024px) 40vw, 80vw"
          className="rounded-xl shadow lg:basis-1/4"
        />
        <main className="flex flex-col lg:basis-3/4">
          <h1 className="text-4xl">{t("home.contact.title")}</h1>
          <p className="mb-2 text-xl">{t("home.contact.description")}</p>
          <Button className="w-max" variant="secondary" asChild>
            <Link href="/contact">{t("contact.name")}</Link>
          </Button>
        </main>
      </footer>
    </main>
  );
};