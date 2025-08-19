import { createFileRoute } from "@tanstack/react-router";
import { useAuthStore } from "../../store/authStore";
import { useCheckAuth } from "@/shared/hooks/useCheckAuth";

export const Route = createFileRoute("/__layout/message")({
  component: Message,
});

function Message() {
  useCheckAuth(); // просто вызываем — он сам обновит стейт
  const user = useAuthStore((state) => state.user);

  if (!user) return null; // или лоадер
  return <div>Hello /message!</div>;
}
