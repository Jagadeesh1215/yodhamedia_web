"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

export function FAQAccordion() {
  const faqs = [
    [
      "How often should healthcare brands post?",
      "A structured weekly rhythm is better than random volume. Start with educational content, reputation posts, service explainers, and trust-building reels.",
    ],
    [
      "Can ORM and social media work together?",
      "Yes. Review workflows, Google updates, and social proof should feed the content system so trust signals stay visible everywhere.",
    ],
    [
      "When should ads be launched?",
      "Ads should begin after the offer, landing destination, tracking, and creative direction are clear. That keeps spend accountable.",
    ],
  ];
  return (
    <Accordion.Root type="single" collapsible className="mt-8 grid gap-3">
      {faqs.map(([question, answer]) => (
        <Accordion.Item
          key={question}
          value={question}
          className="panel rounded-xl"
        >
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-heading font-semibold text-[var(--text-primary)]">
              {question}
              <ChevronDown className="h-4 w-4 shrink-0 transition data-[state=open]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="px-5 pb-5 font-body text-sm leading-7 text-[var(--text-secondary)]">
            {answer}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
