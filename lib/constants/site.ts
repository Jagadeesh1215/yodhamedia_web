import {
  Stethoscope,
  PlusSquare,
  UserCheck,
  Briefcase,
  ShoppingBag,
  MapPin,
} from "lucide-react";

export const site = {
  name: "YodhaMedia LLP",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "info@yodhamedia.com",
  website: "www.yodhamedia.com",
  location: "Your City, India",
  url: "https://yodhamedia.com",
  description:
    "We help hospitals, doctors, and businesses build strong online presence through social media, ORM, web design, and digital marketing.",
};

export const stats = [
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 100, suffix: "+", label: "Projects Delivered" },
  { value: 5, suffix: "+", label: "Industries Served" },
  { value: "Infinity", suffix: "", label: "Long-term Partnerships" },
] as const;

export const industries = [
  {
    icon: Stethoscope,
    label: "Hospitals",
    desc: "Digital systems for healthcare.",
  },
  {
    icon: PlusSquare,
    label: "Clinics",
    desc: "Specialized medical practices.",
  },
  {
    icon: UserCheck,
    label: "Professionals",
    desc: "Personal branding for experts.",
  },
  {
    icon: Briefcase,
    label: "Service Businesses",
    desc: "Lead gen for agencies.",
  },
  {
    icon: ShoppingBag,
    label: "Product Brands",
    desc: "E-commerce growth engine.",
  },
  { icon: MapPin, label: "Local Businesses", desc: "Dominating local search." },
];

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location,
    addressCountry: "IN",
  },
  url: site.url,
  sameAs: [
    "https://facebook.com/yodhamedia",
    "https://instagram.com/yodhamedia",
    "https://linkedin.com/company/yodhamedia",
    "https://youtube.com/@yodhamedia",
  ],
};
