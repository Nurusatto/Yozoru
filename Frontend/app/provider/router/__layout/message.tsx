import { ProtectRoute } from "@/shared/hooks/useProtectRoute";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__layout/message")({
  beforeLoad: () => ProtectRoute(),
  component: Message,
});

function Message() {
  return <div>Hello /message!</div>;
}
