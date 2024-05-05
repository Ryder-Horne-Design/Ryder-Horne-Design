import { useTranslations } from "next-intl";
import { Button } from "~/components/ui/button";
import { Link } from "~/navigation";

export default function Home() {
  const t = useTranslations();

  return (
    <main className="p-4">
      <header className="shadow bg-gradient-to-br from-sky-500 to-emerald-400 text-slate-50 rounded-xl p-8 flex flex-col flex-wrap">
        <h1 className="text-3xl mb-2">{t("name")}</h1>
        <p className="text-xl mb-4">{t("description")}</p>
        <nav className="flex flex-wrap gap-2">
          <Button variant="secondary" asChild>
            <Link href="/portfolio">
              {t("portfolio.view")}
            </Link>
          </Button>
          <Button asChild>
            <Link href="/contact">
              {t("contact.name")}
            </Link>
          </Button>
        </nav>
      </header>
    </main>
  );
};