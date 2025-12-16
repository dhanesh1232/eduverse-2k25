"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import * as React from "react";
import { AppSidebar } from "@/components/pages/dash/appSidebar";
import { AppHeader } from "@/components/pages/dash/appHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userApi = React.useCallback(async () => {
    const res = await fetch("/api/user");
    const data = await res.json();
    console.log(data);
  }, []);

  React.useEffect(() => {
    userApi();
  }, [userApi]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AppHeader />
        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
