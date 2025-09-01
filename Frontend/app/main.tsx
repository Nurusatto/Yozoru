import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { routeTree } from "./provider/router/routeTree.gen";

import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import "./style/index.scss";
import { AppInit } from "./provider/init/AppInit";

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <AppInit />
      <RouterProvider router={router} />
      <TanStackRouterDevtools router={router} />
    </StrictMode>
  </QueryClientProvider>
);
