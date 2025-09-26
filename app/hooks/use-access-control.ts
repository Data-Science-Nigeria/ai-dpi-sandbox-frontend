import { useCallback, useEffect, useState } from "react";
import { authenticationGetApiV1AuthMeReadUserMe } from "@/client";
import {
  getUserAccessRules,
  type AccessRule,
} from "@/app/(sandbox)/introduction/types/access-control";

export function useAccessControl() {
  const [accessRules, setAccessRules] = useState<AccessRule | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAccess = async () => {
      try {
        const { data } = await authenticationGetApiV1AuthMeReadUserMe();
        if (data) {
          const rules = getUserAccessRules(
            data.id,
            data.email,
            data.username || undefined
          );
          setAccessRules(rules);
        }
      } catch {
        const defaultRules = getUserAccessRules();
        setAccessRules(defaultRules);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAccess();
  }, []);

  const canAccessService = useCallback(
    (service: string) => {
      if (!accessRules) return false;
      const normalizedService = service.toLowerCase().replace(/\s+/g, "-");
      return accessRules.allowedServices.includes(normalizedService);
    },
    [accessRules]
  );

  return { accessRules, canAccessService, loading };
}
