"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Plus, Save, Trash2, Sparkles, CheckCircle2 } from "lucide-react";
import type { BlogPost } from "@/lib/blog/types";
import { blogCategories } from "@/lib/blog/types";
import { CloudinaryUploadButton } from "@/components/media/CloudinaryUploadButton";

type SectionDraft = {
  heading: string;
  body: string;
};

type BlogEditorState = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  icon: string;
  tags: string;
  takeaway: string;
  author: string;
  coverImage: string;
  coverImagePublicId: string;
  status: "published" | "draft";
  featured: boolean;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  content: SectionDraft[];
};

function mapPost(post?: BlogPost): BlogEditorState {
  return {
    slug: post?.slug || "",
    category: post?.category || blogCategories[1],
    title: post?.title || "",
    excerpt: post?.excerpt || "",
    date:
      post?.date ||
      new Date().toLocaleDateString("en-IN", { dateStyle: "long" }),
    readTime: post?.readTime || "5 min read",
    icon: post?.icon || "*",
    tags: post?.tags?.join(", ") || "",
    takeaway: post?.takeaway || "",
    author: post?.author || "YodhaMedia Editorial",
    coverImage: post?.coverImage || "",
    coverImagePublicId: post?.coverImagePublicId || "",
    status: post?.status || "published",
    featured: Boolean(post?.featured),
    publishedAt: post?.publishedAt || new Date().toISOString(),
    seoTitle: post?.seoTitle || post?.title || "",
    seoDescription: post?.seoDescription || post?.excerpt || "",
    content: post?.content?.map((section) => ({
      heading: section.heading,
      body: section.body.join("\n"),
    })) || [{ heading: "", body: "" }],
  };
}

function buildFormData(
  state: BlogEditorState,
  options: { coverImageFile: File | null; removeCoverImage: boolean },
) {
  const formData = new FormData();
  formData.append("slug", state.slug);
  formData.append("category", state.category);
  formData.append("title", state.title);
  formData.append("excerpt", state.excerpt);
  formData.append("date", state.date);
  formData.append("readTime", state.readTime);
  formData.append("icon", state.icon);
  formData.append("tags", state.tags);
  formData.append("takeaway", state.takeaway);
  formData.append("author", state.author);
  formData.append("status", state.status);
  formData.append("featured", String(state.featured));
  formData.append("publishedAt", state.publishedAt);
  formData.append("seoTitle", state.seoTitle);
  formData.append("seoDescription", state.seoDescription);
  formData.append("removeCoverImage", String(options.removeCoverImage));
  formData.append(
    "contentJson",
    JSON.stringify(
      state.content
        .map((section) => ({
          heading: section.heading,
          body: section.body
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
        }))
        .filter((section) => section.heading && section.body.length),
    ),
  );

  if (options.coverImageFile) {
    // Image is uploaded by the post API on the server, not directly from the browser.
    formData.append("coverImageFile", options.coverImageFile);
  }

  return formData;
}

export function BlogEditor({ post }: { post?: BlogPost }) {
  const initial = useMemo(() => mapPost(post), [post]);
  const [state, setState] = useState<BlogEditorState>(initial);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  const [removeCoverImage, setRemoveCoverImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const previousSlug = post?.slug;

  const update = <K extends keyof BlogEditorState>(
    key: K,
    value: BlogEditorState[K],
  ) => {
    setState((current) => ({ ...current, [key]: value }));
  };

  const addSection = () => {
    setState((current) => ({
      ...current,
      content: [...current.content, { heading: "", body: "" }],
    }));
  };

  const updateSection = (
    index: number,
    key: keyof SectionDraft,
    value: string,
  ) => {
    setState((current) => ({
      ...current,
      content: current.content.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, [key]: value } : section,
      ),
    }));
  };

  const removeSection = (index: number) => {
    setState((current) => ({
      ...current,
      content:
        current.content.length > 1
          ? current.content.filter((_, sectionIndex) => sectionIndex !== index)
          : current.content,
    }));
  };

  useEffect(() => {
    if (!coverImageFile) {
      setCoverPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(coverImageFile);
    setCoverPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [coverImageFile]);

  const effectiveCoverImage =
    coverPreviewUrl || (removeCoverImage ? "" : state.coverImage);

  return (
    <form
      className="space-y-6"
      onSubmit={async (event) => {
        event.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(null);

        try {
          const response = await fetch(
            previousSlug
              ? `/api/admin/posts/${previousSlug}`
              : "/api/admin/posts",
            {
              method: previousSlug ? "PATCH" : "POST",
              body: buildFormData(state, { coverImageFile, removeCoverImage }),
            },
          );
          const payload = await response.json();
          if (!response.ok || !payload.ok) {
            throw new Error(payload.error || "Unable to save the blog post.");
          }

          setSuccess("Blog post saved successfully.");
          setCoverImageFile(null);
          setRemoveCoverImage(false);

          if (payload.post?.coverImage) {
            update("coverImage", payload.post.coverImage);
          }
          if (payload.post?.coverImagePublicId) {
            update("coverImagePublicId", payload.post.coverImagePublicId);
          }

          if (!previousSlug) {
            window.location.href = "/admin/blogs";
          } else if (payload.post?.slug && payload.post.slug !== previousSlug) {
            window.location.href = `/admin/blogs/${payload.post.slug}/edit`;
          }
        } catch (submitError) {
          setError(
            submitError instanceof Error
              ? submitError.message
              : "Unable to save the blog post.",
          );
        } finally {
          setSaving(false);
        }
      }}
    >
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="admin-panel-strong p-6 md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-4">
                <span className="admin-chip text-[var(--gold-warm)]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Content Studio
                </span>
                <div>
                  <h2 className="text-3xl font-heading font-semibold tracking-tighter text-[var(--text-primary)] md:text-4xl">
                    {post ? "Edit article" : "New article"}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
                    Posts are stored server-side, so editing here updates the
                    blog without rebuilding the rest of the site.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={addSection}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-primary)] transition hover:border-[var(--border-strong)] hover:text-[var(--gold-warm)]"
                >
                  <Plus className="h-4 w-4" />
                  Add section
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--gold-warm)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-black transition hover:opacity-95 disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Saving" : "Save article"}
                </button>
              </div>
            </div>
            {error ? (
              <p className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            ) : null}
            {success ? (
              <p className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                {success}
              </p>
            ) : null}
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <input
                required
                placeholder="Slug"
                value={state.slug}
                onChange={(event) => update("slug", event.target.value)}
                className="admin-field"
              />
              <input
                required
                placeholder="Article title"
                value={state.title}
                onChange={(event) => update("title", event.target.value)}
                className="admin-field"
              />
            </div>
            <textarea
              required
              rows={4}
              placeholder="Short excerpt"
              value={state.excerpt}
              onChange={(event) => update("excerpt", event.target.value)}
              className="admin-field mt-4 h-auto w-full resize-none py-3"
            />
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <select
                value={state.category}
                onChange={(event) => update("category", event.target.value)}
                className="admin-field"
              >
                {blogCategories
                  .filter((category) => category !== "All")
                  .map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
              <input
                placeholder="Read time"
                value={state.readTime}
                onChange={(event) => update("readTime", event.target.value)}
                className="admin-field"
              />
              <input
                placeholder="Icon"
                value={state.icon}
                onChange={(event) => update("icon", event.target.value)}
                className="admin-field"
              />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input
                placeholder="Tags separated by commas"
                value={state.tags}
                onChange={(event) => update("tags", event.target.value)}
                className="admin-field"
              />
              <input
                placeholder="Author"
                value={state.author}
                onChange={(event) => update("author", event.target.value)}
                className="admin-field"
              />
            </div>
            <textarea
              required
              rows={4}
              placeholder="Key takeaway"
              value={state.takeaway}
              onChange={(event) => update("takeaway", event.target.value)}
              className="admin-field mt-4 h-auto w-full resize-none py-3"
            />
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input
                placeholder="SEO title"
                value={state.seoTitle}
                onChange={(event) => update("seoTitle", event.target.value)}
                className="admin-field"
              />
              <input
                placeholder="SEO description"
                value={state.seoDescription}
                onChange={(event) =>
                  update("seoDescription", event.target.value)
                }
                className="admin-field"
              />
            </div>
          </div>

          <div className="space-y-4">
            {state.content.map((section, index) => (
              <div
                key={`${index}-${section.heading}`}
                className="admin-panel p-5 md:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <p className="admin-kicker">Section {index + 1}</p>
                    <h3 className="text-xl font-heading font-semibold tracking-tight text-[var(--text-primary)]">
                      Content block
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-3 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-muted)] transition hover:border-red-400/40 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
                <input
                  required
                  placeholder="Section heading"
                  value={section.heading}
                  onChange={(event) =>
                    updateSection(index, "heading", event.target.value)
                  }
                  className="admin-field mt-4"
                />
                <textarea
                  required
                  rows={8}
                  placeholder="Write each paragraph on a new line"
                  value={section.body}
                  onChange={(event) =>
                    updateSection(index, "body", event.target.value)
                  }
                  className="admin-field mt-4 h-auto w-full resize-none py-3"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="admin-panel-strong p-6 md:p-8">
            <p className="admin-kicker">Article settings</p>
            <div className="mt-4 grid gap-4">
              <input
                placeholder="Publish date label"
                value={state.date}
                onChange={(event) => update("date", event.target.value)}
                className="admin-field"
              />
              <input
                placeholder="Published at ISO"
                value={state.publishedAt}
                onChange={(event) => update("publishedAt", event.target.value)}
                className="admin-field"
              />

              <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-panel)] p-4">
                <p className="admin-kicker">Cover image</p>
                <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border-soft)] bg-[var(--bg-app)]">
                  {effectiveCoverImage ? (
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={effectiveCoverImage}
                        alt={state.title || "Blog cover image"}
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/9] items-center justify-center px-6 text-center text-sm text-[var(--text-secondary)]">
                      No cover image selected yet.
                    </div>
                  )}
                </div>
                <div className="mt-4 grid gap-2 text-xs text-[var(--text-secondary)]">
                  <p>
                    <span className="text-[var(--text-muted)]">URL:</span>{" "}
                    {state.coverImage || "Will be generated on save"}
                  </p>
                  <p>
                    <span className="text-[var(--text-muted)]">
                      Cloudinary ID:
                    </span>{" "}
                    {state.coverImagePublicId || "Will be generated on save"}
                  </p>
                  {coverImageFile ? (
                    <p>
                      <span className="text-[var(--text-muted)]">Pending:</span>{" "}
                      {coverImageFile.name}
                    </p>
                  ) : null}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <CloudinaryUploadButton
                    label={state.coverImage ? "Replace cover" : "Select cover"}
                    onSelected={(file) => {
                      setCoverImageFile(file);
                      setRemoveCoverImage(false);
                    }}
                  />
                  {state.coverImage || coverImageFile ? (
                    <button
                      type="button"
                      onClick={() => {
                        setCoverImageFile(null);
                        setRemoveCoverImage(true);
                        update("coverImage", "");
                        update("coverImagePublicId", "");
                      }}
                      className="inline-flex h-11 items-center rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-muted)] transition hover:border-red-400/40 hover:text-red-300"
                    >
                      Clear image
                    </button>
                  ) : null}
                </div>
              </div>

              <select
                value={state.status}
                onChange={(event) =>
                  update("status", event.target.value as "published" | "draft")
                }
                className="admin-field"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <label className="flex items-center gap-3 rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 py-3">
                <input
                  type="checkbox"
                  checked={state.featured}
                  onChange={(event) => update("featured", event.target.checked)}
                  className="h-4 w-4 rounded border-[var(--border-soft)] text-[var(--gold-warm)]"
                />
                <span>
                  <strong className="block text-sm text-[var(--text-primary)]">
                    Feature this post
                  </strong>
                  <span className="text-xs text-[var(--text-secondary)]">
                    Promoted as the leading post on the blog landing page.
                  </span>
                </span>
              </label>
            </div>
          </div>

          <div className="admin-panel p-6 md:p-8">
            <p className="admin-kicker">Preview notes</p>
            <div className="mt-4 space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
              <p className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--gold-warm)]" />
                The editor submits post data and optional image file in one
                request so the API can persist both content and media metadata
                together.
              </p>
              <p>
                Cloudinary upload runs on the server inside the post APIs. The
                browser never uploads directly to Cloudinary.
              </p>
              <p>
                Section bodies support one paragraph per line. That keeps the
                post structure easy to edit without a heavyweight CMS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
