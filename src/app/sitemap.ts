import { type MetadataRoute } from "next";

const base = "https://ryderhorne.design";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: base,
      lastModified: new Date("2024-05-04"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/portfolio`,
      lastModified: new Date("2022-10-01"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/services`,
      lastModified: new Date("2022-10-01"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/services/design`,
      lastModified: new Date("2022-10-01"),
      changeFrequency: "weekly",
      priority: 0.64,
    },
    {
      url: `${base}/services/development`,
      lastModified: new Date("2022-10-01"),
      changeFrequency: "weekly",
      priority: 0.64,
    },
    // {
    //   url: `${base}/services/shopify`,
    //   lastModified: new Date("2022-10-01"),
    //   changeFrequency: "daily",
    //   priority: 0.64,
    // },
    {
      url: `${base}/services/seo`,
      lastModified: new Date("2022-10-01"),
      changeFrequency: "daily",
      priority: 0.64,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date("2022-10-01"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/sitemap`,
      lastModified: new Date("2024-05-04"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
};