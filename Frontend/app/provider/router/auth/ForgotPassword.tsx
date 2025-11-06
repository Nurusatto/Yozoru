import { AuthLayout } from "@/app/layouts/authLayout";
import { ResetPassword } from "@/features/ResetPassword";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/ForgotPassword")({
  component: ForgotPassword,
});

function ForgotPassword() {
  return (
    <>
      <AuthLayout>
        <ResetPassword />
      </AuthLayout>
    </>
  );
}
