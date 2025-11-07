import { SettingsMain } from "@/pages/settings/ui/main";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__layout/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SettingsMain />;
}
