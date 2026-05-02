import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { AdminLogin } from "@/components/auth/AdminLogin";
import { SignOutButton } from "@/components/auth/SignOutButton";
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
      <section className="section hero-shell min-h-[calc(100vh-80px)] pt-32">
        <div className="container-wide grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-warm">
              Private workspace
            </p>
            <h1 className="mt-4 font-heading text-h2 font-bold text-[var(--text-primary)]">
              Admin control room for{" "}
              <span className="text-gold-highlight">
                content, leads, and booking
              </span>
            </h1>
            <p className="body-dark mt-6 max-w-2xl">
              This area is locked to admins only. Log in to create and manage
              blog articles, review incoming leads, and keep the consultation
              pipeline tidy.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["Blog CMS", "Create and edit server-side posts"],
                ["Lead Inbox", "Track contact and consultation requests"],
                ["Booking Ready", "Connect a free scheduling link"],
              ].map(([title, text]) => (
                <div key={title} className="panel p-5">
                  <h2 className="font-heading text-lg font-bold text-[var(--text-primary)]">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <AdminLogin />
        </div>
      </section>
    );
  }

  const [posts, contactLeads, consultationLeads] = await Promise.all([
    getAllBlogPosts(),
    listContactLeads(),
    listConsultationLeads(),
  ]);

  return (
    <section className="section hero-shell min-h-[calc(100vh-80px)] pt-32">
      <div className="container-wide space-y-8">
        <div className="panel-strong flex flex-col gap-6 p-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-warm">
              Admin dashboard
            </p>
            <h1 className="mt-4 font-heading text-h2 font-bold text-[var(--text-primary)]">
              Welcome back,{" "}
              <span className="text-gold-highlight">
                {session.user?.name || "Admin"}
              </span>
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
              Manage the blog, review lead requests, and keep the content engine
              moving without disturbing the public marketing UI.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/blogs/new"
              className="inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-gradient-to-r from-gold-warm to-gold-bright px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              New blog post
            </Link>
            <Link
              href="/book-consultation"
              className="inline-flex h-11 items-center rounded-[var(--radius-sm)] border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-sm font-semibold text-[var(--text-primary)] transition hover:-translate-y-0.5"
            >
              Booking page
            </Link>
            <Link
              href="/admin/leads"
              className="inline-flex h-11 items-center rounded-[var(--radius-sm)] border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-sm font-semibold text-[var(--text-primary)] transition hover:-translate-y-0.5"
            >
              Lead inbox
            </Link>
            <SignOutButton />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "Total posts", value: posts.length },
            {
              label: "Published posts",
              value: posts.filter((post) => post.status !== "draft").length,
            },
            { label: "Contact leads", value: contactLeads.length },
            { label: "Consultations", value: consultationLeads.length },
          ].map((item) => (
            <div key={item.label} className="panel p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                {item.label}
              </p>
              <p className="mt-3 font-heading text-4xl font-bold text-[var(--text-primary)]">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="panel p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-warm">
                  Content system
                </p>
                <h2 className="mt-1 font-heading text-2xl font-bold text-[var(--text-primary)]">
                  Latest blog posts
                </h2>
              </div>
              <Link
                href="/admin/blogs"
                className="text-sm font-semibold text-gold-warm hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="mt-6 grid gap-4">
              {posts.slice(0, 3).map((post) => (
                <Link
                  key={post.slug}
                  href={`/admin/blogs/${post.slug}/edit`}
                  className="rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-panel)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--border-strong)]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-heading text-lg font-semibold text-[var(--text-primary)]">
                      {post.title}
                    </p>
                    <span className="rounded-full bg-gold-warm/10 px-3 py-1 text-xs font-semibold text-gold-warm">
                      {post.status || "published"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="panel p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-warm">
                Lead inbox
              </p>
              <h2 className="mt-1 font-heading text-2xl font-bold text-[var(--text-primary)]">
                Contact requests
              </h2>
              <div className="mt-5 space-y-3">
                {contactLeads.slice(0, 3).map((lead: any) => (
                  <div
                    key={lead.id}
                    className="rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-panel)] p-4"
                  >
                    <p className="font-heading font-semibold text-[var(--text-primary)]">
                      {lead.name}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {lead.service || "General enquiry"} • {lead.email}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-warm">
                Consultation queue
              </p>
              <h2 className="mt-1 font-heading text-2xl font-bold text-[var(--text-primary)]">
                Booking requests
              </h2>
              <div className="mt-5 space-y-3">
                {consultationLeads.slice(0, 3).map((lead: any) => (
                  <div
                    key={lead.id}
                    className="rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-panel)] p-4"
                  >
                    <p className="font-heading font-semibold text-[var(--text-primary)]">
                      {lead.name}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {lead.preferredDate || "No date set"} • {lead.phone}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
