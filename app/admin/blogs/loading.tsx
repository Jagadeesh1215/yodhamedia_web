import { PageLoader } from "@/components/ui/PageLoader";

export default function Loading() {
  return (
    <PageLoader
      label="Library"
      title="Loading blog tools"
      description="The content library is resolving the current posts and actions so the editor never drops the user into a blank state."
    />
  );
}
