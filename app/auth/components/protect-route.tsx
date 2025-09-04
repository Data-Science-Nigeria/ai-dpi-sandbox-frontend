"use client";

import { getApiErrorMessage } from "@/app/utils/get-api-error-message";
import { authGetApiV1AuthMeGetCurrentUserProfile } from "@/client/sdk.gen";
import { client } from "@/client/client.gen";
import React, { useLayoutEffect, useState, useRef } from "react";
import { useAuthStore } from "@/app/store/use-auth-store";

export const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const { setAuth, auth, isAuthenticated: checkAuth } = useAuthStore();
  const isCheckingAuth = useRef(false);

  useLayoutEffect(() => {
    // Wait for Zustand to hydrate
    setIsHydrated(true);
  }, []);

  useLayoutEffect(() => {
    if (!isHydrated) return;

    const checkAuthStatus = async () => {
      if (isCheckingAuth.current) return;

      // Check if user is already authenticated from store
      if (checkAuth() && auth.user) {
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

          const res = await authGetApiV1AuthMeGetCurrentUserProfile();

          if (res.error) {
            const errMsg = getApiErrorMessage(res.error);
            throw new Error(`API error ${errMsg}`);
          }

          const userData = res.data as {
            email?: string;
            is_verified?: boolean;
            id?: string;
          };
          setAuth({
            user: {
              email: userData?.email || "",
              is_verified: userData?.is_verified,
              id: userData?.id,
            },
          });

          setIsAuthenticated(true);
        } catch {
          window.location.href = "/auth/signin";
        } finally {
          isCheckingAuth.current = false;
        }
      } else {
        // No token, redirect to signin
        window.location.href = "/auth/signin";
      }
    };

    checkAuthStatus();
  }, [isHydrated, setAuth, auth.user, auth.access_token, checkAuth]);

  if (!isHydrated || isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <>{children}</> : null;
};
