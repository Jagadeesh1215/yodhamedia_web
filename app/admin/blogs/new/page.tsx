import type { Metadata } from "next";
import Link from "next/link";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { requireAdmin } from "@/lib/admin";

export const metadata: Metadata = {
  title: "Create Blog Post",
  description: "Create a new blog article.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function NewBlogPage() {
  await requireAdmin();

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="admin-kicker">Content studio</p>
          <h1 className="text-4xl font-heading font-semibold tracking-tighter text-[var(--text-primary)] md:text-6xl">
            Create new blog article
          </h1>
        </div>
        <Link
          href="/admin/blogs"
          className="inline-flex h-11 items-center rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-primary)] transition hover:border-[var(--border-strong)] hover:text-[var(--gold-warm)]"
        >
          Back to library
        </Link>
      </div>
      <BlogEditor />
    </section>
  );
}
