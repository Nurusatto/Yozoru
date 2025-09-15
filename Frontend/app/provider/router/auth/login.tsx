import { AuthLayout } from "@/app/layouts/authLayout";

import { Auth } from "@/features/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  return (
    <AuthLayout>
      <Auth />
    </AuthLayout>
  );
}
