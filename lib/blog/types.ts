export type BlogSection = {
  heading: string;
  body: string[];
};

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
  content: BlogSection[];
  author?: string;
  coverImage?: string;
  coverImagePublicId?: string;
  status?: "published" | "draft";
  featured?: boolean;
  publishedAt?: string;
  updatedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export const blogCategories = [
  "All",
  "Healthcare Marketing",
  "Social Media Strategy",
  "Local SEO & Google Business",
  "Digital Marketing (Ads)",
  "Influencer Marketing",
  "Website & Branding",
];
