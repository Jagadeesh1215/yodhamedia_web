import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BarChart3,
  Brush,
  Globe2,
  Megaphone,
  MonitorSmartphone,
  Share2,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

export type Service = {
  slug: string;
  icon: LucideIcon;
  emoji: string;
  name: string;
  category: string;
  hero: string;
  description: string;
  deliverables: string[];
  bestFor: string;
  challenge: string[];
  solution: string[];
  process: string[];
  benefits: string[];
};

export const services: Service[] = [
  {
    slug: "social-media-partner",
    icon: MonitorSmartphone,
    emoji: "📱",
    name: "Social Media Partner",
    category: "Content & Platform Management",
    hero: "Professional Social Media Management for Consistent Growth",
    description:
      "End-to-end content creation, video production, and platform management designed for consistent brand visibility.",
    deliverables: [
      "Content calendar",
      "Script writing",
      "Video shooting",
      "Reel editing",
      "Flyer design",
      "Content approval",
      "Account management",
    ],
    bestFor: "Hospitals, clinics, professionals",
    challenge: [
      "Inconsistent posting weakens recall and trust.",
      "Unstructured content rarely converts attention into enquiries.",
      "Busy teams cannot manage planning, shooting, editing, and approvals every week.",
    ],
    solution: [
      "A monthly content system with clear calendars and approval flows.",
      "Professional video, reels, flyers, captions, and platform management.",
      "Consistent publishing aligned with patient and customer trust.",
    ],
    process: ["Strategy mapping", "Calendar planning", "Content production", "Approval and posting", "Monthly optimization"],
    benefits: ["Consistent brand presence", "Higher enquiry readiness", "Professional visual identity", "Reduced team workload"],
  },
  {
    slug: "orm",
    icon: Star,
    emoji: "⭐",
    name: "Online Reputation (ORM)",
    category: "Trust & Local Visibility",
    hero: "Build Trust. Improve Reputation. Grow Your Business.",
    description:
      "Google Business optimization, reviews management, and local SEO to strengthen your digital credibility.",
    deliverables: ["Google Business Profile", "Review management", "Local SEO", "Regular posts", "Digital visiting cards"],
    bestFor: "Hospitals, doctors, clinics, and local service brands",
    challenge: [
      "Low ratings and incomplete profiles reduce customer confidence.",
      "Good service is invisible when reviews and local search are unmanaged.",
      "Delayed responses make reputation issues harder to correct.",
    ],
    solution: [
      "Optimize Google Business Profile for search and trust.",
      "Create a structured review and response system.",
      "Use local SEO posts and digital cards to support discovery.",
    ],
    process: ["Profile audit", "Listing optimization", "Review workflow setup", "Local content publishing", "Reputation reporting"],
    benefits: ["Stronger trust signals", "Better local discovery", "Improved rating hygiene", "Higher appointment intent"],
  },
  {
    slug: "branding-partner",
    icon: Brush,
    emoji: "🎨",
    name: "Branding Partner",
    category: "Print & Offline Identity",
    hero: "Professional Branding & Print Design Solutions",
    description:
      "Professional design solutions for all print and offline branding, including banners, hoardings, and promotional materials.",
    deliverables: ["Banners", "Hoardings", "Canopy tents", "Posters", "Promotional materials", "Complete print solutions"],
    bestFor: "Clinics, campaigns, product sellers, and local launches",
    challenge: [
      "Offline branding often looks disconnected from digital identity.",
      "Vendors produce materials without a consistent visual system.",
      "Promotions lose impact when layouts feel generic.",
    ],
    solution: [
      "Create campaign-ready designs with brand consistency.",
      "Prepare print-ready material for banners, hoardings, and promos.",
      "Align offline presence with digital marketing campaigns.",
    ],
    process: ["Brand audit", "Visual direction", "Design production", "Print-ready handoff", "Campaign support"],
    benefits: ["Consistent recognition", "Premium public presence", "Faster campaign rollout", "Better launch visibility"],
  },
  {
    slug: "web-designing",
    icon: Globe2,
    emoji: "💻",
    name: "Web Designing",
    category: "Website & UX",
    hero: "Modern, Responsive Website Development",
    description:
      "Modern, responsive websites built for performance, user experience, and scalability with SEO-friendly structure.",
    deliverables: [
      "Website design & development",
      "Responsive UI/UX",
      "Blog integration",
      "Website maintenance",
      "SEO-friendly structure",
    ],
    bestFor: "Healthcare providers, service businesses, and growing brands",
    challenge: [
      "Outdated websites reduce credibility before a conversation begins.",
      "Slow, confusing pages lose high-intent visitors.",
      "A weak structure makes future SEO and content growth harder.",
    ],
    solution: [
      "Design modern pages that communicate trust quickly.",
      "Build responsive layouts for mobile-first visitors.",
      "Create scalable, SEO-friendly structures for future growth.",
    ],
    process: ["Discovery", "Wireframe and content", "UI development", "Responsive QA", "Launch support"],
    benefits: ["Higher credibility", "Better mobile experience", "Search-ready structure", "Easy expansion"],
  },
  {
    slug: "digital-marketing",
    icon: BarChart3,
    emoji: "📊",
    name: "Digital Marketing",
    category: "Ads & Performance",
    hero: "Performance-Driven Advertising Solutions",
    description:
      "Data-driven advertising strategies across Meta and Google platforms to generate real, measurable business results.",
    deliverables: ["Meta Ads", "Google Ads", "Strategy planning", "Campaign optimization", "Performance tracking & reporting"],
    bestFor: "Lead generation, launches, appointment campaigns, and growth pushes",
    challenge: [
      "Ad spends leak when targeting, creatives, and landing pages are disconnected.",
      "Campaigns without measurement cannot be improved reliably.",
      "Short-term boosts fade without structured optimization.",
    ],
    solution: [
      "Plan funnel-aware campaigns across Meta and Google.",
      "Track performance indicators clearly and consistently.",
      "Optimize creative, audience, and budget allocation over time.",
    ],
    process: ["Goal setting", "Campaign architecture", "Creative launch", "Performance tracking", "Optimization cycles"],
    benefits: ["Measured lead flow", "Sharper spend control", "Clear reporting", "Scalable campaign learning"],
  },
  {
    slug: "influencer-marketing",
    icon: Users,
    emoji: "🤝",
    name: "Influencer Marketing",
    category: "Distribution & Network",
    hero: "Amplify Your Brand Through Trusted Networks",
    description:
      "Access to trusted influencer networks and city pages to amplify your brand reach efficiently and authentically.",
    deliverables: [
      "Influencer collaborations",
      "City page promotions",
      "Negotiation & campaign management",
      "Budget optimization",
    ],
    bestFor: "Local launches, healthcare awareness, events, and brand reach",
    challenge: [
      "Influencer selection is risky without context and negotiation experience.",
      "Campaigns lose value when reach is not matched to location or audience.",
      "Managing creators takes time away from core operations.",
    ],
    solution: [
      "Match brands with relevant creators and city pages.",
      "Handle negotiation, campaign coordination, and publishing timelines.",
      "Optimize reach against budget and local audience goals.",
    ],
    process: ["Audience mapping", "Creator shortlisting", "Budget negotiation", "Campaign execution", "Reach reporting"],
    benefits: ["Authentic amplification", "Local audience reach", "Simpler creator management", "Budget-conscious promotion"],
  },
];

export const serviceIcons = { Megaphone, ShieldCheck, BadgeCheck, Share2 };
