export type CaseStudy = {
  id: string;
  title: string;
  category: string;
  description: string;
  impact: string;
  details: string;
  tags: string[];
  imageText?: string;
  accent: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "01",
    title: "Healthcare ORM System",
    category: "Reputation",
    description:
      "A review generation and local SEO workflow for trust-sensitive medical practices.",
    impact: "Higher review volume and steadier profile visibility",
    details:
      "We connected Google profile hygiene, reputation response timing, and appointment-ready content so the practice could build trust consistently instead of reacting to ratings one by one.",
    tags: ["Local SEO", "ORM", "Automation"],
    imageText: "ORM",
    accent: "#D4AF37",
  },
  {
    id: "02",
    title: "Clinic Social Launch",
    category: "Content",
    description:
      "A video-first launch system for clinics that needed authority before scale.",
    impact: "More qualified attention from nearby patients",
    details:
      "We built short-form education, FAQ content, and doctor-led creative templates so the clinic could show expertise without turning the feed into advertisements.",
    tags: ["Video", "Instagram", "Creative"],
    imageText: "SOCIAL",
    accent: "#a855f7",
  },
  {
    id: "03",
    title: "Business Web Build",
    category: "Development",
    description:
      "A conversion-focused website stack designed for enquiry generation.",
    impact: "Cleaner journeys and stronger lead intent",
    details:
      "The build prioritized speed, hierarchy, and search visibility so the site could support future campaigns without needing a redesign first.",
    tags: ["Next.js", "UI/UX", "Infrastructure"],
    imageText: "WEB",
    accent: "#3b82f6",
  },
];
