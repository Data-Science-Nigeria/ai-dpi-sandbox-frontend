import { PlayIcon, BookOpenIcon, CubeIcon } from "@heroicons/react/24/outline";

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hasDropdown?: boolean;
  href?: string;
  items?: { id: string; label: string; href: string; locked?: boolean }[];
}

export const menuItems: MenuItem[] = [
  {
    id: "get-started",
    label: "Get Started",
    icon: PlayIcon,
    hasDropdown: true,
    items: [
      { id: "introduction", label: "Introduction", href: "/introduction" },
    ],
  },
  {
    id: "api-documentation",
    label: "API Documentation",
    icon: BookOpenIcon,
    hasDropdown: true,
    items: [],
  },
  {
    id: "core-resources",
    label: "Core Resources",
    icon: CubeIcon,
    hasDropdown: true,
    items: [
      {
        id: "ai",
        label: "AI",
        href: "/introduction/services/ai",
        locked: true,
      },
      {
        id: "bvn",
        label: "BVN",
        href: "/introduction/services/bvn",
        locked: true,
      },
      {
        id: "ivr",
        label: "IVR",
        href: "/introduction/services/ivr",
        locked: true,
      },
      {
        id: "nin",
        label: "NIN",
        href: "/introduction/services/nin",
        locked: true,
      },
      {
        id: "sms",
        label: "SMS",
        href: "/introduction/services/sms",
        locked: true,
      },
      {
        id: "two-way-sms",
        label: "Two-Way SMS",
        href: "/introduction/services/two-way-sms",
        locked: true,
      },
    ],
  },
];
