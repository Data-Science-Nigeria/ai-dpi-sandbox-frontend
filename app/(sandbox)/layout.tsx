"use client";

import { useState, useEffect } from "react";
import { Header } from "./components/header";
import Sidebar from "./components/sidebar";
import { Providers } from "../auth/providers";
import { ProtectRoute } from "../auth/components/protect-route";
import { UserProtectRoute } from "../auth/components/user-protect-route";
import { ServiceProtectRoute } from "./components/service-protect-route";
import { ScrollToTop } from "./introduction/services/components/scroll-to-top";

export default function SandboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (typeof window === "undefined") return;
      const isLargeScreen = window.innerWidth >= 1024;
      setSidebarOpen(isLargeScreen);
    };

    checkScreenSize();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", checkScreenSize);
      return () => window.removeEventListener("resize", checkScreenSize);
    }
  }, []);

  const handleSidebarToggle = () => {
    // Only allow manual toggle on mobile screens
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setSidebarOpen(!sidebarOpen);
    }
  };

  return (
    <Providers>
      <ProtectRoute>
        <UserProtectRoute>
          <div className="min-h-screen bg-background">
            <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
            <Header />
            <main
              className={`pt-[4rem] sm:pt-[5rem] md:pt-[5.5rem] transition-all duration-300 ${sidebarOpen ? "ml-0 xs:ml-56 sm:ml-64" : "ml-12 xs:ml-12 sm:ml-16"}`}
            >
              <div className="p-4 xs:p-4 sm:p-6">
                <ServiceProtectRoute>{children}</ServiceProtectRoute>
              </div>
            </main>
            <ScrollToTop />
          </div>
        </UserProtectRoute>
      </ProtectRoute>
    </Providers>
  );
}
