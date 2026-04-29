export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  icon: string;
  tags: string[];
  takeaway: string;
  content: { heading: string; body: string[] }[];
};

export const categories = [
  "All",
  "Healthcare Marketing",
  "Social Media Strategy",
  "Local SEO & Google Business",
  "Digital Marketing (Ads)",
  "Influencer Marketing",
  "Website & Branding",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "hospital-social-media-system",
    category: "Healthcare Marketing",
    title: "Why Hospitals Need a Structured Social Media System",
    excerpt: "A practical framework for turning inconsistent posting into trusted patient communication.",
    date: "April 12, 2026",
    readTime: "5 min read",
    icon: "🏥",
    tags: ["Hospitals", "Content", "Trust"],
    takeaway:
      "Hospitals grow digital trust fastest when education, reputation, and appointment intent are planned as one system.",
    content: [
      {
        heading: "Trust Comes Before Conversion",
        body: [
          "Healthcare audiences do not respond to generic promotional content. They look for clarity, authority, empathy, and proof that the provider is consistent.",
          "A structured content calendar helps every department, doctor, and campaign communicate with one voice.",
        ],
      },
      {
        heading: "What the System Should Include",
        body: [
          "Monthly health awareness themes, doctor-led reels, patient-friendly explainers, testimonial workflows, Google profile updates, and lead-ready calls to action.",
          "The goal is not volume alone. The goal is repeatable trust signals across every digital touchpoint.",
        ],
      },
    ],
  },
  {
    slug: "google-business-profile-clinic",
    category: "Local SEO & Google Business",
    title: "Google Business Profile Basics for Clinics",
    excerpt: "How clinics can improve local discovery, ratings, and patient confidence with routine profile care.",
    date: "April 18, 2026",
    readTime: "4 min read",
    icon: "⭐",
    tags: ["ORM", "Local SEO", "Clinics"],
    takeaway:
      "A clinic profile should be treated like a front desk: accurate, responsive, and updated every week.",
    content: [
      {
        heading: "Your Profile Is a Trust Surface",
        body: [
          "Patients often compare clinics directly from search results. Photos, services, timings, ratings, and recent posts shape their first impression.",
          "Incomplete profiles make even strong clinics appear less active or less reliable.",
        ],
      },
      {
        heading: "Small Habits Compound",
        body: [
          "Weekly posts, review responses, fresh photos, and service updates create a clear signal that the clinic is active and approachable.",
          "ORM becomes stronger when it is operational, not reactive.",
        ],
      },
    ],
  },
  {
    slug: "ads-for-local-businesses",
    category: "Digital Marketing (Ads)",
    title: "How Local Businesses Should Think About Digital Ads",
    excerpt: "A simple way to connect ad goals, landing pages, and measurable enquiry quality.",
    date: "April 23, 2026",
    readTime: "6 min read",
    icon: "📊",
    tags: ["Meta Ads", "Google Ads", "Leads"],
    takeaway:
      "Ads perform best when every rupee has a clear job: awareness, enquiry, booking, or repeat engagement.",
    content: [
      {
        heading: "Do Not Start With the Platform",
        body: [
          "The first question is not Meta or Google. The first question is what the customer already knows and what action they should take next.",
          "Platform choice follows intent, geography, budget, and creative readiness.",
        ],
      },
      {
        heading: "Measure What Matters",
        body: [
          "Reach, clicks, and leads need context. A campaign is useful when the enquiries match the business goal.",
          "Reporting should help the next decision, not just decorate a dashboard.",
        ],
      },
    ],
  },
];
