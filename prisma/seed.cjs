const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const demoCloudinaryImage =
  "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_1200/sample.jpg";

function buildConnectionString(raw) {
  if (raw.includes("sslmode=")) {
    return raw.replace(/sslmode=[^&]+/i, "sslmode=no-verify");
  }

  return `${raw}${raw.includes("?") ? "&" : "?"}sslmode=no-verify`;
}

function daysAgo(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

function dateLabel(date) {
  return date.toLocaleDateString("en-IN", { dateStyle: "long" });
}

function blogPost({
  slug,
  category,
  title,
  excerpt,
  icon,
  takeaway,
  headingOne,
  bodyOne,
  headingTwo,
  bodyTwo,
  daysAgoCount,
  tags,
  featured = false,
  coverImage = demoCloudinaryImage,
  coverImagePublicId = "sample",
}) {
  const publishedAt = daysAgo(daysAgoCount);

  return {
    slug,
    category,
    title,
    excerpt,
    date: dateLabel(publishedAt),
    readTime: `${Math.max(
      3,
      Math.round((bodyOne.length + bodyTwo.length) / 240),
    )} min read`,
    icon,
    tags,
    takeaway,
    content: [
      { heading: headingOne, body: bodyOne },
      { heading: headingTwo, body: bodyTwo },
    ],
    author: "YodhaMedia Editorial",
    coverImage,
    coverImagePublicId,
    status: "published",
    featured,
    publishedAt,
    seoTitle: title,
    seoDescription: excerpt,
  };
}

const blogPosts = [
  blogPost({
    slug: "hospital-content-systems",
    category: "Healthcare Marketing",
    title: "How Hospitals Turn Content Into a Trust System",
    excerpt:
      "A practical look at building repeatable content that supports trust, clarity, and appointments.",
    icon: "🏥",
    takeaway:
      "Hospitals grow faster when educational content, reputation signals, and booking intent all move together.",
    headingOne: "Trust Is the Real KPI",
    bodyOne: [
      "Patients respond to clear proof of competence, empathy, and consistency.",
      "A content system gives the team one repeatable voice instead of disconnected posts.",
    ],
    headingTwo: "What To Publish Every Month",
    bodyTwo: [
      "Mix doctor explainers, patient education, clinic updates, and local discovery content.",
      "The goal is to feel active before the first call, not just to post more often.",
    ],
    daysAgoCount: 1,
    tags: ["Hospitals", "Content", "Trust"],
    featured: true,
  }),
  blogPost({
    slug: "google-business-profile-clinics",
    category: "Local SEO & Google Business",
    title: "Google Business Profile Habits Clinics Should Not Ignore",
    excerpt:
      "A simple weekly operating routine that improves discovery, review quality, and patient confidence.",
    icon: "⭐",
    takeaway:
      "A clinic profile should feel alive, accurate, and easy to trust.",
    headingOne: "Your Profile Is a Front Desk",
    bodyOne: [
      "Patients compare clinics from search results long before they visit a website.",
      "Photos, service lists, timings, and recent posts shape the first impression.",
    ],
    headingTwo: "Small Habits Compound Quickly",
    bodyTwo: [
      "Weekly updates and fresh media make the profile feel current.",
      "Strong local SEO is operational, not just technical.",
    ],
    daysAgoCount: 2,
    tags: ["Local SEO", "ORM", "Clinics"],
  }),
  blogPost({
    slug: "local-business-ads-framework",
    category: "Digital Marketing (Ads)",
    title: "A Clean Ad Framework for Local Businesses",
    excerpt:
      "How to decide what ads should do before choosing a platform, budget, or creative style.",
    icon: "📊",
    takeaway:
      "Ads work best when every rupee has one job: awareness, enquiry, booking, or repeat engagement.",
    headingOne: "Start With Intent, Not Platforms",
    bodyOne: [
      "The first question is what the customer knows and what action they should take next.",
      "Platform choice follows intent, geography, budget, and creative readiness.",
    ],
    headingTwo: "Measure What Actually Matters",
    bodyTwo: [
      "Clicks matter only when the resulting enquiries match the business goal.",
      "Good reporting helps the next decision instead of decorating a dashboard.",
    ],
    daysAgoCount: 3,
    tags: ["Meta Ads", "Google Ads", "Leads"],
  }),
  blogPost({
    slug: "brand-website-first-impression",
    category: "Website & Branding",
    title: "Why the First 5 Seconds on a Website Decide Everything",
    excerpt:
      "A practical guide to creating a site that feels trustworthy before the user scrolls.",
    icon: "✦",
    takeaway:
      "Your homepage should answer who you help, why you matter, and what the user should do next.",
    headingOne: "Clarity Beats Cleverness",
    bodyOne: [
      "Visitors want to understand your business instantly.",
      "Strong typography, consistent spacing, and a direct message reduce doubt.",
    ],
    headingTwo: "The Page Must Point Forward",
    bodyTwo: [
      "The next step should always be obvious.",
      "A good site does not just look polished, it moves attention forward.",
    ],
    daysAgoCount: 4,
    tags: ["Website", "Branding", "Conversion"],
  }),
  blogPost({
    slug: "social-media-consistency",
    category: "Social Media Strategy",
    title: "Consistency Wins More Than Viral Content",
    excerpt:
      "Why a stable posting rhythm and message hierarchy beat random bursts of attention.",
    icon: "🔁",
    takeaway:
      "Consistency is a brand asset because it trains people to expect you.",
    headingOne: "Randomness Confuses the Audience",
    bodyOne: [
      "A feed with no structure looks active for a day and forgettable for a month.",
      "A simple content map keeps messaging coherent across channels.",
    ],
    headingTwo: "Use a Rhythm, Not a Guess",
    bodyTwo: [
      "Pick a small number of repeatable categories and stick to them.",
      "Consistency compounds because it reduces decision fatigue.",
    ],
    daysAgoCount: 5,
    tags: ["Social Media", "Strategy", "Brand"],
  }),
  blogPost({
    slug: "doctor-content-playbook",
    category: "Healthcare Marketing",
    title: "The Doctor Content Playbook for Real Authority",
    excerpt:
      "A content structure that helps doctors communicate expertise without sounding promotional.",
    icon: "🩺",
    takeaway:
      "Authority grows when expertise is translated into simple explanations.",
    headingOne: "Translate Expertise Into Plain Language",
    bodyOne: [
      "Patients trust the doctor who explains the condition clearly.",
      "Educational reels and short FAQs lower anxiety.",
    ],
    headingTwo: "Build Reusable Themes",
    bodyTwo: [
      "Create a library of recurring topics so the team is not reinventing ideas.",
      "Effective doctor content feels human, useful, and calm.",
    ],
    daysAgoCount: 6,
    tags: ["Doctors", "Education", "Authority"],
  }),
  blogPost({
    slug: "review-management-system",
    category: "Local SEO & Google Business",
    title: "How Review Management Becomes a Growth Channel",
    excerpt:
      "A practical way to collect, respond to, and learn from reviews without making it feel robotic.",
    icon: "📝",
    takeaway:
      "Reviews are proof that your operations create outcomes people want to repeat.",
    headingOne: "Reviews Need a Workflow",
    bodyOne: [
      "Ask for reviews at the right moment and make the request respectful.",
      "A response system matters because people watch how you handle feedback.",
    ],
    headingTwo: "Track Patterns, Not Just Stars",
    bodyTwo: [
      "The language in reviews tells you what your audience values most.",
      "Use that language in your website, ads, and sales conversations.",
    ],
    daysAgoCount: 7,
    tags: ["Reviews", "Local SEO", "ORM"],
  }),
  blogPost({
    slug: "landing-page-structure",
    category: "Website & Branding",
    title: "A Better Landing Page Structure for Service Businesses",
    excerpt:
      "How to create a page that answers intent, builds trust, and makes the next action obvious.",
    icon: "🧩",
    takeaway:
      "Landing pages convert when they remove uncertainty instead of adding more content.",
    headingOne: "One Page, One Decision",
    bodyOne: [
      "If the page has too many competing ideas, users hesitate.",
      "A focused landing page keeps the promise, proof, and call to action aligned.",
    ],
    headingTwo: "Structure Builds Confidence",
    bodyTwo: [
      "Use social proof, service explanation, and a visible next step in the same flow.",
      "Confidence grows when the page feels easy to read and easy to act on.",
    ],
    daysAgoCount: 8,
    tags: ["Landing Pages", "Conversion", "UX"],
  }),
  blogPost({
    slug: "short-form-video-ops",
    category: "Social Media Strategy",
    title: "The Short-Form Video Process Teams Can Actually Repeat",
    excerpt:
      "A workflow for turning one content idea into multiple usable clips without extra chaos.",
    icon: "🎬",
    takeaway:
      "Short-form video performs best when the process is smaller than the ego behind it.",
    headingOne: "Batch the Inputs",
    bodyOne: [
      "Plan the hook, the supporting point, and the call to action before you record.",
      "One shoot can become several posts if the team captures variations on purpose.",
    ],
    headingTwo: "Keep Editing Lightweight",
    bodyTwo: [
      "Simple edits, clean captions, and a consistent style make the content easier to maintain.",
      "The win is repeatability, not cinematic complexity.",
    ],
    daysAgoCount: 9,
    tags: ["Video", "Reels", "Production"],
  }),
  blogPost({
    slug: "multi-location-marketing",
    category: "Healthcare Marketing",
    title: "Marketing a Multi-Location Brand Without Fragmenting It",
    excerpt:
      "How to keep messaging consistent while still letting each location feel local and relevant.",
    icon: "🗺️",
    takeaway:
      "The brand stays stronger when each location operates from one shared system.",
    headingOne: "Shared Rules, Local Detail",
    bodyOne: [
      "The core message should stay the same across locations.",
      "Local offers, testimonials, and contact points can adapt.",
    ],
    headingTwo: "Centralize the System",
    bodyTwo: [
      "Templates, approvals, and reporting reduce drift between locations.",
      "A multi-location brand scales faster when the operating model is shared.",
    ],
    daysAgoCount: 10,
    tags: ["Multi-location", "Healthcare", "Brand"],
  }),
  blogPost({
    slug: "website-speed-trust",
    category: "Website & Branding",
    title: "Fast Websites Feel More Trustworthy",
    excerpt:
      "Why performance is a brand signal and not just a technical metric.",
    icon: "⚡",
    takeaway:
      "Speed shapes trust because it tells the visitor the business cares about time.",
    headingOne: "Performance Changes Perception",
    bodyOne: [
      "Slow pages make even a strong business feel less polished.",
      "A faster site reduces friction and keeps users engaged.",
    ],
    headingTwo: "Optimizing Speed Is Brand Work",
    bodyTwo: [
      "Compress media, simplify layouts, and audit scripts regularly.",
      "The cleaner the experience feels, the easier it is to trust.",
    ],
    daysAgoCount: 11,
    tags: ["Performance", "UX", "Trust"],
  }),
];

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: buildConnectionString(process.env.DATABASE_URL || ""),
  }),
});

async function main() {
  for (const post of blogPosts) {
    // Demo content lives only in Prisma so the app has real blog records without any file-backed runtime data.
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      create: post,
      update: {},
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
