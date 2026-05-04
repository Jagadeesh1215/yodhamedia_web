import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  deleteBlogPost,
  getBlogPostBySlug,
  upsertBlogPost,
} from "@/lib/blog/store";
import type { BlogPost } from "@/lib/blog/types";

export const runtime = "nodejs";

function isAdminRole(role?: string) {
  return role === "admin";
}

function getCloudinaryConfig() {
  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME?.trim() ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();
  const uploadPreset =
    process.env.CLOUDINARY_UPLOAD_PRESET?.trim() ||
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET?.trim();

  return { cloudName, uploadPreset };
}

function field(formData: FormData, key: string, fallback = "") {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : fallback;
}

function boolField(formData: FormData, key: string) {
  return field(formData, key).toLowerCase() === "true";
}

function parseSections(formData: FormData) {
  const raw = field(formData, "contentJson");
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
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
      );
  } catch {
    return [];
  }
}

async function uploadToCloudinary(file: File) {
  const { cloudName, uploadPreset } = getCloudinaryConfig();
  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Missing Cloudinary config. Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET.",
    );
  }

  const uploadForm = new FormData();
  uploadForm.append("file", file, file.name);
  uploadForm.append("upload_preset", uploadPreset);
  uploadForm.append("folder", "yodhamedia/blog");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: uploadForm },
  );
  const payload = (await response.json()) as {
    secure_url?: string;
    public_id?: string;
    error?: { message?: string };
  };

  if (!response.ok || !payload.secure_url) {
    throw new Error(payload.error?.message || "Cloudinary rejected the upload.");
  }

  return { url: payload.secure_url, publicId: payload.public_id };
}

async function toBlogPost(
  formData: FormData,
  slug: string,
  current?: BlogPost | null,
): Promise<BlogPost> {
  const removeCoverImage = boolField(formData, "removeCoverImage");
  const file = formData.get("coverImageFile");
  const upload =
    file instanceof File && file.size > 0 ? await uploadToCloudinary(file) : null;

  const nextCoverImage = removeCoverImage
    ? undefined
    : upload?.url || current?.coverImage;
  const nextCoverImagePublicId = removeCoverImage
    ? undefined
    : upload?.publicId || current?.coverImagePublicId;

  return {
    slug,
    category: field(formData, "category", "Website & Branding"),
    title: field(formData, "title"),
    excerpt: field(formData, "excerpt"),
    date:
      field(formData, "date") ||
      new Date().toLocaleDateString("en-IN", { dateStyle: "long" }),
    readTime: field(formData, "readTime", "5 min read"),
    icon: field(formData, "icon", "*"),
    tags: field(formData, "tags")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    takeaway: field(formData, "takeaway"),
    content: parseSections(formData),
    author: field(formData, "author", "YodhaMedia Editorial"),
    coverImage: nextCoverImage,
    coverImagePublicId: nextCoverImagePublicId,
    status: field(formData, "status") === "draft" ? "draft" : "published",
    featured: boolField(formData, "featured"),
    publishedAt: field(formData, "publishedAt") || undefined,
    updatedAt: field(formData, "updatedAt") || undefined,
    seoTitle: field(formData, "seoTitle") || undefined,
    seoDescription: field(formData, "seoDescription") || undefined,
  };
}

async function requireAdmin() {
  const session = await auth();
  if (!isAdminRole(session?.user?.role)) return null;
  return session;
}

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { slug } = params;
    const current = await getBlogPostBySlug(slug);
    if (!current) {
      return NextResponse.json(
        { ok: false, error: "Post not found." },
        { status: 404 },
      );
    }

    const formData = await request.formData();
    const nextSlug = field(formData, "slug", slug)
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const post = await toBlogPost(formData, nextSlug, current);

    if (nextSlug !== slug) {
      const existing = await getBlogPostBySlug(nextSlug);
      if (existing) {
        return NextResponse.json(
          { ok: false, error: "A different post already uses that slug." },
          { status: 409 },
        );
      }
    }

    const record = await upsertBlogPost(
      {
        ...current,
        ...post,
        publishedAt: current.publishedAt || post.publishedAt,
      },
      slug,
    );

    return NextResponse.json({ ok: true, post: record });
  } catch (error) {
    console.error("Update blog post error", error);
    return NextResponse.json(
      { ok: false, error: "Unable to update the blog post." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    await deleteBlogPost(params.slug);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Delete blog post error", error);
    return NextResponse.json(
      { ok: false, error: "Unable to delete the blog post." },
      { status: 500 },
    );
  }
}
