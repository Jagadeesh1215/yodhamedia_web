"use client";

import { useEffect, useState } from "react";
import { ImageUp, Loader2 } from "lucide-react";

declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        options: Record<string, unknown>,
        callback: (
          error: unknown,
          result: { event: string; info?: { secure_url?: string } } | undefined,
        ) => void,
      ) => { open: () => void };
    };
  }
}

function useCloudinaryScript() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.cloudinary) {
      setReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.async = true;
    script.onload = () => setReady(true);
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  return ready;
}

export function CloudinaryUploadButton({
  onUploaded,
  label = "Upload image",
}: {
  onUploaded: (url: string) => void;
  label?: string;
}) {
  const ready = useCloudinaryScript();
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const openWidget = () => {
    if (!window.cloudinary || !cloudName || !uploadPreset) return;

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        multiple: false,
        cropping: false,
        sources: ["local", "url", "camera"],
        showAdvancedOptions: false,
        folder: "yodhamedia/blog",
        maxImageFileSize: 10_000_000,
      },
      (error, result) => {
        if (error) {
          console.error(error);
          return;
        }

        if (result?.event === "success" && result.info?.secure_url) {
          onUploaded(result.info.secure_url);
        }
      },
    );

    widget.open();
  };

  return (
    <button
      type="button"
      onClick={openWidget}
      disabled={!ready || !cloudName || !uploadPreset}
      className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-sm font-semibold text-[var(--text-primary)] transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {ready ? (
        <ImageUp className="h-4 w-4" />
      ) : (
        <Loader2 className="h-4 w-4 animate-spin" />
      )}
      {label}
    </button>
  );
}
