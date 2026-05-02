import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin";
import { listContactLeads, listConsultationLeads } from "@/lib/blog/store";

export const metadata: Metadata = {
  title: "Lead Inbox",
  description: "Review contact and consultation submissions.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  await requireAdmin();
  const [contactLeads, consultationLeads] = await Promise.all([
    listContactLeads(),
    listConsultationLeads(),
  ]);

  return (
    <section className="section hero-shell pt-32">
      <div className="container-wide space-y-8">
        <div className="panel-strong p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-warm">
            Lead inbox
          </p>
          <h1 className="mt-4 font-heading text-h2 font-bold text-[var(--text-primary)]">
            Contact and booking requests
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
            These submissions are stored server-side and also emailed if SMTP is
            configured.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <LeadColumn
            title="Contact leads"
            leads={contactLeads}
            accent="General enquiries"
          />
          <LeadColumn
            title="Consultation leads"
            leads={consultationLeads}
            accent="Book-a-call requests"
          />
        </div>
      </div>
    </section>
  );
}

function LeadColumn({
  title,
  leads,
  accent,
}: {
  title: string;
  leads: any[];
  accent: string;
}) {
  return (
    <div className="panel p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-warm">
        {accent}
      </p>
      <h2 className="mt-1 font-heading text-2xl font-bold text-[var(--text-primary)]">
        {title}
      </h2>

      <div className="mt-5 space-y-3">
        {leads.length ? (
          leads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-panel)] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-heading text-lg font-semibold text-[var(--text-primary)]">
                    {lead.name}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {lead.email} • {lead.phone}
                  </p>
                </div>
                <span className="rounded-full bg-gold-warm/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-warm">
                  {lead.createdAt
                    ? new Date(lead.createdAt).toLocaleDateString()
                    : "new"}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                {lead.message ||
                  lead.notes ||
                  lead.preferredDate ||
                  "No message"}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-[var(--border-soft)] bg-[var(--bg-panel)] p-6 text-sm text-[var(--text-secondary)]">
            No submissions yet.
          </div>
        )}
      </div>
    </div>
  );
}
