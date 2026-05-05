"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { Check, X, Loader2, CalendarDays } from "lucide-react";
import { useState } from "react";
import { services } from "@/lib/constants/services";
import { Button } from "@/components/ui/Button";

export function ConsultationModal({
  triggerClassName,
}: {
  triggerClassName?: string;
}) {
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    timezone: "",
    notes: "",
    service: "",
  });

  return (
    <Dialog.Root
      onOpenChange={(open) => {
        if (!open) {
          setSent(false);
          setError(null);
          setPending(false);
        }
      }}
    >
      <Dialog.Trigger asChild>
        <Button className={`${triggerClassName} cursor-none`}>
          Book Consultation
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-dark-bg/65 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--bg-panel)] p-7 shadow-[var(--shadow-card)]">
          <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 text-[var(--text-muted)] hover:bg-gold-pale/25 hover:text-[var(--text-primary)]">
            <X className="h-4 w-4" />
          </Dialog.Close>
          {sent ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold-warm text-white">
                <Check className="h-8 w-8" />
              </div>
              <Dialog.Title className="font-heading text-2xl font-bold text-[var(--text-primary)]">
                Request received
              </Dialog.Title>
              <p className="mt-3 font-body text-[var(--text-secondary)]">
                We&apos;ll contact you within 24 hours.
              </p>
            </div>
          ) : (
            <>
              <Dialog.Title className="font-heading text-2xl font-bold text-[var(--text-primary)]">
                Book a Consultation
              </Dialog.Title>
              <Dialog.Description className="mt-2 font-body text-sm leading-7 text-[var(--text-secondary)]">
                Tell us what you want to grow. We&apos;ll map the right digital
                system for you.
              </Dialog.Description>
              <div className="mt-5 rounded-2xl border border-gold-warm/20 bg-gold-warm/10 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gold-warm">
                  <CalendarDays className="h-4 w-4" />
                  Prefer to book directly?
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  Use the free scheduling page if you already have a Calendly or
                  Cal.com link set up.
                </p>
                <Link
                  href="/book-consultation"
                  className="mt-3 inline-flex text-sm font-semibold text-gold-warm hover:underline"
                >
                  Open booking page
                </Link>
                <p className="mt-3 text-xs leading-6 text-[var(--text-muted)]">
                  If the modal submission is unavailable, the booking page and
                  the contact form still give visitors a path to reach the team.
                </p>
              </div>

              <form
                className="mt-6 grid gap-4"
                onSubmit={async (event) => {
                  event.preventDefault();
                  setPending(true);
                  setError(null);
                  try {
                    const response = await fetch("/api/consultation", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        ...form,
                        source: "consultation-modal",
                        bookingUrl: bookingUrl || "",
                      }),
                    });
                    const data = await response.json();
                    if (!response.ok || !data.ok) {
                      throw new Error(
                        data.error || "Unable to submit request.",
                      );
                    }
                    setSent(true);
                  } catch (submitError) {
                    setError(
                      submitError instanceof Error
                        ? submitError.message
                        : "Unable to submit request.",
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
                    className="form-field"
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                  />
                  <input
                    required
                    placeholder="Phone"
                    className="form-field"
                    value={form.phone}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        phone: event.target.value,
                      }))
                    }
                  />
                </div>
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="form-field"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    placeholder="Preferred date"
                    className="form-field"
                    value={form.preferredDate}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        preferredDate: event.target.value,
                      }))
                    }
                  />
                  <input
                    placeholder="Timezone"
                    className="form-field"
                    value={form.timezone}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        timezone: event.target.value,
                      }))
                    }
                  />
                </div>
                <select
                  className="form-field"
                  value={form.service}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      service: event.target.value,
                    }))
                  }
                >
                  <option value="">Service Interested In</option>
                  {services.map((service) => (
                    <option key={service.slug} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </select>
                <textarea
                  placeholder="A few notes about your goals"
                  rows={4}
                  className="form-field resize-none"
                  value={form.notes}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      notes: event.target.value,
                    }))
                  }
                />
                {error && (
                  <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                    {error}
                  </p>
                )}
                <button className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-gradient-to-r from-gold-warm to-gold-bright font-heading font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-gold-md disabled:opacity-70">
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
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
