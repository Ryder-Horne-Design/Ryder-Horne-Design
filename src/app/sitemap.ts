import { type MetadataRoute } from "next";

const base = "https://ryderhorne.design";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: base,
      lastModified: new Date("2024-05-16"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/portfolio`,
      lastModified: new Date("2024-05-24"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/portfolio/1`,
      lastModified: new Date("2024-05-24"),
      changeFrequency: "weekly",
      priority: 0.64,
    },
    {
      url: `${base}/portfolio/2`,
      lastModified: new Date("2024-05-24"),
      changeFrequency: "weekly",
      priority: 0.64,
    },
    {
      url: `${base}/portfolio/3`,
      lastModified: new Date("2024-05-24"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/services`,
      lastModified: new Date("2024-05-24"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/services/design`,
      lastModified: new Date("2024-05-24"),
      changeFrequency: "monthly",
      priority: 0.64,
    },
    {
      url: `${base}/services/development`,
      lastModified: new Date("2024-05-24"),
      changeFrequency: "monthly",
      priority: 0.64,
    },
    {
      url: `${base}/services/shopify`,
      lastModified: new Date("2024-05-24"),
      changeFrequency: "monthly",
      priority: 0.64,
    },
    // {
    //   url: `${base}/services/seo`,
    //   lastModified: new Date("2022-10-01"),
    //   changeFrequency: "monthly",
    //   priority: 0.64,
    // },
    {
      url: `${base}/contact`,
      lastModified: new Date("2024-05-22"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/sitemap`,
      lastModified: new Date("2024-05-24"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
};