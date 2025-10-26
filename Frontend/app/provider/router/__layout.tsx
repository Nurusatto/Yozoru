import { MainLayout } from "@/app/layouts/MainLayout";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import * as React from "react";

import { Header } from "@/widgets/Header/";
import { Footer } from "@/widgets/Footer/";
import { Aside } from "@/widgets/Aside/";
import { ScrollToTop } from "../init/ScrollToTop";

export const Route = createFileRoute("/__layout")({
  component: MainLayoutRoute,
});

function MainLayoutRoute() {
  return (
    <React.Fragment>
      <MainLayout>
        <ScrollToTop />
        <Header />

        <Outlet />

        <Aside />
        <Footer />
      </MainLayout>
    </React.Fragment>
  );
}
