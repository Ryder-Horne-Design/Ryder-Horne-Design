import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { services } from "~/components/constants";
import { ContactForm } from "~/components/forms";
import { linkClass } from "~/components/global";
import { type Params, metadata } from "~/components/metadata";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { Link } from "~/i18n/navigation";

export async function generateMetadata({ params }: { params: Params }) {
  return await metadata({
    params,
    namespace: "contact",
  });
}

export default async function Contact({ params }: { params: Params }) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations("contact");
  const messages = await getMessages();

  return (
    <main className="flex flex-col gap-4 p-4">
      <header className="bg-linear-to-br flex flex-col gap-4 rounded-xl from-sky-500 to-emerald-400 p-4 text-slate-50 shadow-sm lg:basis-1/2 lg:p-6">
        <h1 className="text-4xl">{t("name")}</h1>
        <p className="text-xl">{t("description")}</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>{t("form.title")}</CardTitle>
          <CardDescription>{t("form.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <NextIntlClientProvider
            messages={pick(
              messages,
              "contact.form",
              services.map((service) => "services." + service + ".name"),
            )}
          >
            <ContactForm />
          </NextIntlClientProvider>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t("other.title")}</CardTitle>
          <CardDescription>{t("other.description")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Link
            href="mailto:contact@ryderhorne.design"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(linkClass, "bg-slate-50 shadow-sm")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-label={t("email")}
              className="h-6 w-6"
            >
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>
            contact@ryderhorne.design
          </Link>
          <Link
            href="tel:+1 (602) 743-9811"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(linkClass, "bg-slate-50 shadow-sm")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-label={t("call")}
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clipRule="evenodd"
              />
            </svg>
            +1 (602) 743-9811
          </Link>
          <Link
            href="https://www.instagram.com/ryderhornedesign"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(linkClass, "bg-slate-50 shadow-sm")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="currentColor"
              aria-label={t("instagram")}
              className="h-6"
            >
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
            </svg>
            @ryderhornedesign
          </Link>
          <Link
            href="https://x.com/rhd_az"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(linkClass, "bg-slate-50 shadow-sm")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              aria-label={t("x")}
              className="h-6 w-6"
            >
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
            </svg>
            @rhd_az
          </Link>
          <Link
            href="https://www.facebook.com/ryderhornedesign"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(linkClass, "bg-slate-50 shadow-sm")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              aria-label={t("facebook")}
              className="h-6 w-6"
            >
              <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
            </svg>
            @ryderhornedesign
          </Link>
          <Link
            href="https://www.tiktok.com/@ryderhornedesign"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(linkClass, "bg-slate-50 shadow-sm")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="currentColor"
              aria-label={t("tiktok")}
              className="h-6"
            >
              <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
            </svg>
            @ryderhornedesign
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
