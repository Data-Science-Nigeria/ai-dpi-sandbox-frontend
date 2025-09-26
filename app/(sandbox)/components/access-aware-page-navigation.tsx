"use client";

import { useEffect, useState } from "react";
import { PageNavigation } from "./page-navigation";
import { getNavigation } from "../lib/navigation";
import { useAccessControl } from "@/app/hooks/use-access-control";

interface NavigationItem {
  title: string;
  href: string;
}

interface NavigationState {
  previous?: NavigationItem;
  next?: NavigationItem;
}

interface AccessAwarePageNavigationProps {
  currentPath: string;
}

export function AccessAwarePageNavigation({
  currentPath,
}: AccessAwarePageNavigationProps) {
  const { canAccessService, loading } = useAccessControl();
  const [navigation, setNavigation] = useState<NavigationState>({
    previous: undefined,
    next: undefined,
  });

  useEffect(() => {
    if (!loading) {
      const nav = getNavigation(currentPath, canAccessService);
      setNavigation(nav);
    }
  }, [currentPath, canAccessService, loading]);

  if (loading) {
    return null;
  }

  return <PageNavigation {...navigation} />;
}
