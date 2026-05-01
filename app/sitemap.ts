import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/constants/blog";
import { services } from "@/lib/constants/services";
import { site } from "@/lib/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/blog",
    "/our-work",
    "/business-hub",
    "/contact",
  ];
  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: new Date(),
    })),
    ...services.map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      lastModified: new Date(),
    })),
    ...blogPosts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(),
    })),
  ];
}
