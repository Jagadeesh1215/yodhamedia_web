"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { ImageUp } from "lucide-react";

export function CloudinaryUploadButton({
  onSelected,
  label = "Select image",
}: {
  onSelected: (file: File) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > 10_000_000) {
      setError("Images must be 10MB or smaller.");
      event.target.value = "";
      return;
    }

    setError(null);
    onSelected(file);
    event.target.value = "";
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-primary)] transition hover:border-[var(--border-strong)] hover:text-[var(--gold-warm)]"
      >
        <ImageUp className="h-4 w-4" />
        {label}
      </button>
      {error ? <p className="text-xs text-red-300">{error}</p> : null}
    </div>
  );
}
