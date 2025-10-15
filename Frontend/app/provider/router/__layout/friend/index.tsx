import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__layout/friend/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello index!</div>;
}
