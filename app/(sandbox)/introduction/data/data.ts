import { PlayIcon, CubeIcon } from "@heroicons/react/24/outline";

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
            name: "Generate",
            method: "POST",
            path: "/api/v1/ai/generate",
            href: "/introduction/services/ai/generate",
          },
          {
            name: "Analyze",
            method: "POST",
            path: "/api/v1/ai/analyze",
            href: "/introduction/services/ai/analyze",
          },
          {
            name: "Chat",
            method: "POST",
            path: "/api/v1/ai/chat",
            href: "/introduction/services/ai/chat",
          },
          {
            name: "Translate",
            method: "POST",
            path: "/api/v1/ai/translate",
            href: "/introduction/services/ai/translate",
          },
          {
            name: "Models",
            method: "GET",
            path: "/api/v1/ai/models",
            href: "/introduction/services/ai/models",
          },
          {
            name: "Conversations",
            method: "GET",
            path: "/api/v1/ai/conversations/{conversation_id}",
            href: "/introduction/services/ai/conversations",
          },
          {
            name: "Usage",
            method: "GET",
            path: "/api/v1/ai/usage",
            href: "/introduction/services/ai/usage",
          },
        ],
      },
      {
        id: "bvn",
        label: "BVN",
        href: "/introduction/services/bvn",
        endpoints: [
          {
            name: "Verify",
            method: "POST",
            path: "/api/v1/bvn/verify",
            href: "/introduction/services/bvn/verify",
          },
          {
            name: "Status",
            method: "GET",
            path: "/api/v1/bvn/status/{bvn}",
            href: "/introduction/services/bvn/status",
          },
          {
            name: "Lookup",
            method: "POST",
            path: "/api/v1/bvn/lookup",
            href: "/introduction/services/bvn/lookup",
          },
          {
            name: "Match",
            method: "POST",
            path: "/api/v1/bvn/match",
            href: "/introduction/services/bvn/match",
          },
          {
            name: "Banks",
            method: "GET",
            path: "/api/v1/bvn/banks",
            href: "/introduction/services/bvn/banks",
          },
        ],
      },
      {
        id: "ivr",
        label: "IVR",
        href: "/introduction/services/ivr",
        endpoints: [
          {
            name: "Call",
            method: "POST",
            path: "/api/v1/ivr/call",
            href: "/introduction/services/ivr/call",
          },
          {
            name: "Menu",
            method: "GET",
            path: "/api/v1/ivr/menu",
            href: "/introduction/services/ivr/menu",
          },
        ],
      },
      {
        id: "nin",
        label: "NIN",
        href: "/introduction/services/nin",
        endpoints: [
          {
            name: "Verify",
            method: "POST",
            path: "/api/v1/nin/verify",
            href: "/introduction/services/nin/verify",
          },
          {
            name: "Status",
            method: "GET",
            path: "/api/v1/nin/status/{nin}",
            href: "/introduction/services/nin/status",
          },
          {
            name: "Lookup",
            method: "POST",
            path: "/api/v1/nin/lookup",
            href: "/introduction/services/nin/lookup",
          },
        ],
      },
      {
        id: "sms",
        label: "SMS",
        href: "/introduction/services/sms",
        endpoints: [
          {
            name: "Send",
            method: "POST",
            path: "/api/v1/sms/send",
            href: "/introduction/services/sms/send",
          },
          {
            name: "Bulk",
            method: "POST",
            path: "/api/v1/sms/bulk",
            href: "/introduction/services/sms/bulk",
          },
          {
            name: "Otp",
            method: "POST",
            path: "/api/v1/sms/otp/generate",
            href: "/introduction/services/sms/otp",
          },
          {
            name: "Otp",
            method: "POST",
            path: "/api/v1/sms/otp/verify",
            href: "/introduction/services/sms/otp",
          },
          {
            name: "Status",
            method: "GET",
            path: "/api/v1/sms/status/{message_id}",
            href: "/introduction/services/sms/status",
          },
          {
            name: "Balance",
            method: "GET",
            path: "/api/v1/sms/balance",
            href: "/introduction/services/sms/balance",
          },
          {
            name: "Templates",
            method: "GET",
            path: "/api/v1/sms/templates",
            href: "/introduction/services/sms/templates",
          },
        ],
      },
      {
        id: "two-way-sms",
        label: "TWO-WAY-SMS",
        href: "/introduction/services/two-way-sms",
        endpoints: [
          {
            name: "Send",
            method: "POST",
            path: "/api/v1/two-way-sms/send",
            href: "/introduction/services/two-way-sms/send",
          },
          {
            name: "Receive",
            method: "POST",
            path: "/api/v1/two-way-sms/receive",
            href: "/introduction/services/two-way-sms/receive",
          },
        ],
      },
    ],
  },
];
