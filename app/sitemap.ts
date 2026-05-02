import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/blog/store";
import { services } from "@/lib/constants/services";
import { site } from "@/lib/constants/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/blog",
    "/our-work",
    "/business-hub",
    "/contact",
    "/book-consultation",
  ];
  const blogPosts = await getPublishedBlogPosts();
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
