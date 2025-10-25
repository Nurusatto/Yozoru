import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { routeTree } from "./provider/router/routeTree.gen";

import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import "./style/index.scss";

import { AppInit } from "./provider/init/AppInit";
import { SocketProvider } from "./provider/init/Socket";
import { ToastContainer } from "react-toastify";
import { SocketNotifications } from "./provider/init/SocketNotifications";

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
      <SocketProvider>
        <SocketNotifications />
        <AppInit />
        <RouterProvider router={router} />
        <TanStackRouterDevtools router={router} />
        <ToastContainer position="top-right" theme="dark" />
      </SocketProvider>
    </StrictMode>
  </QueryClientProvider>
);
