import { createFileRoute } from "@tanstack/react-router";
import { MyProfile } from "@/pages/myProfile";
import { ProtectRoute } from "@/shared/hooks/useProtectRoute";

export const Route = createFileRoute("/__layout/profile")({
  component: RouteComponent,
  beforeLoad: () => ProtectRoute(),
});

function RouteComponent() {
  return <MyProfile />;
}
