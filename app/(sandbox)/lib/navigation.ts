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
    title: "Models Groq",
    href: "/introduction/services/ai/models-groq",
  },
  {
    title: "Models Openai",
    href: "/introduction/services/ai/models-openai",
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
    title: "Dpi Service",
    href: "/introduction/services/dpi",
  },
  {
    title: "Nin Lookup",
    href: "/introduction/services/dpi/nin-lookup",
  },
  {
    title: "Bvn Lookup",
    href: "/introduction/services/dpi/bvn-lookup",
  },
  {
    title: "Credit Score",
    href: "/introduction/services/dpi/credit-score",
  },
  {
    title: "Selfie Verification Nin",
    href: "/introduction/services/dpi/selfie-verification-nin",
  },
  {
    title: "Image Liveness",
    href: "/introduction/services/dpi/image-liveness",
  },
  {
    title: "Maps Service",
    href: "/introduction/services/maps",
  },
  {
    title: "Nearby",
    href: "/introduction/services/maps/nearby",
  },
  {
    title: "Distance",
    href: "/introduction/services/maps/distance",
  },
  {
    title: "Directions",
    href: "/introduction/services/maps/directions",
  },
  {
    title: "Static",
    href: "/introduction/services/maps/static",
  },
  {
    title: "Routes",
    href: "/introduction/services/maps/routes",
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
    title: "Send Bulk",
    href: "/introduction/services/sms/send-bulk",
  },
  {
    title: "Balance",
    href: "/introduction/services/sms/balance",
  },
  {
    title: "Delivery Report",
    href: "/introduction/services/sms/delivery-report",
  },
  {
    title: "Status",
    href: "/introduction/services/sms/status",
  },
  {
    title: "Ussd Service",
    href: "/introduction/services/ussd",
  },
];

export function getNavigation(
  currentPath: string,
  userAccessFilter?: (service: string) => boolean
) {
  let filteredPages = navigationPages;

  if (userAccessFilter) {
    filteredPages = navigationPages.filter((page) => {
      // Extract service from path
      const pathParts = page.href.split("/");
      if (pathParts.length >= 4 && pathParts[2] === "services") {
        const service = pathParts[3];
        return userAccessFilter(service);
      }
      return true; // Keep non-service pages
    });
  }

  const currentIndex = filteredPages.findIndex(
    (page) => page.href === currentPath
  );

  return {
    previous: currentIndex > 0 ? filteredPages[currentIndex - 1] : undefined,
    next:
      currentIndex < filteredPages.length - 1
        ? filteredPages[currentIndex + 1]
        : undefined,
  };
}
