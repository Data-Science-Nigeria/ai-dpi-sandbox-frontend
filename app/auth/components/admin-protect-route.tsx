"use client";

import { useAuthStore } from "@/app/store/use-auth-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const AdminProtectRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { auth, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/signin");
      return;
    }

    if (auth.user?.role !== "admin") {
      router.push("/introduction");
      return;
    }

    setIsAuthorized(true);
  }, [auth.user, isAuthenticated, router]);

  if (isAuthorized === null) {
    return null;
  }

  return isAuthorized ? <>{children}</> : null;
};
