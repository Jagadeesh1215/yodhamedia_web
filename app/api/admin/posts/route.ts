import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getBlogPostBySlug, upsertBlogPost } from "@/lib/blog/store";
import type { BlogPost } from "@/lib/blog/types";

export const runtime = "nodejs";

function isAdminRole(role?: string) {
  return role === "admin";
}

function toBlogPost(body: any): BlogPost {
  const sections = Array.isArray(body.content)
    ? body.content
        .map((section: any) => ({
          heading: String(section?.heading || "").trim(),
          body: Array.isArray(section?.body)
            ? section.body
                .map((item: unknown) => String(item).trim())
                .filter(Boolean)
            : String(section?.body || "")
                .split(/\n+/)
                .map((item: string) => item.trim())
                .filter(Boolean),
        }))
        .filter(
          (section: { heading: string; body: string[] }) =>
            section.heading && section.body.length,
        )
    : [];

  return {
    slug: String(body.slug || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, ""),
    category: String(body.category || "Website & Branding").trim(),
    title: String(body.title || "").trim(),
    excerpt: String(body.excerpt || "").trim(),
    date: String(
      body.date ||
        new Date().toLocaleDateString("en-IN", { dateStyle: "long" }),
    ),
    readTime: String(body.readTime || "5 min read").trim(),
    icon: String(body.icon || "✦").trim(),
    tags: String(body.tags || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    takeaway: String(body.takeaway || "").trim(),
    content: sections,
    author: String(body.author || "YodhaMedia Editorial").trim(),
    coverImage: body.coverImage ? String(body.coverImage).trim() : undefined,
    status: body.status === "draft" ? "draft" : "published",
    featured: Boolean(body.featured),
    publishedAt: body.publishedAt ? String(body.publishedAt) : undefined,
    updatedAt: body.updatedAt ? String(body.updatedAt) : undefined,
    seoTitle: body.seoTitle ? String(body.seoTitle).trim() : undefined,
    seoDescription: body.seoDescription
      ? String(body.seoDescription).trim()
      : undefined,
  };
}

async function requireAdmin() {
  const session = await auth();
  if (!isAdminRole(session?.user?.role)) {
    return null;
  }

  return session;
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const post = toBlogPost(body);

    if (
      !post.slug ||
      !post.title ||
      !post.excerpt ||
      !post.takeaway ||
      !post.content.length
    ) {
      return NextResponse.json(
        { ok: false, error: "Missing required blog fields." },
        { status: 400 },
      );
    }

    const existing = await getBlogPostBySlug(post.slug);
    if (existing) {
      return NextResponse.json(
        { ok: false, error: "A post with that slug already exists." },
        { status: 409 },
      );
    }

    const record = await upsertBlogPost(post);
    return NextResponse.json({ ok: true, post: record });
  } catch (error) {
    console.error("Create blog post error", error);
    return NextResponse.json(
      { ok: false, error: "Unable to save the blog post." },
      { status: 500 },
    );
  }
}
