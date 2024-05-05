import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { locales } from "~/locales.config";

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales,
  localePrefix: "as-needed",
});