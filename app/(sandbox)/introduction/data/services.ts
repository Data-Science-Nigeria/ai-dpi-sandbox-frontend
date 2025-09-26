export interface Service {
  name: string;
  description: string;
  href: string;
}

export const services: Service[] = [
  {
    name: "AI",
    description:
      "Artificial Intelligence services and machine learning capabilities",
    href: "/introduction/services/ai",
  },
  {
    name: "BVN",
    description:
      "Bank Verification Number validation and verification services",
    href: "/introduction/services/bvn",
  },
  {
    name: "IVR",
    description:
      "Interactive Voice Response system for automated phone interactions",
    href: "/introduction/services/ivr",
  },
  {
    name: "MAPS",
    description: "Mapping and location-based services",
    href: "/introduction/services/maps",
  },
  {
    name: "NIN",
    description: "National Identification Number verification and validation",
    href: "/introduction/services/nin",
  },
  {
    name: "SMS",
    description:
      "Short Message Service for sending and receiving text messages",
    href: "/introduction/services/sms",
  },
  {
    name: "Two-Way SMS",
    description: "Bidirectional SMS communication for interactive messaging",
    href: "/introduction/services/two-way-sms",
  },
  {
    name: "USSD",
    description:
      "Unstructured Supplementary Service Data for interactive mobile menu services",
    href: "/introduction/services/ussd",
  },
];
