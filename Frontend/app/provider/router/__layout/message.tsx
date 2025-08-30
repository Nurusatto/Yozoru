import { createFileRoute } from "@tanstack/react-router";

import { ProtectRoute } from "@/shared/hooks/useProtectRoute";

export const Route = createFileRoute("/__layout/message")({
  beforeLoad: () => ProtectRoute(),
  component: Message,
});

function Message() {
  return <div>Hello /message!</div>;
}
