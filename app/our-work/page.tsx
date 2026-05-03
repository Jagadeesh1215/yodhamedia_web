import type { Metadata } from "next";
import { CTABanner } from "@/components/sections/HomeSections";
import PortfolioLedger from "@/components/sections/PortfolioLedger";

export const metadata: Metadata = {
  title: "Case Studies | YodhaMedia",
  description: "Systems and digital transformations by YodhaMedia LLP.",
};

export default function OurWorkPage() {
  // To add more projects, just append to this list
  const cases = [
    {
      id: "01",
      title: "Healthcare ORM System",
      category: "Reputation",
      description: "Google profile optimization and trust-building workflows.",
      details:
        "Automated review generation and local SEO stabilization for medical practitioners.",
      tags: ["Local SEO", "ORM", "Automation"],
      accent: "#D4AF37", // Gold
    },
    {
      id: "02",
      title: "Clinic Social Launch",
      category: "Content",
      description: "Video-first growth strategy for specialized clinics.",
      details:
        "High-retention Reels and educational doctor-led content systems.",
      tags: ["Video", "Instagram", "Creative"],
      accent: "#a855f7", // Purple
    },
    {
      id: "03",
      title: "Business Web Build",
      category: "Development",
      description: "Inquiry-optimized digital infrastructure.",
      details:
        "High-performance Next.js sites focused on conversion and technical SEO.",
      tags: ["Next.js", "UI/UX", "Infrastructure"],
      accent: "#3b82f6", // Blue
    },
  ];

  return (
    <main className="bg-black">
      <PortfolioLedger cases={cases} />
      <CTABanner />
    </main>
  );
}
