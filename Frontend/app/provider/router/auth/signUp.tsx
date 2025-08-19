import { AuthLayout } from "@/app/layouts/authLayout";
import { SignUpWidget } from "@/widgets/SignUpWidget";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signUp")({
  component: SignUp,
});

function SignUp() {
  return (
    <AuthLayout>
      <SignUpWidget />
    </AuthLayout>
  );
}
