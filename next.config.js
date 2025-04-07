/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

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
    ];
  },
  trailingSlash: false,
  reactStrictMode: true,
};

export default withNextIntl(config);
