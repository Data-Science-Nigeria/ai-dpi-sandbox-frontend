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
    endpoints?: { name: string; method: string; path: string; href: string }[];
  }[];
}

export const menuItems: MenuItem[] = [
  {
    id: "get-started",
    label: "Get Started",
    icon: PlayIcon,
    hasDropdown: true,
    items: [{ id: "dashboard", label: "Dashboard", href: "/introduction" }],
  },
  {
    id: "api-documentation",
    label: "API Documentation",
    icon: BookOpenIcon,
    hasDropdown: true,
    items: [{ id: "overview", label: "Overview", href: "/docs" }],
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
        endpoints: [
          {
            name: "Generate Content",
            method: "POST",
            path: "/api/v1/generate",
            href: "/introduction/services/ai/generate",
          },
          {
            name: "Analyze Data",
            method: "POST",
            path: "/api/v1/analyze",
            href: "/introduction/services/ai/analyze",
          },
        ],
      },
      {
        id: "bvn",
        label: "BVN",
        href: "/introduction/services/bvn",
        endpoints: [
          {
            name: "Verify BVN",
            method: "POST",
            path: "/api/v1/verify",
            href: "/introduction/services/bvn/verify",
          },
          {
            name: "BVN Lookup",
            method: "POST",
            path: "/api/v1/lookup",
            href: "/introduction/services/bvn/lookup",
          },
          {
            name: "BVN Status",
            method: "GET",
            path: "/api/v1/status/{bvn}",
            href: "/introduction/services/bvn/status",
          },
        ],
      },
      {
        id: "ivr",
        label: "IVR",
        href: "/introduction/services/ivr",
        endpoints: [
          {
            name: "Create Call",
            method: "POST",
            path: "/api/v1/call",
            href: "/introduction/services/ivr/call",
          },
          {
            name: "Call Status",
            method: "GET",
            path: "/api/v1/call/{id}",
            href: "/introduction/services/ivr/call-status",
          },
        ],
      },
      {
        id: "nin",
        label: "NIN",
        href: "/introduction/services/nin",
        endpoints: [
          {
            name: "Verify NIN",
            method: "POST",
            path: "/api/v1/verify",
            href: "/introduction/services/nin/verify",
          },
          {
            name: "NIN Lookup",
            method: "POST",
            path: "/api/v1/lookup",
            href: "/introduction/services/nin/lookup",
          },
          {
            name: "NIN Status",
            method: "GET",
            path: "/api/v1/status/{nin}",
            href: "/introduction/services/nin/status",
          },
        ],
      },
      {
        id: "sms",
        label: "SMS",
        href: "/introduction/services/sms",
        endpoints: [
          {
            name: "Send SMS",
            method: "POST",
            path: "/api/v1/send",
            href: "/introduction/services/sms/send",
          },
          {
            name: "Bulk SMS",
            method: "POST",
            path: "/api/v1/send/bulk",
            href: "/introduction/services/sms/bulk",
          },
          {
            name: "SMS Status",
            method: "GET",
            path: "/api/v1/status/{id}",
            href: "/introduction/services/sms/status",
          },
        ],
      },
      {
        id: "two-way-sms",
        label: "Two-Way SMS",
        href: "/introduction/services/two-way-sms",
        endpoints: [
          {
            name: "Send Interactive",
            method: "POST",
            path: "/api/v1/interactive",
            href: "/introduction/services/two-way-sms/interactive",
          },
          {
            name: "Handle Response",
            method: "POST",
            path: "/api/v1/response",
            href: "/introduction/services/two-way-sms/response",
          },
        ],
      },
    ],
  },
];
