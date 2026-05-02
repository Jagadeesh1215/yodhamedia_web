"use client";

import { useMemo, useState } from "react";
import { Plus, Save, Trash2, Sparkles } from "lucide-react";
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
    icon: post?.icon || "✦",
    tags: post?.tags?.join(", ") || "",
    takeaway: post?.takeaway || "",
    author: post?.author || "YodhaMedia Editorial",
    coverImage: post?.coverImage || "",
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

function buildPayload(state: BlogEditorState, previousSlug?: string) {
  return {
    previousSlug,
    slug: state.slug,
    category: state.category,
    title: state.title,
    excerpt: state.excerpt,
    date: state.date,
    readTime: state.readTime,
    icon: state.icon,
    tags: state.tags,
    takeaway: state.takeaway,
    author: state.author,
    coverImage: state.coverImage,
    status: state.status,
    featured: state.featured,
    publishedAt: state.publishedAt,
    seoTitle: state.seoTitle,
    seoDescription: state.seoDescription,
    content: state.content
      .map((section) => ({
        heading: section.heading,
        body: section.body
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
      }))
      .filter((section) => section.heading && section.body.length),
  };
}

export function BlogEditor({ post }: { post?: BlogPost }) {
  const initial = useMemo(() => mapPost(post), [post]);
  const [state, setState] = useState<BlogEditorState>(initial);
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
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(buildPayload(state, previousSlug)),
            },
          );
          const payload = await response.json();
          if (!response.ok || !payload.ok) {
            throw new Error(payload.error || "Unable to save the blog post.");
          }

          setSuccess("Blog post saved successfully.");
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
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="panel-strong p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-warm">
                  Blog editor
                </p>
                <h2 className="mt-1 font-heading text-3xl font-bold text-[var(--text-primary)]">
                  {post ? "Edit article" : "New article"}
                </h2>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={addSection}
                  className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-sm font-semibold text-[var(--text-primary)] transition hover:-translate-y-0.5"
                >
                  <Plus className="h-4 w-4" />
                  Add section
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-sm)] bg-gradient-to-r from-gold-warm to-gold-bright px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-70"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save article"}
                </button>
              </div>
            </div>

            {error && (
              <p className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                {error}
              </p>
            )}
            {success && (
              <p className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600">
                {success}
              </p>
            )}

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input
                required
                placeholder="Slug"
                value={state.slug}
                onChange={(event) => update("slug", event.target.value)}
                className="form-field"
              />
              <input
                required
                placeholder="Article title"
                value={state.title}
                onChange={(event) => update("title", event.target.value)}
                className="form-field"
              />
            </div>

            <textarea
              required
              rows={4}
              placeholder="Short excerpt"
              value={state.excerpt}
              onChange={(event) => update("excerpt", event.target.value)}
              className="form-field mt-4 h-auto w-full resize-none py-3"
            />

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <select
                value={state.category}
                onChange={(event) => update("category", event.target.value)}
                className="form-field"
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
                className="form-field"
              />
              <input
                placeholder="Emoji / icon"
                value={state.icon}
                onChange={(event) => update("icon", event.target.value)}
                className="form-field"
              />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input
                placeholder="Tags separated by commas"
                value={state.tags}
                onChange={(event) => update("tags", event.target.value)}
                className="form-field"
              />
              <input
                placeholder="Author"
                value={state.author}
                onChange={(event) => update("author", event.target.value)}
                className="form-field"
              />
            </div>

            <textarea
              required
              rows={4}
              placeholder="Key takeaway"
              value={state.takeaway}
              onChange={(event) => update("takeaway", event.target.value)}
              className="form-field mt-4 h-auto w-full resize-none py-3"
            />

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input
                placeholder="SEO title"
                value={state.seoTitle}
                onChange={(event) => update("seoTitle", event.target.value)}
                className="form-field"
              />
              <input
                placeholder="SEO description"
                value={state.seoDescription}
                onChange={(event) =>
                  update("seoDescription", event.target.value)
                }
                className="form-field"
              />
            </div>
          </div>

          <div className="space-y-4">
            {state.content.map((section, index) => (
              <div key={`${index}-${section.heading}`} className="panel p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      Section {index + 1}
                    </p>
                    <h3 className="font-heading text-xl font-semibold text-[var(--text-primary)]">
                      Content block
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--border-soft)] px-3 text-sm text-[var(--text-secondary)] transition hover:text-red-500"
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
                  className="form-field mt-4 w-full"
                />
                <textarea
                  required
                  rows={8}
                  placeholder="Write each paragraph on a new line"
                  value={section.body}
                  onChange={(event) =>
                    updateSection(index, "body", event.target.value)
                  }
                  className="form-field mt-4 h-auto w-full resize-none py-3"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="panel-strong p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-warm">
              Article settings
            </p>
            <div className="mt-4 grid gap-4">
              <input
                placeholder="Publish date label"
                value={state.date}
                onChange={(event) => update("date", event.target.value)}
                className="form-field"
              />
              <input
                placeholder="Published at ISO"
                value={state.publishedAt}
                onChange={(event) => update("publishedAt", event.target.value)}
                className="form-field"
              />
              <input
                placeholder="Cover image URL"
                value={state.coverImage}
                onChange={(event) => update("coverImage", event.target.value)}
                className="form-field"
              />

              <div className="flex flex-wrap gap-3">
                <CloudinaryUploadButton
                  label="Upload cover via Cloudinary"
                  onUploaded={(url) => update("coverImage", url)}
                />
              </div>

              <select
                value={state.status}
                onChange={(event) =>
                  update("status", event.target.value as "published" | "draft")
                }
                className="form-field"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>

              <label className="flex items-center gap-3 rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 py-3">
                <input
                  type="checkbox"
                  checked={state.featured}
                  onChange={(event) => update("featured", event.target.checked)}
                  className="h-4 w-4 rounded border-[var(--border-soft)] text-gold-warm"
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

          <div className="panel p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Preview notes
            </p>
            <div className="space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
              <p className="flex items-start gap-2">
                <Sparkles className="mt-1 h-4 w-4 shrink-0 text-gold-warm" />
                The editor saves JSON posts to the server store so the public
                blog updates without touching the current UI shell.
              </p>
              <p>
                Cloudinary is used only for image hosting. Set the upload
                credentials in your environment and the upload button will
                become active.
              </p>
              <p>
                Section bodies support one paragraph per line. That keeps the
                post structure easy to edit without introducing a heavyweight
                CMS dependency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
