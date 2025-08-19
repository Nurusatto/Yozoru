import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__layout/")({
  component: Home,
});

function Home() {
  return <div style={{ color: "white" }}>Hello index!</div>;
}
