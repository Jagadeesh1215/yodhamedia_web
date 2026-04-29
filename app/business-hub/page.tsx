import type { Metadata } from "next";
import { CTABanner } from "@/components/sections/HomeSections";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Business Hub",
  description: "YodhaMedia business hub network for local visibility and distribution.",
};

export default function BusinessHubPage() {
  return (
    <>
      <section className="section hero-shell pt-32">
        <div className="container-wide text-center">
          <SectionLabel>Business Hub</SectionLabel>
          <h1 className="font-heading text-h2 font-bold text-[var(--text-primary)]">Local Reach Through <span className="text-gold-highlight">Owned Distribution</span></h1>
          <p className="body-dark mx-auto mt-5 max-w-3xl">Our business hub network is designed to support discovery, local promotion, and category-focused visibility for growing Indian businesses.</p>
        </div>
      </section>
      <section className="section surface-band">
        <div className="container-wide grid gap-6 md:grid-cols-3">
          {["City Pages", "Business Features", "Campaign Amplification"].map((item) => (
            <div key={item} className="panel p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-warm text-2xl font-heading font-bold text-white">Y</div>
              <h2 className="mt-6 font-heading text-2xl font-bold text-[var(--text-primary)]">{item}</h2>
              <p className="body-light mt-3">A structured distribution layer that extends content beyond owned channels.</p>
            </div>
          ))}
        </div>
      </section>
      <CTABanner />
    </>
  );
}
