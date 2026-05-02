import {
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
import { getPublishedBlogPosts } from "@/lib/blog/store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const blogPosts = await getPublishedBlogPosts();

  return (
    <>
      <HeroSection />
      <TrustBar />
      <WhoWeHelp />
      <ServicesGrid />
      <ProcessSteps />
      <Advantage />
      <StatsSection />
      <IndustriesSection />
      <Testimonials />
      <WhyChoose />
      <BlogPreview posts={blogPosts} />
      <CTABanner />
    </>
  );
}
