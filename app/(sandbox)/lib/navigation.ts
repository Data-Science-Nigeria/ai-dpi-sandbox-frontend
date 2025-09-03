interface NavigationPage {
  title: string;
  href: string;
}

export const navigationPages: NavigationPage[] = [
  { title: "Dashboard", href: "/introduction" },
  { title: "API Documentation", href: "/docs" },
  { title: "AI Service", href: "/introduction/services/ai" },
  { title: "BVN Service", href: "/introduction/services/bvn" },
  { title: "IVR Service", href: "/introduction/services/ivr" },
  { title: "NIN Service", href: "/introduction/services/nin" },
  { title: "SMS Service", href: "/introduction/services/sms" },
  { title: "Two-Way SMS", href: "/introduction/services/two-way-sms" },
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
