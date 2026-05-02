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
    <section className="section hero-shell pt-32">
      <div className="container-wide">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-warm">
              Content studio
            </p>
            <h1 className="mt-4 font-heading text-h2 font-bold text-[var(--text-primary)]">
              Create new blog article
            </h1>
          </div>
          <Link
            href="/admin/blogs"
            className="inline-flex h-11 items-center rounded-[var(--radius-sm)] border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-sm font-semibold text-[var(--text-primary)] transition hover:-translate-y-0.5"
          >
            Back to library
          </Link>
        </div>
        <BlogEditor />
      </div>
    </section>
  );
}
