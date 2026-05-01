import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CTABanner } from "@/components/sections/HomeSections";
import { blogPosts } from "@/lib/constants/blog";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) notFound();
  const otherPosts = blogPosts.filter((item) => item.slug !== post.slug);

  return (
    <>
      <section className="surface-band px-5 pb-20 pt-32 md:px-10">
        <div className="container-wide grid gap-10 lg:grid-cols-[minmax(0,1fr)_330px]">
          <article className="panel p-6 md:p-10">
            <p className="font-body text-sm text-[var(--text-secondary)]">
              <Link href="/" className="hover:text-gold-warm">
                Home
              </Link>{" "}
              /{" "}
              <Link href="/blog" className="hover:text-gold-warm">
                Blog
              </Link>{" "}
              / {post.category}
            </p>
            <span className="mt-8 inline-flex rounded-full bg-gold-warm px-3 py-1 font-label text-[11px] uppercase tracking-wider text-white">
              {post.category}
            </span>
            <h1 className="mt-5 font-heading text-h2 font-bold text-[var(--text-primary)]">
              {post.title}
            </h1>
            <p className="mt-4 font-body text-sm text-[var(--text-secondary)]">
              YodhaMedia Editorial | {post.date} | {post.readTime}
            </p>
            <div className="mt-8 flex h-80 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-deep to-purple-vivid text-8xl">
              {post.icon}
            </div>
            <div className="mt-8 border-l-4 border-gold-warm bg-gold-pale/40 p-5">
              <h2 className="font-heading text-xl font-bold text-[var(--text-primary)]">
                Key Takeaway
              </h2>
              <p className="mt-2 font-body text-sm leading-7 text-[var(--text-secondary)]">
                {post.takeaway}
              </p>
            </div>
            <div className="mt-10 grid gap-9">
              {post.content.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
                    {section.heading}
                  </h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="body-light mt-4">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>
            <div className="mt-10 rounded-2xl bg-purple-deep p-6">
              <h2 className="font-heading text-2xl font-bold text-white">
                Need help implementing this?
              </h2>
              <p className="mt-3 font-body text-sm leading-7 text-white/70">
                YodhaMedia can turn this into a working content, ORM, ads, or
                web system for your business.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex font-heading text-sm font-semibold text-gold-highlight"
              >
                Book Consultation {"->"}
              </Link>
            </div>
            <h2 className="mt-10 font-heading text-2xl font-bold text-[var(--text-primary)]">
              FAQs
            </h2>
            <FAQAccordion />
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-purple-vivid/10 px-3 py-1 font-body text-xs text-purple-vivid"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
          <aside className="space-y-6">
            <div className="panel sticky top-28 p-6">
              <h2 className="font-heading text-xl font-bold text-[var(--text-primary)]">
                Featured Posts
              </h2>
              <div className="mt-5 grid gap-4">
                {otherPosts.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="block rounded-xl bg-purple-vivid/8 p-4 transition hover:bg-purple-vivid/14"
                  >
                    <p className="font-heading font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </p>
                    <p className="mt-1 font-body text-xs text-[var(--text-secondary)]">
                      {item.readTime}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="mt-6 rounded-xl bg-purple-deep p-5">
                <p className="font-heading font-semibold text-white">
                  Need Help?
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex font-heading text-sm text-gold-highlight"
                >
                  Talk to YodhaMedia {"->"}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
