import { createFileRoute } from "@tanstack/react-router";

import { Friends } from "@/pages/friend";

export const Route = createFileRoute("/__layout/friend/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Friends />;
}
