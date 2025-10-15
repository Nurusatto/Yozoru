import { ProtectRoute } from "@/shared/hooks/useProtectRoute";
import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Friend } from "@/pages/friend";

export const Route = createFileRoute("/__layout/friend")({
  component: RouteComponent,
  beforeLoad: () => ProtectRoute(),
});

function RouteComponent() {
  return (
    <Friend>
      <Outlet />
    </Friend>
  );
}
