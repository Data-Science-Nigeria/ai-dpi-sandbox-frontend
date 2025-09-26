import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/app/store/use-auth-store";
import {
  getUserAccessRules,
  type AccessRule,
} from "@/app/(sandbox)/introduction/types/access-control";

export function useAccessControl() {
  const [accessRules, setAccessRules] = useState<AccessRule | null>(null);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuthStore();

  useEffect(() => {
    if (auth.user) {
      const rules = getUserAccessRules(
        Number(auth.user.id),
        auth.user.email,
        undefined
      );
      setAccessRules(rules);
      setLoading(false);
    } else {
      const defaultRules = getUserAccessRules();
      setAccessRules(defaultRules);
      setLoading(false);
    }
  }, [auth.user]);

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
