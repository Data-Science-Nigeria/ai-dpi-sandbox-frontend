interface NavigationPage {
  title: string;
  href: string;
}

export const navigationPages: NavigationPage[] = [
  { title: "Dashboard", href: "/introduction" },
  { title: "API Documentation", href: "/docs" },
  { title: "AI Service", href: "/introduction/services/ai" },
  { title: "Generate Content", href: "/introduction/services/ai/generate" },
  { title: "Analyze Data", href: "/introduction/services/ai/analyze" },
  { title: "BVN Service", href: "/introduction/services/bvn" },
  { title: "Verify BVN", href: "/introduction/services/bvn/verify" },
  { title: "BVN Lookup", href: "/introduction/services/bvn/lookup" },
  { title: "BVN Status", href: "/introduction/services/bvn/status" },
  { title: "IVR Service", href: "/introduction/services/ivr" },
  { title: "Create Call", href: "/introduction/services/ivr/call" },
  { title: "Call Status", href: "/introduction/services/ivr/call-status" },
  { title: "NIN Service", href: "/introduction/services/nin" },
  { title: "Verify NIN", href: "/introduction/services/nin/verify" },
  { title: "NIN Lookup", href: "/introduction/services/nin/lookup" },
  { title: "NIN Status", href: "/introduction/services/nin/status" },
  { title: "SMS Service", href: "/introduction/services/sms" },
  { title: "Send SMS", href: "/introduction/services/sms/send" },
  { title: "Bulk SMS", href: "/introduction/services/sms/bulk" },
  { title: "SMS Status", href: "/introduction/services/sms/status" },
  { title: "Two-Way SMS", href: "/introduction/services/two-way-sms" },
  {
    title: "Send Interactive SMS",
    href: "/introduction/services/two-way-sms/interactive",
  },
  {
    title: "Handle Response",
    href: "/introduction/services/two-way-sms/response",
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
