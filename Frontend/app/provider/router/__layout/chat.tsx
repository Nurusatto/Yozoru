import { ProtectRoute } from "@/shared/hooks/useProtectRoute";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__layout/chat")({
  beforeLoad: () => ProtectRoute(),
  component: Message,
});

function Message() {
  return (
    <main>
      <div>Hello /message!</div>
    </main>
  );
}
