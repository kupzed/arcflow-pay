import { MetadataRoute } from "next";
import { environment } from "@/configs/environment";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/home"],
      disallow: ["/dashboard/", "/api/"],
    },
    sitemap: `${environment.appUrl}/sitemap.xml`,
  };
}
