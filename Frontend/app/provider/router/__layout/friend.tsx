import { ProtectRoute } from "@/shared/hooks/useProtectRoute";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__layout/friend")({
  component: RouteComponent,
  beforeLoad: () => ProtectRoute(),
});

function RouteComponent() {
  return <div>Hello /__layout/friend!</div>;
}
