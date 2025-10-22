import { createFileRoute } from "@tanstack/react-router";

import { FriendsAdd } from "@/pages/friend";

export const Route = createFileRoute("/__layout/friend/add")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FriendsAdd />;
}
