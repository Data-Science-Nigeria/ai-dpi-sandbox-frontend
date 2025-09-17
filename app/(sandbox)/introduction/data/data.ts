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
            name: "Models",
            method: "GET",
            path: "/api/v1/ai/models/",
            href: "/introduction/services/ai/models",
          },
          {
            name: "Chat",
            method: "POST",
            path: "/api/v1/ai/chat/",
            href: "/introduction/services/ai/chat",
          },
          {
            name: "Chat Session",
            method: "GET",
            path: "/api/v1/ai/chat/{session_id}/session",
            href: "/introduction/services/ai/chat-session",
          },
          {
            name: "Chat Sessions All",
            method: "GET",
            path: "/api/v1/ai/chat/sessions/all",
            href: "/introduction/services/ai/chat-sessions-all",
          },
          {
            name: "Rag Query",
            method: "POST",
            path: "/api/v1/ai/rag/query",
            href: "/introduction/services/ai/rag-query",
          },
          {
            name: "Rag Upload",
            method: "POST",
            path: "/api/v1/ai/rag/upload",
            href: "/introduction/services/ai/rag-upload",
          },
          {
            name: "Spitch Speech To Text",
            method: "POST",
            path: "/api/v1/ai/spitch/speech-to-text",
            href: "/introduction/services/ai/spitch-speech-to-text",
          },
          {
            name: "Spitch Text To Speech",
            method: "POST",
            path: "/api/v1/ai/spitch/text-to-speech",
            href: "/introduction/services/ai/spitch-text-to-speech",
          },
          {
            name: "Spitch Translate",
            method: "POST",
            path: "/api/v1/ai/spitch/translate",
            href: "/introduction/services/ai/spitch-translate",
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
        id: "maps",
        label: "MAPS",
        href: "/introduction/services/maps",
        endpoints: [
          {
            name: "Nearby",
            method: "GET",
            path: "/api/v1/maps/nearby/",
            href: "/introduction/services/maps/nearby",
          },
          {
            name: "Distance",
            method: "GET",
            path: "/api/v1/maps/distance/",
            href: "/introduction/services/maps/distance",
          },
          {
            name: "Directions",
            method: "GET",
            path: "/api/v1/maps/directions/",
            href: "/introduction/services/maps/directions",
          },
          {
            name: "Static",
            method: "GET",
            path: "/api/v1/maps/static/",
            href: "/introduction/services/maps/static",
          },
          {
            name: "Routes Routes",
            method: "POST",
            path: "/api/v1/maps/routes/routes/",
            href: "/introduction/services/maps/routes-routes",
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
            name: "Send Bulk",
            method: "POST",
            path: "/api/v1/sms/send-bulk",
            href: "/introduction/services/sms/send-bulk",
          },
          {
            name: "Balance",
            method: "GET",
            path: "/api/v1/sms/balance",
            href: "/introduction/services/sms/balance",
          },
          {
            name: "Delivery Report",
            method: "POST",
            path: "/api/v1/sms/delivery-report",
            href: "/introduction/services/sms/delivery-report",
          },
          {
            name: "Status",
            method: "GET",
            path: "/api/v1/sms/status/{message_id}",
            href: "/introduction/services/sms/status",
          },
        ],
      },
    ],
  },
];
