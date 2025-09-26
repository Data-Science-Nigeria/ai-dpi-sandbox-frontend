"use client";

import { useEffect, useState } from "react";
import { usePathname, notFound } from "next/navigation";
import { authenticationGetApiV1AuthMeReadUserMe } from "@/client";
import { hasServiceAccess } from "../introduction/types/access-control";

export const ServiceProtectRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const checkServiceAccess = async () => {
      // Extract service name from pathname
      const serviceMatch = pathname.match(/\/introduction\/services\/([^/]+)/);
      if (!serviceMatch) {
        setHasAccess(true);
        return;
      }

      const serviceName = serviceMatch[1];

      try {
        const { data } = await authenticationGetApiV1AuthMeReadUserMe();
        const access = hasServiceAccess(
          serviceName,
          data?.id,
          data?.email,
          data?.username || undefined
        );
        setHasAccess(access);
      } catch {
        setHasAccess(false);
      }
    };

    checkServiceAccess();
  }, [pathname]);

  if (hasAccess === null) {
    return null;
  }

  if (!hasAccess) {
    notFound();
  }

  return <>{children}</>;
};
