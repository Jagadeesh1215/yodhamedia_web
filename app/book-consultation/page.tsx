import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Book Consultation",
  description:
    "Book a free consultation slot using your preferred scheduling tool.",
};

export const dynamic = "force-dynamic";

export default function BookConsultationPage() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();

  return (
    <section className="section hero-shell pt-32">
      <div className="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionLabel className="justify-start">Free Booking</SectionLabel>
          <h1 className="font-heading text-h2 font-bold text-[var(--text-primary)]">
            Pick a time that works{" "}
            <span className="text-gold-highlight">
              without the back-and-forth
            </span>
          </h1>
          <p className="body-dark mt-5 max-w-2xl">
            The cleanest free option for this kind of flow is a scheduling link
            from Calendly&apos;s free tier or Cal.com. Drop your public booking
            URL into the environment and this page becomes a ready-made booking
            screen.
          </p>

          <div className="mt-8 grid gap-4">
            {[
              "One place for inbound consultation bookings",
              "Works with a free public scheduling link",
              "Keeps the contact form for people who prefer email",
            ].map((item) => (
              <div
                key={item}
                className="panel p-5 text-sm text-[var(--text-secondary)]"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-gold-warm/10 px-4 text-sm font-semibold text-gold-warm transition hover:-translate-y-0.5"
            >
              Prefer a message form
            </Link>
            <Link
              href="/admin"
              className="inline-flex h-11 items-center rounded-[var(--radius-sm)] border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-sm font-semibold text-[var(--text-primary)] transition hover:-translate-y-0.5"
            >
              Admin inbox
            </Link>
          </div>
        </div>

        <div className="panel-strong overflow-hidden p-4 md:p-5">
          {bookingUrl ? (
            <iframe
              title="Book a consultation"
              src={bookingUrl}
              className="min-h-[760px] w-full rounded-[var(--radius-md)] border-0 bg-white"
              allow="camera; microphone; fullscreen"
            />
          ) : (
            <div className="flex min-h-[760px] items-center justify-center rounded-[var(--radius-md)] border border-dashed border-[var(--border-soft)] bg-[var(--bg-panel)] p-8 text-center">
              <div className="max-w-lg">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-warm">
                  Setup needed
                </p>
                <h2 className="mt-4 font-heading text-3xl font-bold text-[var(--text-primary)]">
                  Add your free booking URL
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                  Set <code>NEXT_PUBLIC_BOOKING_URL</code> to your Calendly or
                  Cal.com public booking page and this section becomes the live
                  scheduler.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
