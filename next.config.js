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
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/contact/form",
        destination: "/contact",
        permanent: true,
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
        destination: "https://x.com/rhd_az",
        permanent: true,
      },
      {
        source: "/x",
        destination: "https://x.com/rhd_az",
        permanent: true,
      },
      {
        source: "/contact/twitter",
        destination: "https://x.com/rhd_az",
        permanent: true,
      },
      {
        source: "/twitter",
        destination: "https://x.com/rhd_az",
        permanent: true,
      },
    ];
  },
  trailingSlash: false,
  reactStrictMode: true,
};

export default createNextIntlPlugin()(config);