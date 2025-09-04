"use client";

import { getApiErrorMessage } from "@/app/utils/get-api-error-message";
import { authGetApiV1AuthMeGetCurrentUserProfile } from "@/client/sdk.gen";
import React, { useLayoutEffect, useState } from "react";
import { useAuthStore } from "@/app/store/use-auth-store";

export const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { setAuth } = useAuthStore();

  useLayoutEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authGetApiV1AuthMeGetCurrentUserProfile();

        console.log(res);

        if (res.error) {
          const errMsg = getApiErrorMessage(res.error);
          throw new Error(`API error ${errMsg}`);
        }

        const userData = res.data as any;
        setAuth({
          user: {
            email: userData?.email || "",
            is_verified: userData?.is_verified,
            id: userData?.id,
          },
        });

        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
        window.location.href = "/auth/signin";
      }
    };

    checkAuth();
  }, [setAuth]);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <>{children}</> : null;
};
