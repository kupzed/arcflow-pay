import { MetadataRoute } from "next";
import { environment } from "@/configs/environment";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = environment.appUrl;

  return [
    {
      url: `${base}/home`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
