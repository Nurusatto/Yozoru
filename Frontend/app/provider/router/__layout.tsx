import { MainLayout } from "@/app/layouts/MainLayout";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import * as React from "react";

import { Header } from "@/widgets/Header/";
import { Footer } from "@/widgets/Footer/";
import { Aside } from "@/widgets/Aside";

export const Route = createFileRoute("/__layout")({
  component: MainLayoutRoute,
});

function MainLayoutRoute() {
  return (
    <React.Fragment>
      <MainLayout>
        <Header />

        <Outlet />

        <Aside />
        <Footer />
      </MainLayout>
    </React.Fragment>
  );
}
