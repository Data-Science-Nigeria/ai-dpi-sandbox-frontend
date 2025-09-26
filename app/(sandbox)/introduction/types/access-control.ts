import { startups } from "./startup-config";

export interface AccessRule {
  startupId: number;
  allowedServices: string[];
  hiddenServices: string[];
}

export const accessRules: AccessRule[] = [
  {
    startupId: 15,
    allowedServices: ["ai", "bvn", "maps", "nin", "sms", "ussd"],
    hiddenServices: [],
  }, // Alajo
  {
    startupId: 9,
    allowedServices: ["ai", "bvn", "maps", "nin", "sms", "ussd"],
    hiddenServices: [],
  }, // Clafiya
  {
    startupId: 14,
    allowedServices: ["ai", "bvn", "maps", "nin", "sms", "ussd"],
    hiddenServices: [],
  }, // Evet
  {
    startupId: 8,
    allowedServices: ["ai", "bvn", "maps", "nin", "sms", "ussd"],
    hiddenServices: [],
  }, // Fertitude
  {
    startupId: 10,
    allowedServices: ["ai", "bvn", "maps", "nin", "sms", "ussd"],
    hiddenServices: [],
  }, // FlologPharma
  {
    startupId: 13,
    allowedServices: ["ai", "bvn", "maps", "nin", "sms", "ussd"],
    hiddenServices: [],
  }, // Xchangebox
  {
    startupId: 17,
    allowedServices: ["ai", "bvn", "maps", "nin", "sms", "ussd"],
    hiddenServices: [],
  }, // MyItura
  {
    startupId: 16,
    allowedServices: ["ai", "bvn", "maps", "nin", "sms", "ussd"],
    hiddenServices: [],
  }, // 8Medical
  {
    startupId: 11,
    allowedServices: ["ai", "bvn", "maps", "nin", "sms", "ussd"],
    hiddenServices: [],
  }, // UHCTech

  // Non-startup users under this comment
];

export function getUserAccessRules(
  userId?: number,
  email?: string,
  username?: string
): AccessRule {
  // First check if there's a direct rule for this user ID (for non-startup users)
  const directRule = accessRules.find((r) => r.startupId === userId);
  if (directRule) {
    return directRule;
  }

  // Then check if it's a startup user
  const startup = startups.find(
    (s) => s.id === userId || s.email === email || s.username === username
  );
  const startupRule = accessRules.find((r) => r.startupId === startup?.id);

  // Default: show all services if no rule found
  return (
    startupRule || {
      startupId: 0,
      allowedServices: ["ai", "bvn", "maps", "nin", "sms", "ussd"],
      hiddenServices: [],
    }
  );
}

export function hasServiceAccess(
  service: string,
  userId?: number,
  email?: string,
  username?: string
): boolean {
  const rules = getUserAccessRules(userId, email, username);
  const normalizedService = service.toLowerCase();
  return (
    rules.allowedServices.includes(normalizedService) &&
    !rules.hiddenServices.includes(normalizedService)
  );
}
