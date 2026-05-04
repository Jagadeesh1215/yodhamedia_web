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
    <section className="space-y-8">
      <div className="admin-panel-strong flex flex-col gap-6 p-6 md:p-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <p className="admin-kicker">Blog management</p>
          <h1 className="max-w-4xl text-4xl font-heading font-semibold tracking-tighter text-[var(--text-primary)] md:text-6xl">
            Content library
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
            Posts are stored server-side, so the public blog can update without
            redesigning the current frontend.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex h-11 items-center rounded-full border border-[var(--border-soft)] bg-[var(--gold-warm)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-black transition hover:opacity-95"
        >
          Create post
        </Link>
      </div>

      <div className="grid gap-4">
        {posts.length ? (
          posts.map((post) => (
            <div
              key={post.slug}
              className="admin-panel flex flex-col gap-4 p-5 md:p-6 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-start gap-4">
                  <span className="text-2xl">{post.icon}</span>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-heading font-semibold tracking-tight text-[var(--text-primary)]">
                      {post.title}
                    </h2>
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-muted)]">
                      {post.category} - {post.readTime} - {post.date}
                    </p>
                  </div>
                </div>
                <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--text-secondary)]">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[var(--border-soft)] bg-[var(--bg-app)] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-muted)]">
                  {post.status || "published"}
                </span>
                {post.featured && (
                  <span className="rounded-full border border-[var(--gold-warm)]/30 bg-[var(--gold-warm)]/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--gold-warm)]">
                    featured
                  </span>
                )}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex h-10 items-center rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-3 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-primary)] transition hover:border-[var(--border-strong)] hover:text-[var(--gold-warm)]"
                >
                  View
                </Link>
                <Link
                  href={`/admin/blogs/${post.slug}/edit`}
                  className="inline-flex h-10 items-center rounded-full border border-[var(--gold-warm)]/30 bg-[var(--gold-warm)]/10 px-3 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--gold-warm)] transition hover:border-[var(--gold-warm)]/50"
                >
                  Edit
                </Link>
                <DeletePostButton slug={post.slug} />
              </div>
            </div>
          ))
        ) : (
          <div className="admin-panel border-dashed p-8 text-center text-sm text-[var(--text-secondary)]">
            No blog posts found yet. Create the first article to seed the blog.
          </div>
        )}
      </div>
    </section>
  );
}
