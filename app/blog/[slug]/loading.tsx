import { PageLoader } from "@/components/ui/PageLoader";

export default function Loading() {
  return (
    <PageLoader
      label="Article"
      title="Opening the post"
      description="The article content is loading. A route-level skeleton keeps the reading experience steady while the data fetch completes."
    />
  );
}
