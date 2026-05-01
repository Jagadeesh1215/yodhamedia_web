"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { services } from "@/lib/constants/services";
import { Button } from "@/components/ui/Button";

export function ConsultationModal({
  triggerClassName,
}: {
  triggerClassName?: string;
}) {
  const [sent, setSent] = useState(false);

  return (
    <Dialog.Root onOpenChange={() => setSent(false)}>
      <Dialog.Trigger asChild>
        <Button className={triggerClassName}>Book Consultation</Button>
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
              <form
                className="mt-6 grid gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
              >
                <input required placeholder="Name" className="form-field" />
                <input required placeholder="Phone" className="form-field" />
                <input
                  type="email"
                  placeholder="Email"
                  className="form-field"
                />
                <select className="form-field">
                  <option>Service Interested In</option>
                  {services.map((service) => (
                    <option key={service.slug}>{service.name}</option>
                  ))}
                </select>
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="form-field resize-none"
                />
                <button className="mt-2 h-12 rounded-[var(--radius-sm)] bg-gradient-to-r from-gold-warm to-gold-bright font-heading font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-gold-md">
                  Submit Request
                </button>
              </form>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
