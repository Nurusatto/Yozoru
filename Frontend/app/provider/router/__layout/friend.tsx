import { ProtectRoute } from "@/shared/hooks/useProtectRoute";
import { createFileRoute } from "@tanstack/react-router";

import { Friend } from "@/pages/friend";

export const Route = createFileRoute("/__layout/friend")({
  component: RouteComponent,
  beforeLoad: () => ProtectRoute(),
});

function RouteComponent() {
  return <Friend />;
}
