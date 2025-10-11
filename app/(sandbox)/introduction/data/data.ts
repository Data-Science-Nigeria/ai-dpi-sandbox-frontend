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
            name: "Models Groq",
            method: "GET",
            path: "/api/v1/ai/models/groq",
            href: "/introduction/services/ai/models-groq",
          },
          {
            name: "Models Openai",
            method: "GET",
            path: "/api/v1/ai/models/openai",
            href: "/introduction/services/ai/models-openai",
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
        id: "dpi",
        label: "DPI",
        href: "/introduction/services/dpi",
        endpoints: [
          {
            name: "Nin Lookup",
            method: "POST",
            path: "/api/v1/dpi/nin/lookup",
            href: "/introduction/services/dpi/nin-lookup",
          },
          {
            name: "Bvn Lookup",
            method: "POST",
            path: "/api/v1/dpi/bvn/lookup",
            href: "/introduction/services/dpi/bvn-lookup",
          },
          {
            name: "Credit Score",
            method: "POST",
            path: "/api/v1/dpi/credit/score",
            href: "/introduction/services/dpi/credit-score",
          },
          {
            name: "Selfie Verification Nin",
            method: "POST",
            path: "/api/v1/dpi/selfie/verification/nin",
            href: "/introduction/services/dpi/selfie-verification-nin",
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
            name: "Routes",
            method: "POST",
            path: "/api/v1/maps/routes/",
            href: "/introduction/services/maps/routes",
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
      {
        id: "ussd",
        label: "USSD",
        href: "/introduction/services/ussd",
        endpoints: [],
      },
    ],
  },
];
