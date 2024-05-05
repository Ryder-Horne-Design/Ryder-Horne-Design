/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import createNextIntlPlugin from "next-intl/plugin";

/** @type {import("next").NextConfig} */
const config = {
  pageExtensions: ["ts", "tsx"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/contact/form",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contact/email",
        destination: "mailto:contact@ryderhorne.design",
        permanent: true,
      },
      {
        source: "/contact/call",
        destination: "tel:+1 (602) 743-9811",
        permanent: false,
      },
      {
        source: "/contact/instagram",
        destination: "https://www.instagram.com/ryderhornedesign",
        permanent: true,
      },
      {
        source: "/instagram",
        destination: "https://www.instagram.com/ryderhornedesign",
        permanent: true,
      },
      {
        source: "/contact/facebook",
        destination: "https://www.facebook.com/ryderhornedesign",
        permanent: true,
      },
      {
        source: "/facebook",
        destination: "https://www.facebook.com/ryderhornedesign",
        permanent: true,
      },
      {
        source: "/contact/tiktok",
        destination: "https://www.tiktok.com/@ryderhornedesign",
        permanent: true,
      },
      {
        source: "/tiktok",
        destination: "https://www.tiktok.com/@ryderhornedesign",
        permanent: true,
      },
      {
        source: "/contact/x",
        destination: "https://twitter.com/rhd_az",
        permanent: true,
      },
      {
        source: "/x",
        destination: "https://twitter.com/rhd_az",
        permanent: true,
      },
      {
        source: "/contact/twitter",
        destination: "https://twitter.com/rhd_az",
        permanent: true,
      },
      {
        source: "/twitter",
        destination: "https://twitter.com/rhd_az",
        permanent: true,
      },
    ];
  },
  trailingSlash: false,
  reactStrictMode: true,
};

export default createNextIntlPlugin()(config);