"use client";

import { useAuthStore } from "@/app/store/use-auth-store";
import { client } from "@/client/client.gen";
import { useEffect } from "react";

export const AuthInitializer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { auth } = useAuthStore();

  useEffect(() => {
    // Set client config if token exists
    if (auth.access_token) {
      client.setConfig({
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      });
    }
  }, [auth.access_token]);

  return <>{children}</>;
};
