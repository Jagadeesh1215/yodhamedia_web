import { PageLoader } from "@/components/ui/PageLoader";

export default function Loading() {
  return (
    <PageLoader
      label="Blog"
      title="Loading insights"
      description="Fetching the blog archive and featured article so the journal page can appear without a flash of blank content."
    />
  );
}
