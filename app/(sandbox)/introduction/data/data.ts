import { PlayIcon, BookOpenIcon, CubeIcon } from "@heroicons/react/24/outline";

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hasDropdown?: boolean;
  href?: string;
  items?: {
    id: string;
    label: string;
    href: string;
    locked?: boolean;
    endpoints?: { name: string; method: string; path: string }[];
  }[];
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
        endpoints: [
          {
            name: "Generate Content",
            method: "POST",
            path: "/api/v1/generate",
          },
          { name: "Analyze Data", method: "POST", path: "/api/v1/analyze" },
        ],
      },
      {
        id: "bvn",
        label: "BVN",
        href: "/introduction/services/bvn",
        locked: true,
        endpoints: [
          { name: "Verify BVN", method: "POST", path: "/api/v1/verify" },
          { name: "BVN Lookup", method: "POST", path: "/api/v1/lookup" },
          { name: "BVN Status", method: "GET", path: "/api/v1/status/{bvn}" },
        ],
      },
      {
        id: "ivr",
        label: "IVR",
        href: "/introduction/services/ivr",
        locked: true,
        endpoints: [
          { name: "Create Call", method: "POST", path: "/api/v1/call" },
          { name: "Call Status", method: "GET", path: "/api/v1/call/{id}" },
        ],
      },
      {
        id: "nin",
        label: "NIN",
        href: "/introduction/services/nin",
        locked: true,
        endpoints: [
          { name: "Verify NIN", method: "POST", path: "/api/v1/verify" },
          { name: "NIN Lookup", method: "POST", path: "/api/v1/lookup" },
          { name: "NIN Status", method: "GET", path: "/api/v1/status/{nin}" },
        ],
      },
      {
        id: "sms",
        label: "SMS",
        href: "/introduction/services/sms",
        locked: true,
        endpoints: [
          { name: "Send SMS", method: "POST", path: "/api/v1/send" },
          { name: "Bulk SMS", method: "POST", path: "/api/v1/send/bulk" },
          { name: "SMS Status", method: "GET", path: "/api/v1/status/{id}" },
        ],
      },
      {
        id: "two-way-sms",
        label: "Two-Way SMS",
        href: "/introduction/services/two-way-sms",
        locked: true,
        endpoints: [
          {
            name: "Send Interactive",
            method: "POST",
            path: "/api/v1/interactive",
          },
          { name: "Handle Response", method: "POST", path: "/api/v1/response" },
        ],
      },
    ],
  },
];
