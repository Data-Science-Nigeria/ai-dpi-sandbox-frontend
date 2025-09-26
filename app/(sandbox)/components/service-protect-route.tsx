"use client";

import { useEffect, useState } from "react";
import { usePathname, notFound } from "next/navigation";
import { useAuthStore } from "@/app/store/use-auth-store";
import { hasServiceAccess } from "../introduction/types/access-control";

export const ServiceProtectRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const pathname = usePathname();
  const { auth } = useAuthStore();

  useEffect(() => {
    const checkServiceAccess = () => {
      // Extract service name from pathname
      const serviceMatch = pathname.match(/\/introduction\/services\/([^/]+)/);
      if (!serviceMatch) {
        setHasAccess(true);
        return;
      }

      const serviceName = serviceMatch[1];

      if (auth.user) {
        const access = hasServiceAccess(
          serviceName,
          Number(auth.user.id),
          auth.user.email,
          undefined
        );
        setHasAccess(access);
      } else {
        // Don't set access to false immediately when user is null
        // Let ProtectRoute handle the redirect
        setHasAccess(null);
      }
    };

    checkServiceAccess();
  }, [pathname, auth.user]);

  if (hasAccess === null) {
    return null;
  }

  if (hasAccess === false) {
    notFound();
  }

  return <>{children}</>;
};
