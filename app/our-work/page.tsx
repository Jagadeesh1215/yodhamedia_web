import type { Metadata } from "next";
import { CTABanner } from "@/components/sections/HomeSections";
import PortfolioLedger from "@/components/sections/PortfolioLedger";
import { caseStudies } from "@/lib/constants/case-studies";

export const metadata: Metadata = {
  title: "Case Studies | YodhaMedia",
  description: "Systems and digital transformations by YodhaMedia LLP.",
};

export default function OurWorkPage() {
  return (
    <main className="bg-black">
      <PortfolioLedger cases={caseStudies} />
      <CTABanner />
    </main>
  );
}
