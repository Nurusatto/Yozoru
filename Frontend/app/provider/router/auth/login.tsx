import { AuthLayout } from "@/app/layouts/authLayout";

import { AuthPage } from "@/pages/AuthPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  return (
    <AuthLayout>
      <AuthPage />
    </AuthLayout>
  );
}
