"use client";

import { useSearchParams } from "next/navigation";
import { ApiClientInterface } from "../components/api-client-interface";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Shield, Code, AlertTriangle, BarChart3 } from "lucide-react";
import { PageNavigation } from "@/app/(sandbox)/components/page-navigation";
import { getNavigation } from "@/app/(sandbox)/lib/navigation";
import { SuspenseWrapper } from "../components/suspense-wrapper";

const ninEndpoints = [
  {
    name: "Verify NIN",
    method: "POST",
    path: "/api/v1/verify",
    description: "Verify Nigerian National Identity Number with Dojah API",
    example: {
      nin: "12345678901",
    },
  },
  {
    name: "NIN Lookup",
    method: "POST",
    path: "/api/v1/lookup",
    description: "Basic NIN lookup without full verification",
    example: {
      nin: "12345678901",
    },
  },
  {
    name: "NIN Status",
    method: "GET",
    path: "/api/v1/status/{nin}",
    description: "Get NIN verification status",
    example: {
      nin: "12345678901",
    },
  },
];

function NINServiceContent() {
  const searchParams = useSearchParams();
  const selectedEndpoint = searchParams.get("endpoint");

  const endpoint = ninEndpoints.find((e) => e.path === selectedEndpoint);

  if (selectedEndpoint && endpoint) {
    return (
      <ApiClientInterface
        initialMethod={endpoint.method}
        initialPath={endpoint.path}
      />
    );
  }

  return (
    <div className="h-full flex flex-col mt-4 sm:mt-0">
      <div className="p-2 xs:p-3 sm:p-6 border-b bg-card">
        <div className="flex flex-col xs:flex-row items-start xs:items-center gap-1 xs:gap-2 sm:gap-3 mb-1 xs:mb-2">
          <div className="flex items-center gap-1 xs:gap-2 sm:gap-3">
            <Shield className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-lg xs:text-xl sm:text-2xl font-bold leading-tight">
              NIN Service
            </h1>
          </div>
          <Badge
            variant="secondary"
            className="text-[10px] xs:text-xs sm:text-sm"
          >
            Identity Verification
          </Badge>
        </div>
        <p className="text-xs xs:text-sm sm:text-base text-muted-foreground leading-tight">
          Nigerian National Identity Number verification service powered by
          Dojah API
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 xs:p-3 sm:p-6">
          <div className="grid gap-3 xs:gap-4 sm:gap-6">
            <section>
              <h2 className="text-sm xs:text-base sm:text-lg font-semibold mb-2 xs:mb-3 sm:mb-4 flex items-center gap-1 xs:gap-2">
                <Code className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
                Available Endpoints
              </h2>

              <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                {ninEndpoints.map((endpoint) => (
                  <div
                    key={endpoint.path}
                    className="border rounded-lg p-2 xs:p-3 sm:p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-2 gap-2">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full">
                        <Badge
                          variant={
                            endpoint.method === "GET" ? "secondary" : "default"
                          }
                          className="text-xs"
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-xs sm:text-sm bg-muted px-2 py-1 rounded break-all">
                          {endpoint.path}
                        </code>
                      </div>
                    </div>

                    <h3 className="font-medium mb-1 text-sm sm:text-base">
                      {endpoint.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                      {endpoint.description}
                    </p>

                    <details className="text-xs sm:text-sm">
                      <summary className="cursor-pointer text-primary hover:underline">
                        View example request
                      </summary>
                      <pre className="mt-2 p-2 sm:p-3 bg-muted rounded text-xs overflow-x-auto">
                        {JSON.stringify(endpoint.example, null, 2)}
                      </pre>
                    </details>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Features
              </h2>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Real-time Verification
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Instant NIN verification through direct integration with
                    NIMC database via Dojah API.
                  </p>
                </div>

                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Comprehensive Data
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Access to full identity information including name, date of
                    birth, and photo verification.
                  </p>
                </div>

                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Status Tracking
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Track verification status and maintain audit trails for
                    compliance requirements.
                  </p>
                </div>

                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Secure Processing
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    End-to-end encryption and secure data handling following
                    Nigerian data protection regulations.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                NIN Format & Requirements
              </h2>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">NIN Format</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <code className="bg-muted px-2 py-1 rounded">
                        11 digits
                      </code>
                      <span className="text-muted-foreground">
                        Exactly 11 numeric characters
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="bg-muted px-2 py-1 rounded">
                        12345678901
                      </code>
                      <span className="text-muted-foreground">
                        Example format
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Verification Levels</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">
                        Basic
                      </Badge>
                      <div>
                        <div className="font-medium">NIN Lookup</div>
                        <div className="text-muted-foreground">
                          Validates NIN format and existence
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="default" className="mt-0.5">
                        Full
                      </Badge>
                      <div>
                        <div className="font-medium">NIN Verification</div>
                        <div className="text-muted-foreground">
                          Complete identity verification with personal details
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    Important Notes
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • NIN verification requires valid Dojah API credentials
                    </li>
                    <li>
                      • Each verification request is billable through Dojah
                    </li>
                    <li>
                      • Personal data is handled according to NDPR compliance
                    </li>
                    <li>
                      • Rate limits apply based on your Dojah subscription
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </ScrollArea>

      <div className="p-2 xs:p-3 sm:p-6 border-t">
        <PageNavigation {...getNavigation("/introduction/services/nin")} />
      </div>
    </div>
  );
}

export default function NINServicePage() {
  return (
    <SuspenseWrapper>
      <NINServiceContent />
    </SuspenseWrapper>
  );
}
