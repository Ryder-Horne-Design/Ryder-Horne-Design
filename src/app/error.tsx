"use client";
import { useTranslations } from "next-intl";
import { Button } from "~/components/ui/button";
import { Link } from "~/i18n/navigation";

export default function Error() {
  const t = useTranslations("error");

  return (
    <main className="p-4">
      <h1 className="text-4xl">{t("name")}</h1>
      <p className="mb-2 text-xl">{t("description")}</p>
      <Button asChild>
        <Link href="/">{t("reload")}</Link>
      </Button>
    </main>
  );
}
