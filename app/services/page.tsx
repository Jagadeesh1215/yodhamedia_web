import type { Metadata } from "next";
import Link from "next/link";
import {
  CTABanner,
  ProcessSteps,
  WhyChoose,
} from "@/components/sections/HomeSections";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/constants/services";
import ServicesHero from "@/components/ui/ServicesHero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore YodhaMedia LLP services across social media, ORM, branding, web design, digital marketing, and influencer marketing.",
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
