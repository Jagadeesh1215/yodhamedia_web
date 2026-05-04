import { PageLoader } from "@/components/ui/PageLoader";

export default function Loading() {
  return (
    <PageLoader
      label="Editor"
      title="Loading the post editor"
      description="The edit form is waiting on the current record so changes stay safe and the layout remains stable."
    />
  );
}
