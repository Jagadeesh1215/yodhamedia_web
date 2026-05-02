import type { Metadata } from "next";
import Image from "next/image";
import { BlogTabs } from "@/components/sections/BlogTabs";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getPublishedBlogPosts } from "@/lib/blog/store";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Digital growth insights for healthcare, local businesses, social media, ORM, ads, and web strategy.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();
  const featured = posts[0];

  if (!featured) notFound();

  return (
    <section className="section surface-band pt-32">
      <div className="container-wide">
        <div className="text-center">
          <SectionLabel>Blog</SectionLabel>
          <h1 className="font-heading text-h2 font-bold text-[var(--text-primary)]">
            Insights for{" "}
            <span className="text-gold-warm">Structured Digital Growth</span>
          </h1>
          <p className="body-light mx-auto mt-5 max-w-3xl">
            Practical notes for hospitals, doctors, clinics, and businesses that
            want consistent digital systems.
          </p>
        </div>
        <div className="panel mt-12 grid overflow-hidden lg:grid-cols-2">
          <div className="relative min-h-[320px] overflow-hidden bg-gradient-to-br from-purple-deep to-purple-vivid text-8xl">
            {featured.coverImage ? (
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                {featured.icon}
              </div>
            )}
          </div>
          <div className="p-8 lg:p-10">
            <span className="rounded-full bg-gold-warm px-3 py-1 font-label text-[11px] uppercase tracking-wider text-white">
              {featured.category}
            </span>
            <h2 className="mt-5 font-heading text-3xl font-bold text-purple-deep">
              {featured.title}
            </h2>
            <p className="body-light mt-4">{featured.excerpt}</p>
            <p className="mt-5 font-body text-sm text-slate">
              {featured.date} · {featured.readTime}
            </p>
          </div>
        </div>
        <BlogTabs posts={posts} />
      </div>
    </section>
  );
}
