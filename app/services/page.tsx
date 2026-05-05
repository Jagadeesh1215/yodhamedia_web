import type { Metadata } from "next";
import { CTABanner, WhyChoose } from "@/components/sections/HomeSections";
import ServicesHero from "@/components/ui/ServicesHero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore YodhaMedia services across social media, ORM, branding, web design, digital marketing, and influencer marketing.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <WhyChoose />
      <CTABanner />
    </>
  );
}
