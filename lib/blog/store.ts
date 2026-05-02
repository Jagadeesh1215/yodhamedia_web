import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { blogPosts as seedPosts } from "@/lib/constants/blog";
import type { BlogPost } from "@/lib/blog/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog", "posts");
const CONTACT_DIR = path.join(process.cwd(), "content", "leads", "contact");
const CONSULTATION_DIR = path.join(
  process.cwd(),
  "content",
  "leads",
  "consultations",
);

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function readJsonFiles<T>(dir: string): Promise<T[]> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = entries.filter(
      (entry) => entry.isFile() && entry.name.endsWith(".json"),
    );
    const rows = await Promise.all(
      files.map(async (entry) => {
        const raw = await fs.readFile(path.join(dir, entry.name), "utf8");
        return JSON.parse(raw) as T;
      }),
    );
    return rows;
  } catch {
    return [];
  }
}

function sortByLatest(posts: BlogPost[]) {
  return [...posts].sort((a, b) => {
    const left = new Date(a.updatedAt || a.publishedAt || a.date).getTime();
    const right = new Date(b.updatedAt || b.publishedAt || b.date).getTime();
    return right - left;
  });
}

function normalizePost(post: BlogPost): BlogPost {
  return {
    ...post,
    status: post.status || "published",
    author: post.author || "YodhaMedia Editorial",
    publishedAt: post.publishedAt || post.updatedAt || new Date().toISOString(),
    updatedAt: post.updatedAt || post.publishedAt || new Date().toISOString(),
    seoTitle: post.seoTitle || post.title,
    seoDescription: post.seoDescription || post.excerpt,
  };
}

export async function getAllBlogPosts() {
  await ensureDir(BLOG_DIR);
  const posts = await readJsonFiles<BlogPost>(BLOG_DIR);
  const normalized = posts.length
    ? posts.map(normalizePost)
    : seedPosts.map((post) =>
        normalizePost({
          ...post,
          status: "published",
          author: "YodhaMedia Editorial",
          publishedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          seoTitle: post.title,
          seoDescription: post.excerpt,
        }),
      );

  return sortByLatest(normalized);
}

export async function getPublishedBlogPosts() {
  const posts = await getAllBlogPosts();
  return posts.filter((post) => post.status !== "draft");
}

export async function getBlogPostBySlug(slug: string) {
  const posts = await getAllBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export async function upsertBlogPost(
  nextPost: BlogPost,
  previousSlug?: string | null,
) {
  await ensureDir(BLOG_DIR);
  const record = normalizePost({
    ...nextPost,
    updatedAt: new Date().toISOString(),
    publishedAt: nextPost.publishedAt || new Date().toISOString(),
  });

  if (previousSlug && previousSlug !== record.slug) {
    const oldPath = path.join(BLOG_DIR, `${previousSlug}.json`);
    await fs.rm(oldPath, { force: true });
  }

  const filePath = path.join(BLOG_DIR, `${record.slug}.json`);
  await fs.writeFile(filePath, JSON.stringify(record, null, 2), "utf8");
  return record;
}

export async function deleteBlogPost(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.json`);
  await fs.rm(filePath, { force: true });
}

export async function listContactLeads() {
  await ensureDir(CONTACT_DIR);
  const leads = await readJsonFiles<
    Record<string, unknown> & { createdAt?: string }
  >(CONTACT_DIR);
  return [...leads].sort(
    (a, b) =>
      new Date(String(b.createdAt || 0)).getTime() -
      new Date(String(a.createdAt || 0)).getTime(),
  );
}

export async function listConsultationLeads() {
  await ensureDir(CONSULTATION_DIR);
  const leads = await readJsonFiles<
    Record<string, unknown> & { createdAt?: string }
  >(CONSULTATION_DIR);
  return [...leads].sort(
    (a, b) =>
      new Date(String(b.createdAt || 0)).getTime() -
      new Date(String(a.createdAt || 0)).getTime(),
  );
}

export async function saveContactLead(
  lead: Record<string, unknown> & { id: string },
) {
  await ensureDir(CONTACT_DIR);
  await fs.writeFile(
    path.join(CONTACT_DIR, `${lead.id}.json`),
    JSON.stringify(lead, null, 2),
    "utf8",
  );
}

export async function saveConsultationLead(
  lead: Record<string, unknown> & { id: string },
) {
  await ensureDir(CONSULTATION_DIR);
  await fs.writeFile(
    path.join(CONSULTATION_DIR, `${lead.id}.json`),
    JSON.stringify(lead, null, 2),
    "utf8",
  );
}
