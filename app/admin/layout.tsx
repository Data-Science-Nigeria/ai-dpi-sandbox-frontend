"use client";

import { useState, useEffect } from "react";
import { Header } from "../(sandbox)/components/header";
import AdminSidebar from "./components/admin-sidebar";
import { Providers } from "../auth/providers";
import { ProtectRoute } from "../auth/components/protect-route";
import { AdminProtectRoute } from "../auth/components/admin-protect-route";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      setSidebarOpen(isLargeScreen);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSidebarToggle = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(!sidebarOpen);
    }
  };

  return (
    <Providers>
      <ProtectRoute>
        <AdminProtectRoute>
          <div className="min-h-screen bg-background">
            <AdminSidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
            <Header />
            <main
              className={`pt-[4rem] sm:pt-[5rem] md:pt-[5.5rem] transition-all duration-300 ${sidebarOpen ? "ml-0 xs:ml-56 sm:ml-64" : "ml-12 xs:ml-12 sm:ml-16"}`}
            >
              <div className="p-2 xs:p-4 sm:p-6">{children}</div>
            </main>
          </div>
        </AdminProtectRoute>
      </ProtectRoute>
    </Providers>
  );
}
