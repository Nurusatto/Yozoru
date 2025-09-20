import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__layout/")({
  component: Home,
});

function Home() {
  return (
    <main>
      hello index
      <h1>hello index</h1>
    </main>
  );
}
