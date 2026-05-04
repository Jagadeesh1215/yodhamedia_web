import { PageLoader } from "@/components/ui/PageLoader";

export default function Loading() {
  return (
    <PageLoader
      label="Leads"
      title="Loading inbox"
      description="The lead inbox is pulling submissions from the database so the admin can move through the queue without a jarring pause."
    />
  );
}
