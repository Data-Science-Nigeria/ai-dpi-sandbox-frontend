'use client';

import { getApiErrorMessage } from '@/app/utils/get-api-error-message';
import { readUserMeApiV1AuthMeGet } from '@/client/sdk.gen';
import React, { useLayoutEffect, useState } from 'react';
import { useAuthStore } from '@/app/store/use-auth-store';

export const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { setAuth } = useAuthStore();

  useLayoutEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await readUserMeApiV1AuthMeGet();

        console.log(res);

        if (res.error) {
          const errMsg = getApiErrorMessage(res.error);
          throw new Error(`API error ${errMsg}`);
        }

        setAuth({
          user: {
            email: res.data?.email || '',
            is_verified: res.data?.is_verified,
            id: res?.data?.id,
          },
        });

        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
        window.location.href = '/auth/signin';
      }
    };

    checkAuth();
  }, [setAuth]);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <>{children}</> : null;
};
