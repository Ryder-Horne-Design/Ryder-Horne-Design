import createIntlMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "~/locales.config";
import { type NextRequest } from "next/server";

export default function Middleware(Request: NextRequest) {
  const Response = createIntlMiddleware({
    locales,
    defaultLocale,
    localeDetection: true,
    localePrefix: "as-needed",
  })(Request);
  Response.headers.set("x-full-url", Request.url);
  return Response;
};

export const config = {
  // Matches every path except for those starting with assets, api, _next/static, and _next/image
  matcher: [
    "\/((?!assets|api|_next\/static|_next\/image).*)",
    "/",
  ],
};