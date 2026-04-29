import {
  AboutSnippet,
  Advantage,
  BlogPreview,
  CTABanner,
  HeroSection,
  IndustriesSection,
  ProcessSteps,
  ServicesGrid,
  StatsSection,
  Testimonials,
  TrustBar,
  WhoWeHelp,
  WhyChoose,
} from "@/components/sections/HomeSections";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <WhoWeHelp />
      <ServicesGrid />
      <ProcessSteps />
      <Advantage />
      <StatsSection />
      <AboutSnippet />
      <IndustriesSection />
      <Testimonials />
      <WhyChoose />
      <BlogPreview />
      <CTABanner />
    </>
  );
}
