import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createIntlMiddleware(routing);

const rewritePaths = [
  {
    src: "/home",
    dest: "/",
  },
] as const satisfies {
  src: string;
  dest: string;
}[];
export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  if (url.pathname === "/sitemap.xml") {
    return;
  }
  for (const { src, dest } of rewritePaths) {
    if (url.pathname === src) {
      const newUrl = new URL(dest, url.origin);
      const newReq = new NextRequest(newUrl, {
        ...req,
      });
      req = newReq;
      break;
    }
  }
  const res = handleI18nRouting(req);
  res.headers.set("x-full-url", url.toString());
  return res;
}

export const config = {
  // Matches every path except for those starting with assets, api, _next/static, and _next/image
  matcher: ["\/((?!assets|api|_next\/static|_next\/image).*)", "/"],
};
