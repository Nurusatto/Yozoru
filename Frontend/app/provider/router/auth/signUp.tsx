import { AuthLayout } from "@/app/layouts/authLayout";
import { SignUp } from "@/features/signUp";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signUp")({
  component: SignUpComponent,
});

function SignUpComponent() {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
}
