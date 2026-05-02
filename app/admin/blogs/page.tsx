import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { getAllBlogPosts } from "@/lib/blog/store";
import { DeletePostButton } from "@/components/admin/DeletePostButton";

export const metadata: Metadata = {
  title: "Blog Admin",
  description: "Manage published and draft blog posts.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  await requireAdmin();
  const posts = await getAllBlogPosts();

  return (
    <section className="section hero-shell pt-32">
      <div className="container-wide space-y-8">
        <div className="panel-strong flex flex-col gap-5 p-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-warm">
              Blog management
            </p>
            <h1 className="mt-4 font-heading text-h2 font-bold text-[var(--text-primary)]">
              Content library
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
              Posts are stored server-side, so the public blog can update
              without redesigning the current frontend.
            </p>
          </div>
          <Link
            href="/admin/blogs/new"
            className="inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-gradient-to-r from-gold-warm to-gold-bright px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Create post
          </Link>
        </div>

        <div className="grid gap-4">
          {posts.length ? (
            posts.map((post) => (
              <div
                key={post.slug}
                className="panel flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-2xl">{post.icon}</span>
                    <div>
                      <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
                        {post.title}
                      </h2>
                      <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        {post.category} • {post.readTime} • {post.date}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--text-secondary)]">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-gold-warm/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-warm">
                    {post.status || "published"}
                  </span>
                  {post.featured && (
                    <span className="rounded-full bg-purple-vivid/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-purple-vivid">
                      featured
                    </span>
                  )}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex h-10 items-center rounded-[var(--radius-sm)] border border-[var(--border-soft)] bg-[var(--bg-panel)] px-3 text-sm font-semibold text-[var(--text-primary)] transition hover:-translate-y-0.5"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/blogs/${post.slug}/edit`}
                    className="inline-flex h-10 items-center rounded-[var(--radius-sm)] bg-gold-warm/10 px-3 text-sm font-semibold text-gold-warm transition hover:-translate-y-0.5"
                  >
                    Edit
                  </Link>
                  <DeletePostButton slug={post.slug} />
                </div>
              </div>
            ))
          ) : (
            <div className="panel border-dashed p-8 text-center text-sm text-[var(--text-secondary)]">
              No blog posts found yet. Create the first article to seed the
              blog.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
