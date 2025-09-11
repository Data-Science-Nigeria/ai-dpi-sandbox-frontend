interface NavigationPage {
  title: string;
  href: string;
}

export const navigationPages: NavigationPage[] = [
  {
    title: "Dashboard",
    href: "/introduction",
  },
  {
    title: "Ai Service",
    href: "/introduction/services/ai",
  },
  {
    title: "Generate",
    href: "/introduction/services/ai/generate",
  },
  {
    title: "Analyze",
    href: "/introduction/services/ai/analyze",
  },
  {
    title: "Chat",
    href: "/introduction/services/ai/chat",
  },
  {
    title: "Translate",
    href: "/introduction/services/ai/translate",
  },
  {
    title: "Models",
    href: "/introduction/services/ai/models",
  },
  {
    title: "Conversations",
    href: "/introduction/services/ai/conversations",
  },
  {
    title: "Usage",
    href: "/introduction/services/ai/usage",
  },
  {
    title: "Bvn Service",
    href: "/introduction/services/bvn",
  },
  {
    title: "Verify",
    href: "/introduction/services/bvn/verify",
  },
  {
    title: "Status",
    href: "/introduction/services/bvn/status",
  },
  {
    title: "Lookup",
    href: "/introduction/services/bvn/lookup",
  },
  {
    title: "Match",
    href: "/introduction/services/bvn/match",
  },
  {
    title: "Banks",
    href: "/introduction/services/bvn/banks",
  },
  {
    title: "Ivr Service",
    href: "/introduction/services/ivr",
  },
  {
    title: "Call",
    href: "/introduction/services/ivr/call",
  },
  {
    title: "Menu",
    href: "/introduction/services/ivr/menu",
  },
  {
    title: "Nin Service",
    href: "/introduction/services/nin",
  },
  {
    title: "Verify",
    href: "/introduction/services/nin/verify",
  },
  {
    title: "Status",
    href: "/introduction/services/nin/status",
  },
  {
    title: "Lookup",
    href: "/introduction/services/nin/lookup",
  },
  {
    title: "Sms Service",
    href: "/introduction/services/sms",
  },
  {
    title: "Send",
    href: "/introduction/services/sms/send",
  },
  {
    title: "Bulk",
    href: "/introduction/services/sms/bulk",
  },
  {
    title: "Otp",
    href: "/introduction/services/sms/otp",
  },
  {
    title: "Otp",
    href: "/introduction/services/sms/otp",
  },
  {
    title: "Status",
    href: "/introduction/services/sms/status",
  },
  {
    title: "Balance",
    href: "/introduction/services/sms/balance",
  },
  {
    title: "Templates",
    href: "/introduction/services/sms/templates",
  },
  {
    title: "Two-way-sms Service",
    href: "/introduction/services/two-way-sms",
  },
  {
    title: "Send",
    href: "/introduction/services/two-way-sms/send",
  },
  {
    title: "Receive",
    href: "/introduction/services/two-way-sms/receive",
  },
];

export function getNavigation(currentPath: string) {
  const currentIndex = navigationPages.findIndex(
    (page) => page.href === currentPath
  );

  return {
    previous: currentIndex > 0 ? navigationPages[currentIndex - 1] : undefined,
    next:
      currentIndex < navigationPages.length - 1
        ? navigationPages[currentIndex + 1]
        : undefined,
  };
}
