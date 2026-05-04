import type { Metadata } from "next";
import Image from "next/image";
import { BlogTabs } from "@/components/sections/BlogTabs";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getPublishedBlogPosts } from "@/lib/blog/store";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Digital growth insights for healthcare, local businesses, social media, ORM, ads, and web strategy.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();
  const featured = posts[0];

  if (!featured) {
    return (
      <section className="bg-[var(--bg-app)] pt-32 pb-20">
        <div className="container-wide px-6">
          <div className="panel-strong mx-auto max-w-3xl p-8 text-center md:p-12">
            <SectionLabel>Blog archive</SectionLabel>
            <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight text-[var(--text-primary)] md:text-6xl">
              Content archive is being prepared
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
              The blog is live, but the repository has no published articles at
              the moment. Add seeded posts or create the first article in the
              admin area and this page will populate automatically.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center rounded-full bg-[var(--gold-warm)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-black transition hover:opacity-95"
              >
                Contact us
              </Link>
              <Link
                href="/admin/blogs/new"
                className="inline-flex h-11 items-center rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-primary)] transition hover:border-[var(--border-strong)] hover:text-[var(--gold-warm)]"
              >
                Create first post
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[var(--bg-app)] pt-32 pb-20">
      <div className="container-wide px-6">
        {/* --- MINIMALIST HEADER --- */}
        <div className="text-center">
          <SectionLabel>Journal & Insights</SectionLabel>
          <h1 className="font-heading text-h2 font-bold text-[var(--text-primary)]">
            Insights for{" "}
            <span className="text-gold-warm">Structured Digital Growth</span>
          </h1>
          <p className="body-light mx-auto mt-5 max-w-3xl">
            Practical notes for hospitals, doctors, clinics, and businesses that
            want consistent digital systems.
          </p>
        </div>

        {/* --- FEATURED ARTICLE (MINIMAL SPLIT) --- */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group block relative mb-32"
        >
          <div className="grid lg:grid-cols-12 gap-12 items-center border-[var(--border-soft)] py-16 transition-colors hover:bg-[var(--gold-warm)]/[0.01]">
            {/* Image Side */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-[var(--bg-panel)] border border-[var(--border-soft)]">
                {featured.coverImage ? (
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-8xl opacity-20">
                    {featured.icon}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--gold-warm)]">
                  Featured Article
                </span>
                <span className="h-px w-8 bg-[var(--border-soft)]" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                  {featured.category}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tighter leading-tight group-hover:text-[var(--gold-warm)] transition-colors">
                {featured.title}
              </h2>

              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                {featured.excerpt}
              </p>

              <div className="pt-6 flex items-center justify-between">
                <p className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                  {featured.date} · {featured.readTime}
                </p>
                <div className="flex items-center gap-2 text-[var(--gold-warm)] font-mono text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all">
                  Read Full Entry <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* --- TABS & ARCHIVE --- */}
        <div className="mt-2">
          <BlogTabs posts={posts} />
        </div>
      </div>
    </section>
  );
}
