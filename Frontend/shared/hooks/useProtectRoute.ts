import { redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/app/provider/store/authStore";

export async function ProtectRoute() {
  const { token, isInitialized } = useAuthStore.getState();

  if (!isInitialized) {
    return true;
  }

  if (!token) {
    throw redirect({ to: "/auth/login" });
  }

  return true;
}
