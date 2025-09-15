#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");

function extractEndpointsFromTypes() {
  const typesPath = path.join(process.cwd(), "client", "types.gen.ts");
  const content = fs.readFileSync(typesPath, "utf-8");

  const endpoints = [];

  // Extract endpoint data types (e.g., SmsPostApiV1SmsSendSendSmsData)
  const dataTypeRegex =
    /export type (\w+)Data = \{[\s\S]*?url: "([^"]+)";[\s\S]*?\}/g;

  let match;
  while ((match = dataTypeRegex.exec(content)) !== null) {
    const [, typeName, urlPath] = match;

    // Skip health and metrics endpoints
    if (
      urlPath.includes("/health") ||
      urlPath.includes("/metrics") ||
      urlPath === "/health" ||
      urlPath === "/metrics"
    ) {
      continue;
    }

    // Parse method from type name
    const methodMatch = typeName.match(/^(\w+)(Get|Post|Put|Delete|Patch)/);
    if (!methodMatch) continue;

    const method = methodMatch[2].toUpperCase();

    // Parse category and subcategory from URL
    const pathParts = urlPath.split("/").filter(Boolean);
    if (pathParts.length < 3) continue; // Skip if not /api/v1/...

    const category = pathParts[2]; // e.g., 'sms', 'nin', 'bvn'
    const subcategory = pathParts[3]; // e.g., 'send', 'verify'

    // Handle nested paths like /api/v1/sms/otp/generate
    let endpointName = subcategory || "endpoint";
    if (pathParts.length > 4) {
      // For nested paths, create a unique identifier, removing path parameters
      const nestedPath = pathParts
        .slice(4)
        .map((part) => part.replace(/\{[^}]+\}/g, "")) // Remove {param} patterns
        .filter((part) => part.length > 0) // Remove empty parts
        .join("-");
      endpointName = nestedPath ? `${subcategory}-${nestedPath}` : subcategory;
    }

    // Remove path parameters from endpoint name
    if (endpointName) {
      endpointName = endpointName
        .replace(/\{[^}]+\}/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
    }

    // Fallback if endpointName becomes empty
    if (!endpointName) {
      endpointName = "endpoint";
    }

    // Skip if subcategory is health or metrics or ready or endpoint
    if (
      subcategory === "health" ||
      subcategory === "metrics" ||
      subcategory === "ready" ||
      subcategory === "endpoint" ||
      endpointName === "endpoint"
    ) {
      continue;
    }

    // Extract request type if it's a POST/PUT/PATCH
    let requestType;
    if (["POST", "PUT", "PATCH"].includes(method)) {
      const bodyMatch = content.match(
        new RegExp(`export type ${typeName} = \\{[\\s\\S]*?body: ([^;]+);`)
      );
      if (bodyMatch) {
        requestType = bodyMatch[1];
      }
    }

    endpoints.push({
      method,
      path: urlPath,
      operationId: typeName.replace("Data", ""),
      category,
      subcategory,
      endpointName, // Unique identifier for the endpoint
      requestType,
    });
  }

  return endpoints;
}

function generatePageContent(endpoint) {
  return `"use client";

import { ApiClientInterface } from "../../components/api-client-interface";
import { PageNavigation } from "@/app/(sandbox)/components/page-navigation";
import { getNavigation } from "@/app/(sandbox)/lib/navigation";

export default function ${endpoint.operationId}Page() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <ApiClientInterface 
          initialMethod="${endpoint.method}" 
          initialPath="${endpoint.path}"
        />
      </div>
      <div className="p-3 sm:p-6 border-t">
        <PageNavigation {...getNavigation("/introduction/services/${endpoint.category}/${endpoint.endpointName}")} />
      </div>
    </div>
  );
}
`;
}

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function generateNavigationFile(endpoints) {
  const navigationPages = [{ title: "Dashboard", href: "/introduction" }];

  const categories = [...new Set(endpoints.map((e) => e.category))].sort();

  categories.forEach((category) => {
    const categoryTitle =
      category.charAt(0).toUpperCase() + category.slice(1) + " Service";
    navigationPages.push({
      title: categoryTitle,
      href: `/introduction/services/${category}`,
    });

    const categoryEndpoints = endpoints.filter((e) => e.category === category);

    // Group endpoints by unique endpointName to avoid duplicates
    const uniqueEndpoints = [];
    const seenEndpoints = new Set();

    categoryEndpoints.forEach((endpoint) => {
      if (
        endpoint.endpointName &&
        endpoint.endpointName !== "endpoint" &&
        !seenEndpoints.has(endpoint.endpointName)
      ) {
        seenEndpoints.add(endpoint.endpointName);
        uniqueEndpoints.push(endpoint);
      }
    });

    uniqueEndpoints.forEach((endpoint) => {
      const title = formatEndpointTitle(endpoint.endpointName);
      navigationPages.push({
        title,
        href: `/introduction/services/${category}/${endpoint.endpointName}`,
      });
    });
  });

  return `interface NavigationPage {
  title: string;
  href: string;
}

export const navigationPages: NavigationPage[] = ${JSON.stringify(navigationPages, null, 2)};

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
`;
}

function formatEndpointTitle(endpointName) {
  return endpointName
    .split("-")
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function generateDataFile(endpoints) {
  const categories = [...new Set(endpoints.map((e) => e.category))].sort();

  const coreResourcesItems = categories.map((category) => {
    const categoryEndpoints = endpoints.filter((e) => e.category === category);

    // Group endpoints by unique endpointName to avoid duplicates
    const uniqueEndpoints = [];
    const seenEndpoints = new Set();

    categoryEndpoints.forEach((endpoint) => {
      if (
        endpoint.endpointName &&
        endpoint.endpointName !== "endpoint" &&
        !seenEndpoints.has(endpoint.endpointName)
      ) {
        seenEndpoints.add(endpoint.endpointName);
        uniqueEndpoints.push(endpoint);
      }
    });

    return {
      id: category,
      label: category.toUpperCase(),
      href: `/introduction/services/${category}`,
      endpoints: uniqueEndpoints.map((endpoint) => ({
        name: formatEndpointTitle(endpoint.endpointName),
        method: endpoint.method,
        path: endpoint.path,
        href: `/introduction/services/${category}/${endpoint.endpointName}`,
      })),
    };
  });

  return `import { PlayIcon, CubeIcon } from "@heroicons/react/24/outline";

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
    items: ${JSON.stringify(coreResourcesItems, null, 6)},
  },
];
`;
}

function generatePages() {
  const endpoints = extractEndpointsFromTypes();
  const servicesDir = path.join(
    process.cwd(),
    "app",
    "(sandbox)",
    "introduction",
    "services"
  );

  // Only include specified categories
  const allowedCategories = [
    "ai",
    "bvn",
    "ivr",
    "maps",
    "nin",
    "sms",
    "two-way-sms",
  ];
  const filteredEndpoints = endpoints.filter((e) =>
    allowedCategories.includes(e.category)
  );
  const categories = [
    ...new Set(filteredEndpoints.map((e) => e.category)),
  ].sort();

  for (const category of categories) {
    const categoryDir = path.join(servicesDir, category);
    ensureDirectoryExists(categoryDir);

    // Generate individual endpoint pages only
    const categoryEndpoints = filteredEndpoints.filter(
      (e) => e.category === category
    );

    // Group endpoints by unique endpointName to avoid conflicts
    const uniqueEndpoints = [];
    const seenEndpoints = new Set();

    categoryEndpoints.forEach((endpoint) => {
      if (
        endpoint.endpointName &&
        endpoint.endpointName !== "endpoint" &&
        !seenEndpoints.has(endpoint.endpointName)
      ) {
        seenEndpoints.add(endpoint.endpointName);
        uniqueEndpoints.push(endpoint);
      }
    });

    for (const endpoint of uniqueEndpoints) {
      const endpointDir = path.join(categoryDir, endpoint.endpointName);
      ensureDirectoryExists(endpointDir);

      const pagePath = path.join(endpointDir, "page.tsx");
      const pageContent = generatePageContent(endpoint);
      fs.writeFileSync(pagePath, pageContent);
    }
  }

  // Generate navigation.ts
  const navigationContent = generateNavigationFile(filteredEndpoints);
  const navigationPath = path.join(
    process.cwd(),
    "app",
    "(sandbox)",
    "lib",
    "navigation.ts"
  );
  fs.writeFileSync(navigationPath, navigationContent);

  // Generate data.ts
  const dataContent = generateDataFile(filteredEndpoints);
  const dataPath = path.join(
    process.cwd(),
    "app",
    "(sandbox)",
    "introduction",
    "data",
    "data.ts"
  );
  fs.writeFileSync(dataPath, dataContent);

  console.log(
    `Generated pages for ${filteredEndpoints.length} endpoints across ${categories.length} categories`
  );
  console.log(`Categories: ${categories.join(", ")}`);
  console.log("Updated navigation.ts and data.ts");

  // Clean up unwanted directories
  const allDirs = fs
    .readdirSync(servicesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const unwantedDirs = allDirs.filter(
    (dir) => !allowedCategories.includes(dir) && dir !== "components"
  );

  unwantedDirs.forEach((dir) => {
    const dirPath = path.join(servicesDir, dir);
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`Removed unwanted directory: ${dir}`);
  });
}

// Run the generator
generatePages();
