import createIntlMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "~/locales.config";
import { NextRequest } from "next/server";

const rewritePaths: {
  src: string;
  dest: string;
}[] = [
  {
    src: "/home",
    dest: "/",
  },
];
export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  if (url.pathname === "/sitemap.xml") {
    return;
  };
  for (const { src, dest } of rewritePaths) {
    if (url.pathname === src) {
      const newUrl = new URL(dest, url.origin);
      const newReq = new NextRequest(newUrl, {
        ...req,
      });
      req = newReq;
      break;   
    };
  };
  const res = createIntlMiddleware({
    locales,
    defaultLocale,
    localeDetection: true,
    localePrefix: "as-needed",
  })(req);
  res.headers.set("x-full-url", url.toString());
  return res;
};

export const config = {
  // Matches every path except for those starting with assets, api, _next/static, and _next/image
  matcher: [
    "\/((?!assets|api|_next\/static|_next\/image).*)",
    "/",
  ],
};