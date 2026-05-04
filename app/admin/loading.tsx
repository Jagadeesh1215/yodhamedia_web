import { PageLoader } from "@/components/ui/PageLoader";

export default function Loading() {
  return (
    <PageLoader
      label="Admin"
      title="Opening the control room"
      description="The admin shell is loading server data. This keeps the workspace feeling intentional while the dashboard hydrates."
    />
  );
}
