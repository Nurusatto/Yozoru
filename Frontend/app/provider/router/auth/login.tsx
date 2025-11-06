import { AuthLayout } from "@/app/layouts/authLayout";

import { Auth } from "@/features/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  component: Login,
  validateSearch: (search) => {
    return {
      reset: search.reset as string | undefined,
      message: search.message as string | undefined,
    };
  },
});

function Login() {
  return (
    <AuthLayout>
      <Auth />
    </AuthLayout>
  );
}
