import { ProtectRoute } from "@/shared/hooks/useProtectRoute";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__layout/settings")({
  component: RouteComponent,
  beforeLoad: () => ProtectRoute(),
});

function RouteComponent() {
  return <div>Hello !</div>;
}
