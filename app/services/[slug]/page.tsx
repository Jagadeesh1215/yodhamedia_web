// app/services/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/lib/constants/services";
import ServiceDetailClient from "@/components/ui/ServiceDetailView";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = services.find((item) => item.slug === params.slug);
  if (!service) return {};
  return {
    title: `${service.name} | YodhaMedia`,
    description: service.description,
  };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = services.find((item) => item.slug === params.slug);
  if (!service) notFound();

  // Only pass what's needed - no icon
  const serializableService = {
    slug: service.slug,
    emoji: service.emoji,
    name: service.name,
    category: service.category,
    hero: service.hero,
    description: service.description,
    deliverables: service.deliverables,
    bestFor: service.bestFor,
    challenge: service.challenge,
    solution: service.solution,
    process: service.process,
    benefits: service.benefits,
  };

  return <ServiceDetailClient service={serializableService} />;
}
