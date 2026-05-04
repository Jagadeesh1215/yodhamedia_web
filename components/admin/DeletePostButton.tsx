"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";

export function DeletePostButton({
  slug,
  onDeleted,
}: {
  slug: string;
  onDeleted?: () => void;
}) {
  const [pending, setPending] = useState(false);

  return (
    <button
      type="button"
      disabled={pending}
      onClick={async () => {
        const confirmed = window.confirm(
          "Delete this blog post? This cannot be undone.",
        );
        if (!confirmed) return;

        setPending(true);
        try {
          const response = await fetch(`/api/admin/posts/${slug}`, {
            method: "DELETE",
          });
          const payload = await response.json();
          if (!response.ok || !payload.ok) {
            throw new Error(payload.error || "Unable to delete post.");
          }

          onDeleted?.();
          window.location.reload();
        } catch (error) {
          alert(
            error instanceof Error ? error.message : "Unable to delete post.",
          );
        } finally {
          setPending(false);
        }
      }}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-red-300 transition hover:border-red-400/40 hover:text-red-200 disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Deleting
        </>
      ) : (
        <>
          <Trash2 className="h-4 w-4" />
          Delete
        </>
      )}
    </button>
  );
}
