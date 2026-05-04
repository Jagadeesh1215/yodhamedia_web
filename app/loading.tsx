import { PageLoader } from "@/components/ui/PageLoader";

export default function Loading() {
  return (
    <PageLoader
      label="Loading"
      title="Preparing the experience"
      description="The page is being assembled. This loader keeps navigation polished while the route data resolves."
    />
  );
}
