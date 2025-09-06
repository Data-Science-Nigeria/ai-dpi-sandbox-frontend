"use client";

import { useAuthStore } from "@/app/store/use-auth-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin, auth } = useAuthStore();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const isLoggedIn = isAuthenticated();
    const userIsAdmin = isAdmin();

    if (isLoggedIn && auth.user) {
      if (userIsAdmin) {
        router.push("/admin/dashboard");
      } else {
        router.push("/introduction");
      }
    } else {
      setShouldRender(true);
    }
  }, [isHydrated, isAuthenticated, isAdmin, auth.user, router]);

  if (!isHydrated || !shouldRender) {
    return null;
  }

  return <>{children}</>;
};
