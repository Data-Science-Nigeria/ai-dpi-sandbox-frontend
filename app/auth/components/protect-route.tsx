"use client";

import { getApiErrorMessage } from "@/app/utils/get-api-error-message";
import { authenticationGetApiV1AuthMeReadUserMe } from "@/client/sdk.gen";
import { client } from "@/client/client.gen";
import React, { useLayoutEffect, useState, useRef } from "react";
import { useAuthStore } from "@/app/store/use-auth-store";
import { useRouter, usePathname } from "next/navigation";

export const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const {
    setAuth,
    auth,
    isAuthenticated: checkAuth,
    clearAuth,
    setUser,
  } = useAuthStore();
  const isCheckingAuth = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  useLayoutEffect(() => {
    // Wait for Zustand to hydrate
    setIsHydrated(true);
  }, []);

  useLayoutEffect(() => {
    if (!isHydrated) return;

    const checkAuthStatus = async () => {
      if (isCheckingAuth.current) return;

      // If we have both token and user, check if user is on correct route
      if (checkAuth() && auth.user) {
        const userRole = auth.user.role;
        const isAdminRoute = pathname.startsWith("/admin");

        // Role-based route validation
        if (
          userRole === "admin" &&
          !isAdminRoute &&
          !pathname.startsWith("/auth")
        ) {
          router.push("/admin/dashboard");
          return;
        }

        if (userRole === "user" && isAdminRoute) {
          router.push("/introduction");
          return;
        }

        setIsAuthenticated(true);
        return;
      }

      // If we have a token but no user, fetch user data
      if (checkAuth() && !auth.user) {
        isCheckingAuth.current = true;

        try {
          client.setConfig({
            headers: {
              Authorization: `Bearer ${auth.access_token}`,
            },
          });

          const res = await authenticationGetApiV1AuthMeReadUserMe();

          if (res.error) {
            const errMsg = getApiErrorMessage(res.error);
            throw new Error(`API error ${errMsg}`);
          }

          const user = {
            email: res.data?.email || "",
            is_verified: res.data?.is_active,
            id: res.data?.id?.toString(),
            role: res.data?.role || "user",
          };

          setUser(user);

          // Role-based redirect after fetching user data
          const isAdminRoute = pathname.startsWith("/admin");

          if (
            user.role === "admin" &&
            !isAdminRoute &&
            !pathname.startsWith("/auth")
          ) {
            router.push("/admin/dashboard");
          } else if (user.role === "user" && isAdminRoute) {
            router.push("/introduction");
          }

          setIsAuthenticated(true);
        } catch (error) {
          console.error("Auth check failed:", error);
          clearAuth();
          router.push("/auth/signin");
        } finally {
          isCheckingAuth.current = false;
        }
      } else {
        // No token, redirect to signin
        router.push("/auth/signin");
      }
    };

    checkAuthStatus();
  }, [
    isHydrated,
    setAuth,
    setUser,
    auth.user,
    auth.access_token,
    checkAuth,
    clearAuth,
    router,
    pathname,
  ]);

  if (!isHydrated || isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <>{children}</> : null;
};
