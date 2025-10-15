import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__layout/friend/add")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>hello add</h1>
    </div>
  );
}
