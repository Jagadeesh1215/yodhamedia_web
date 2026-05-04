"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { services } from "@/lib/constants/services";
import { site } from "@/lib/constants/site";
import Link from "next/link";

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  website: string;
};

const initialState: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(initialState);
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (key: keyof ContactFormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  return (
    <form
      className="panel-strong p-7 md:p-8"
      onSubmit={async (event) => {
        event.preventDefault();
        setPending(true);
        setError(null);
        setSent(false);

        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...form,
              source: "contact-page",
              pageUrl: window.location.href,
            }),
          });

          const payload = await response.json();
          if (!response.ok || !payload.ok) {
            throw new Error(payload.error || "Failed to submit the form.");
          }

          setSent(true);
          setForm(initialState);
        } catch (submitError) {
          setError(
            submitError instanceof Error
              ? submitError.message
              : "Failed to submit the form.",
          );
        } finally {
          setPending(false);
        }
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(event) => update("name", event.target.value)}
          className="form-field"
        />
        <input
          required
          placeholder="Phone"
          value={form.phone}
          onChange={(event) => update("phone", event.target.value)}
          className="form-field"
        />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
          className="form-field"
        />
        <input
          placeholder="Company / Practice"
          value={form.company}
          onChange={(event) => update("company", event.target.value)}
          className="form-field"
        />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <select
          value={form.service}
          onChange={(event) => update("service", event.target.value)}
          className="form-field w-full"
        >
          <option value="">Service Interested In</option>
          {services.map((service) => (
            <option key={service.slug} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>
        <select
          value={form.budget}
          onChange={(event) => update("budget", event.target.value)}
          className="form-field w-full"
        >
          <option value="">Budget Range</option>
          {["Under 50k", "50k - 1L", "1L - 3L", "3L+"].map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>
      <textarea
        required
        placeholder="Tell us what you want to build"
        rows={5}
        value={form.message}
        onChange={(event) => update("message", event.target.value)}
        className="form-field mt-4 h-auto w-full resize-none py-4"
      />
      <input
        value={form.website}
        onChange={(event) => update("website", event.target.value)}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />

      {error && (
        <div className="mt-4 space-y-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          <p>{error}</p>
          <div className="flex flex-wrap gap-3 text-[10px] font-mono uppercase tracking-[0.3em]">
            <a
              href={`mailto:${site.email}`}
              className="rounded-full border border-red-500/20 px-3 py-2 transition hover:border-red-400/40"
            >
              Email us
            </a>
            <Link
              href="/book-consultation"
              className="rounded-full border border-red-500/20 px-3 py-2 transition hover:border-red-400/40"
            >
              Book a slot
            </Link>
          </div>
        </div>
      )}
      {sent && (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          Thanks, we received your message and will respond shortly.
        </div>
      )}

      <button
        disabled={pending}
        className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-gradient-to-r from-gold-warm to-gold-bright font-heading font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-gold-md disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending request
          </>
        ) : (
          "Submit Request"
        )}
      </button>
    </form>
  );
}
