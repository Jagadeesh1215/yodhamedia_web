import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { AdminLogin } from "@/components/auth/AdminLogin";
import {
  getAllBlogPosts,
  listContactLeads,
  listConsultationLeads,
} from "@/lib/blog/store";

export const metadata: Metadata = {
  title: "Admin",
  description: "Private admin dashboard for YodhaMedia blog and leads.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    return (
      <section className="space-y-8">
        <div className="admin-panel-strong p-6 md:p-8">
          <p className="admin-kicker">Private workspace</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-heading font-semibold tracking-tighter text-[var(--text-primary)] md:text-6xl">
                Control room for{" "}
                <span className="font-display italic text-[var(--gold-warm)]">
                  content, leads, and booking
                </span>
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                This area is locked to admins only. Log in to create and manage
                blog articles, review incoming leads, and keep the consultation
                pipeline tidy.
              </p>

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["Blog CMS", "Create and edit server-side posts"],
                  ["Lead Inbox", "Track contact and consultation requests"],
                  ["Booking Ready", "Connect a free scheduling link"],
                ].map(([title, text]) => (
                  <div key={title} className="admin-panel p-5">
                    <p className="admin-kicker">{title}</p>
                    <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/blog"
                  className="inline-flex h-11 items-center rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-primary)] transition hover:border-[var(--border-strong)] hover:text-[var(--gold-warm)]"
                >
                  Public blog
                </Link>
                <Link
                  href="/book-consultation"
                  className="inline-flex h-11 items-center rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-primary)] transition hover:border-[var(--border-strong)] hover:text-[var(--gold-warm)]"
                >
                  Booking page
                </Link>
              </div>
            </div>

            <AdminLogin className="lg:pl-4" />
          </div>
        </div>
      </section>
    );
  }

  const [posts, contactLeads, consultationLeads] = await Promise.all([
    getAllBlogPosts(),
    listContactLeads(),
    listConsultationLeads(),
  ]);

  const publishedCount = posts.filter((post) => post.status !== "draft").length;

  return (
    <section className="space-y-8">
      <div className="admin-panel-strong p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <p className="admin-kicker">Admin dashboard</p>
            <h1 className="max-w-4xl text-4xl font-heading font-semibold tracking-tighter text-[var(--text-primary)] md:text-6xl">
              Welcome back,{" "}
              <span className="font-display italic text-[var(--gold-warm)]">
                {session.user?.name || "Admin"}
              </span>
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
              Manage the blog, review lead requests, and keep the content engine
              moving without disturbing the public marketing UI.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/blogs/new"
              className="inline-flex h-11 items-center rounded-full border border-[var(--border-soft)] bg-[var(--gold-warm)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-black transition hover:opacity-95"
            >
              New blog post
            </Link>
            <Link
              href="/admin/leads"
              className="inline-flex h-11 items-center rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-primary)] transition hover:border-[var(--border-strong)] hover:text-[var(--gold-warm)]"
            >
              Lead inbox
            </Link>
            <Link
              href="/book-consultation"
              className="inline-flex h-11 items-center rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-primary)] transition hover:border-[var(--border-strong)] hover:text-[var(--gold-warm)]"
            >
              Booking page
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total posts", value: posts.length },
          { label: "Published posts", value: publishedCount },
          { label: "Contact leads", value: contactLeads.length },
          { label: "Consultations", value: consultationLeads.length },
        ].map((item) => (
          <div key={item.label} className="admin-panel p-6">
            <p className="admin-kicker">{item.label}</p>
            <p className="mt-4 text-4xl font-heading font-semibold tracking-tighter text-[var(--text-primary)]">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="admin-panel p-6 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="admin-kicker">Content system</p>
              <h2 className="mt-2 text-2xl font-heading font-semibold tracking-tighter text-[var(--text-primary)]">
                Latest blog posts
              </h2>
            </div>
            <Link
              href="/admin/blogs"
              className="text-sm font-medium text-[var(--gold-warm)] transition hover:text-[var(--gold-highlight)]"
            >
              View all
            </Link>
          </div>

          <div className="mt-6 grid gap-4">
            {posts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/admin/blogs/${post.slug}/edit`}
                className="group rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-panel)] p-5 transition hover:border-[var(--border-strong)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-2">
                    <p className="text-2xl">{post.icon}</p>
                    <p className="text-lg font-heading font-semibold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--gold-warm)]">
                      {post.title}
                    </p>
                  </div>
                  <span className="rounded-full border border-[var(--border-soft)] bg-[var(--bg-app)] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-muted)]">
                    {post.status || "published"}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="admin-panel p-6 md:p-8">
            <p className="admin-kicker">Lead inbox</p>
            <h2 className="mt-2 text-2xl font-heading font-semibold tracking-tighter text-[var(--text-primary)]">
              Contact requests
            </h2>
            <div className="mt-5 space-y-3">
              {contactLeads.slice(0, 3).map((lead: any) => (
                <div
                  key={lead.id}
                  className="rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-panel)] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-heading text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                        {lead.name}
                      </p>
                      <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        {lead.service || "General enquiry"} - {lead.email}
                      </p>
                    </div>
                    <span className="rounded-full border border-[var(--border-soft)] bg-[var(--bg-app)] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-muted)]">
                      Lead
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-panel p-6 md:p-8">
            <p className="admin-kicker">Consultation queue</p>
            <h2 className="mt-2 text-2xl font-heading font-semibold tracking-tighter text-[var(--text-primary)]">
              Booking requests
            </h2>
            <div className="mt-5 space-y-3">
              {consultationLeads.slice(0, 3).map((lead: any) => (
                <div
                  key={lead.id}
                  className="rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-panel)] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-heading text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                        {lead.name}
                      </p>
                      <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        {lead.preferredDate || "No date set"} - {lead.phone}
                      </p>
                    </div>
                    <span className="rounded-full border border-[var(--border-soft)] bg-[var(--bg-app)] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-muted)]">
                      Queue
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
