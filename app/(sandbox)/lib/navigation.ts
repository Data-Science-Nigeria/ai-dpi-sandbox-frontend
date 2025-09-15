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
    title: "AI Service",
    href: "/introduction/services/ai",
  },
  {
    title: "Models",
    href: "/introduction/services/ai/models",
  },
  {
    title: "Chat",
    href: "/introduction/services/ai/chat",
  },
  {
    title: "Chat Session",
    href: "/introduction/services/ai/chat-session",
  },
  {
    title: "Chat Sessions All",
    href: "/introduction/services/ai/chat-sessions-all",
  },
  {
    title: "Rag Query",
    href: "/introduction/services/ai/rag-query",
  },
  {
    title: "Rag Upload",
    href: "/introduction/services/ai/rag-upload",
  },
  {
    title: "Spitch Speech To Text",
    href: "/introduction/services/ai/spitch-speech-to-text",
  },
  {
    title: "Spitch Text To Speech",
    href: "/introduction/services/ai/spitch-text-to-speech",
  },
  {
    title: "Spitch Translate",
    href: "/introduction/services/ai/spitch-translate",
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
    title: "Send Bulk",
    href: "/introduction/services/sms/send-bulk",
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
    title: "Otp Generate",
    href: "/introduction/services/sms/otp-generate",
  },
  {
    title: "Otp Verify",
    href: "/introduction/services/sms/otp-verify",
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
