"use client";

import { getApiErrorMessage } from "@/app/utils/get-api-error-message";
import { authGetApiV1AuthMeGetCurrentUserProfile } from "@/client/sdk.gen";
import React, { useLayoutEffect, useState, useRef } from "react";
import { useAuthStore } from "@/app/store/use-auth-store";

export const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { setAuth, auth } = useAuthStore();
  const isCheckingAuth = useRef(false);

  useLayoutEffect(() => {
    const checkAuth = async () => {
      if (isCheckingAuth.current) return;

      // If user already exists in store, skip API call
      if (auth.user) {
        setIsAuthenticated(true);
        return;
      }

      isCheckingAuth.current = true;

      try {
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
    };

    checkAuth();
  }, [setAuth, auth.user]);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <>{children}</> : null;
};
