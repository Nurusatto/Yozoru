import { SettingsSecurity } from "@/pages/settings/ui/Security";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__layout/settings/Security")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SettingsSecurity />;
}
