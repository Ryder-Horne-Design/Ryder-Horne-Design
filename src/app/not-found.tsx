import { useTranslations } from "next-intl";
import { Button } from "~/components/ui/button";
import { Link } from "~/navigation";

export default function NotFound() {
  const t = useTranslations("404");

  return (
    <main className="p-4">
      <h1 className="text-4xl">
        {t("name")}
      </h1>
      <p className="text-xl mb-2">
        {t("description")}
      </p>
      <Button asChild>
        <Link href="/">
          {t("back")}
        </Link>
      </Button>
    </main>
  );
};