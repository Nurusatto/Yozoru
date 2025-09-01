import { checkState } from "@/shared/hooks/checkState";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => {
    checkState();
    return <Outlet />;
  },
});
