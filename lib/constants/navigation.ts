import { services } from "./services";

export const navItems = [
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    dropdown: services.map((service) => ({
      label: service.name,
      href: `/services/${service.slug}`,
      icon: service.emoji,
    })),
  },
  { label: "Business Hub", href: "/business-hub" },
  { label: "Our Work", href: "/our-work" },
  { label: "Blog", href: "/blog" },
];
