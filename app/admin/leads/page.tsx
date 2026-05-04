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
    <section className="space-y-8">
      <div className="admin-panel-strong p-6 md:p-8">
        <p className="admin-kicker">Lead inbox</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-heading font-semibold tracking-tighter text-[var(--text-primary)] md:text-6xl">
          Contact and booking requests
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
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
    <div className="admin-panel p-6 md:p-8">
      <p className="admin-kicker">{accent}</p>
      <h2 className="mt-2 text-2xl font-heading font-semibold tracking-tighter text-[var(--text-primary)]">
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
                  <p className="font-heading text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                    {lead.name}
                  </p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {lead.email} - {lead.phone}
                  </p>
                </div>
                <span className="rounded-full border border-[var(--border-soft)] bg-[var(--bg-app)] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-muted)]">
                  {lead.createdAt
                    ? new Date(lead.createdAt).toLocaleDateString()
                    : "new"}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
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
