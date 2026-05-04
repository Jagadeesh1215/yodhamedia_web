import "server-only";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { BlogPost, BlogSection } from "@/lib/blog/types";

type LeadRecord = Record<string, unknown> & {
  id: string;
  createdAt?: string;
};

type BlogPostRow = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  icon: string;
  tags: Prisma.JsonValue;
  takeaway: string;
  content: Prisma.JsonValue;
  author: string;
  coverImage: string | null;
  coverImagePublicId: string | null;
  status: "published" | "draft";
  featured: boolean;
  publishedAt: Date;
  updatedAt: Date;
  seoTitle: string | null;
  seoDescription: string | null;
};

type LeadRow = {
  id: string;
  type: "contact" | "consultation";
  name: string;
  email: string;
  phone: string;
  company: string | null;
  service: string | null;
  budget: string | null;
  message: string | null;
  preferredDate: string | null;
  timezone: string | null;
  notes: string | null;
  bookingUrl: string | null;
  source: string | null;
  pageUrl: string | null;
  createdAt: Date;
};

function toStringArray(value: Prisma.JsonValue): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item)).filter(Boolean);
}

function toSectionArray(value: Prisma.JsonValue): BlogSection[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((section) => {
      const heading = String((section as { heading?: unknown })?.heading || "");
      const bodyValue = (section as { body?: unknown })?.body;
      const body = Array.isArray(bodyValue)
        ? bodyValue.map((item) => String(item).trim()).filter(Boolean)
        : String(bodyValue || "")
            .split(/\n+/)
            .map((item) => item.trim())
            .filter(Boolean);

      return { heading, body };
    })
    .filter((section) => section.heading.trim() && section.body.length)
    .map((section) => ({
      heading: section.heading.trim(),
      body: section.body,
    }));
}

function parseDate(value?: string | null) {
  if (!value) return new Date();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function normalizePost(post: BlogPost): BlogPost {
  const now = new Date().toISOString();

  return {
    ...post,
    status: post.status || "published",
    author: post.author || "YodhaMedia Editorial",
    publishedAt: post.publishedAt || post.updatedAt || now,
    updatedAt: post.updatedAt || post.publishedAt || now,
    seoTitle: post.seoTitle || post.title,
    seoDescription: post.seoDescription || post.excerpt,
  };
}

function sortByLatest(posts: BlogPost[]) {
  return [...posts].sort((a, b) => {
    const left = new Date(a.updatedAt || a.publishedAt || a.date).getTime();
    const right = new Date(b.updatedAt || b.publishedAt || b.date).getTime();
    return right - left;
  });
}

function mapBlogRow(row: BlogPostRow): BlogPost {
  return normalizePost({
    slug: row.slug,
    category: row.category,
    title: row.title,
    excerpt: row.excerpt,
    date: row.date,
    readTime: row.readTime,
    icon: row.icon,
    tags: toStringArray(row.tags),
    takeaway: row.takeaway,
    content: toSectionArray(row.content),
    author: row.author,
    coverImage: row.coverImage ?? undefined,
    coverImagePublicId: row.coverImagePublicId ?? undefined,
    status: row.status,
    featured: row.featured,
    publishedAt: row.publishedAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    seoTitle: row.seoTitle ?? undefined,
    seoDescription: row.seoDescription ?? undefined,
  });
}

function mapLeadRow(row: LeadRow): LeadRecord {
  return {
    id: row.id,
    type: row.type,
    name: row.name,
    email: row.email,
    phone: row.phone,
    company: row.company ?? "",
    service: row.service ?? "",
    budget: row.budget ?? "",
    message: row.message ?? "",
    preferredDate: row.preferredDate ?? "",
    timezone: row.timezone ?? "",
    notes: row.notes ?? "",
    bookingUrl: row.bookingUrl ?? "",
    source: row.source ?? "",
    pageUrl: row.pageUrl ?? "",
    createdAt: row.createdAt.toISOString(),
  };
}

function toBlogCreateInput(post: BlogPost): Prisma.BlogPostCreateInput {
  const normalized = normalizePost(post);

  return {
    slug: normalized.slug,
    category: normalized.category,
    title: normalized.title,
    excerpt: normalized.excerpt,
    date: normalized.date,
    readTime: normalized.readTime,
    icon: normalized.icon,
    tags: normalized.tags,
    takeaway: normalized.takeaway,
    content: normalized.content,
    author: normalized.author || "YodhaMedia Editorial",
    coverImage: normalized.coverImage || undefined,
    coverImagePublicId: normalized.coverImagePublicId || undefined,
    status: normalized.status === "draft" ? "draft" : "published",
    featured: Boolean(normalized.featured),
    publishedAt: parseDate(
      normalized.publishedAt || normalized.updatedAt || normalized.date,
    ),
    seoTitle: normalized.seoTitle || undefined,
    seoDescription: normalized.seoDescription || undefined,
  };
}

function toBlogUpdateInput(post: BlogPost): Prisma.BlogPostUpdateInput {
  const normalized = normalizePost(post);

  return {
    category: normalized.category,
    title: normalized.title,
    excerpt: normalized.excerpt,
    date: normalized.date,
    readTime: normalized.readTime,
    icon: normalized.icon,
    tags: normalized.tags,
    takeaway: normalized.takeaway,
    content: normalized.content,
    author: normalized.author || "YodhaMedia Editorial",
    coverImage: normalized.coverImage || undefined,
    coverImagePublicId: normalized.coverImagePublicId || undefined,
    status: normalized.status === "draft" ? "draft" : "published",
    featured: Boolean(normalized.featured),
    publishedAt: parseDate(
      normalized.publishedAt || normalized.updatedAt || normalized.date,
    ),
    seoTitle: normalized.seoTitle || undefined,
    seoDescription: normalized.seoDescription || undefined,
  };
}

export async function getAllBlogPosts() {
  const posts = await prisma.blogPost.findMany({
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
  });

  return sortByLatest(posts.map(mapBlogRow));
}

export async function getPublishedBlogPosts() {
  const posts = await getAllBlogPosts();
  return posts.filter((post) => post.status !== "draft");
}

export async function getBlogPostBySlug(slug: string) {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  return post ? mapBlogRow(post as BlogPostRow) : null;
}

export async function upsertBlogPost(
  nextPost: BlogPost,
  previousSlug?: string | null,
) {
  const record = normalizePost({
    ...nextPost,
    updatedAt: new Date().toISOString(),
    publishedAt: nextPost.publishedAt || new Date().toISOString(),
  });

  const saved = await prisma.$transaction(async (tx) => {
    if (previousSlug && previousSlug !== record.slug) {
      await tx.blogPost.deleteMany({ where: { slug: previousSlug } });
    }

    return tx.blogPost.upsert({
      where: { slug: record.slug },
      create: toBlogCreateInput(record),
      update: toBlogUpdateInput(record),
    });
  });

  return mapBlogRow(saved as BlogPostRow);
}

export async function deleteBlogPost(slug: string) {
  await prisma.blogPost.deleteMany({
    where: { slug },
  });
}

export async function listContactLeads() {
  const leads = await prisma.lead.findMany({
    where: { type: "contact" },
    orderBy: { createdAt: "desc" },
  });

  return leads.map((lead) => mapLeadRow(lead as LeadRow));
}

export async function listConsultationLeads() {
  const leads = await prisma.lead.findMany({
    where: { type: "consultation" },
    orderBy: { createdAt: "desc" },
  });

  return leads.map((lead) => mapLeadRow(lead as LeadRow));
}

async function saveLead(
  lead: LeadRecord,
  type: "contact" | "consultation",
) {
  await prisma.lead.create({
    data: {
      id: lead.id,
      type,
      name: String(lead.name || ""),
      email: String(lead.email || ""),
      phone: String(lead.phone || ""),
      company: lead.company ? String(lead.company) : undefined,
      service: lead.service ? String(lead.service) : undefined,
      budget: lead.budget ? String(lead.budget) : undefined,
      message: lead.message ? String(lead.message) : undefined,
      preferredDate: lead.preferredDate
        ? String(lead.preferredDate)
        : undefined,
      timezone: lead.timezone ? String(lead.timezone) : undefined,
      notes: lead.notes ? String(lead.notes) : undefined,
      bookingUrl: lead.bookingUrl ? String(lead.bookingUrl) : undefined,
      source: lead.source ? String(lead.source) : undefined,
      pageUrl: lead.pageUrl ? String(lead.pageUrl) : undefined,
    },
  });
}

export async function saveContactLead(
  lead: Record<string, unknown> & { id: string },
) {
  // Contact submissions and consultation requests share the same database table,
  // which keeps reporting simple while still preserving the source type.
  await saveLead(lead, "contact");
}

export async function saveConsultationLead(
  lead: Record<string, unknown> & { id: string },
) {
  await saveLead(lead, "consultation");
}
