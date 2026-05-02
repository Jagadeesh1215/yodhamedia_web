"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/constants/site";

export function WhatsAppButton() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <a
      href={`https://wa.me/${site.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-110 md:h-14 md:w-14"
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
      <MessageCircle className="relative h-6 w-6" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-dark-surface px-3 py-2 font-body text-xs text-white opacity-0 shadow-card transition group-hover:opacity-100 md:block">
        Chat on WhatsApp
      </span>
    </a>
  );
}
