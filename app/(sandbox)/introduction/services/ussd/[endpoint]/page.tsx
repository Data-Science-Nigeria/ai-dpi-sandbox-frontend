"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { ApiClientInterface } from "../../components/api-client-interface";
import { PageNavigation } from "@/app/(sandbox)/components/page-navigation";
import { authenticationGetApiV1AuthMeReadUserMe } from "@/client";
import {
  getStartupByUser,
  getUssdEndpointName,
} from "../../../types/startup-config";
import { hasServiceAccess } from "../../../types/access-control";

export default function DynamicUssdEndpointPage() {
  const params = useParams();
  const endpoint = params.endpoint as string;
  const [isValidEndpoint, setIsValidEndpoint] = useState<boolean | null>(null);
  const [endpointConfig, setEndpointConfig] = useState<{
    initialPath: string;
    currentPath: string;
  } | null>(null);
  const [navigation, setNavigation] = useState<{
    previous?: { title: string; href: string };
    next?: { title: string; href: string };
  }>({ previous: undefined, next: undefined });

  useEffect(() => {
    const validateEndpoint = async () => {
      try {
        const { data } = await authenticationGetApiV1AuthMeReadUserMe();
        const startup = getStartupByUser(
          data?.id,
          data?.email,
          data?.username || undefined
        );
        const endpointName = getUssdEndpointName(startup.username);

        // Check if this endpoint belongs to the current user
        const isUserEndpoint =
          endpoint === `${endpointName}_ussd` ||
          endpoint === `test_${endpointName}_ussd`;

        if (isUserEndpoint) {
          const config = {
            initialPath: `/api/v1/ussd/${endpoint}`,
            currentPath: `/introduction/services/ussd/${endpoint}`,
          };
          setEndpointConfig(config);
          setIsValidEndpoint(true);

          // Create user-specific navigation between their USSD endpoints with access control
          const userPages = [];

          // Only add USSD service if user has access
          if (
            hasServiceAccess(
              "ussd",
              data?.id,
              data?.email,
              data?.username || undefined
            )
          ) {
            userPages.push({
              title: "Ussd Service",
              href: "/introduction/services/ussd",
            });
            userPages.push({
              title: `${startup.name} USSD`,
              href: `/introduction/services/ussd/${endpointName}_ussd`,
            });
            userPages.push({
              title: `Test ${startup.name} USSD`,
              href: `/introduction/services/ussd/test_${endpointName}_ussd`,
            });
          }

          const currentIndex = userPages.findIndex(
            (page) => page.href === config.currentPath
          );

          setNavigation({
            previous:
              currentIndex > 0 ? userPages[currentIndex - 1] : undefined,
            next:
              currentIndex < userPages.length - 1
                ? userPages[currentIndex + 1]
                : undefined,
          });
        } else {
          setIsValidEndpoint(false);
        }
      } catch {
        setIsValidEndpoint(false);
      }
    };

    validateEndpoint();
  }, [endpoint]);

  if (isValidEndpoint === null) {
    return null;
  }

  if (!isValidEndpoint || !endpointConfig) {
    notFound();
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <ApiClientInterface
          initialMethod="POST"
          initialPath={endpointConfig.initialPath}
        />
      </div>
      <div className="p-3 sm:p-6 border-t">
        <PageNavigation {...navigation} />
      </div>
    </div>
  );
}
