import { MobileMenu } from "@/pages/mobileMenu";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__layout/mobileMenu")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MobileMenu />;
}
