import type { Metadata } from "next";
import { CTABanner } from "@/components/sections/HomeSections";
import BusinessHubView from "@/components/sections/BusinessHubView";

export const metadata: Metadata = {
  title: "Business Hub | YodhaMedia",
  description:
    "YodhaMedia business hub network for local visibility and distribution.",
};

export default function BusinessHubPage() {
  return (
    <>
      <BusinessHubView />
      <CTABanner />
    </>
  );
}
