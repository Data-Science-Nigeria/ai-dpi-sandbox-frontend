"use client";

import { useSearchParams } from "next/navigation";
import { ApiClientInterface } from "../components/api-client-interface";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Code, AlertTriangle, BarChart3 } from "lucide-react";
import { PageNavigation } from "@/app/(sandbox)/components/page-navigation";
import { getNavigation } from "@/app/(sandbox)/lib/navigation";
import { SuspenseWrapper } from "../components/suspense-wrapper";

const bvnEndpoints = [
  {
    name: "Verify BVN",
    method: "POST",
    path: "/api/v1/verify",
    description: "Verify Bank Verification Number with Dojah API",
    example: {
      bvn: "12345678901",
    },
  },
  {
    name: "BVN Lookup",
    method: "POST",
    path: "/api/v1/lookup",
    description: "Basic BVN lookup without full verification",
    example: {
      bvn: "12345678901",
    },
  },
  {
    name: "BVN Status",
    method: "GET",
    path: "/api/v1/status/{bvn}",
    description: "Get BVN verification status",
    example: {
      bvn: "12345678901",
    },
  },
];

function BVNServiceContent() {
  const searchParams = useSearchParams();
  const selectedEndpoint = searchParams.get("endpoint");

  const endpoint = bvnEndpoints.find((e) => e.path === selectedEndpoint);

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
            <CreditCard className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-lg xs:text-xl sm:text-2xl font-bold leading-tight">
              BVN Service
            </h1>
          </div>
          <Badge
            variant="secondary"
            className="text-[10px] xs:text-xs sm:text-sm"
          >
            Bank Verification
          </Badge>
        </div>
        <p className="text-xs xs:text-sm sm:text-base text-muted-foreground leading-tight">
          Bank Verification Number validation service for Nigerian financial
          identity verification
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
                {bvnEndpoints.map((endpoint) => (
                  <div
                    key={endpoint.path}
                    className="border rounded-lg p-2 xs:p-3 sm:p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex flex-col xs:flex-row items-start justify-between mb-1 xs:mb-2 gap-1 xs:gap-2">
                      <div className="flex flex-col xs:flex-row items-start xs:items-center gap-1 xs:gap-2 sm:gap-3 w-full">
                        <Badge
                          variant={
                            endpoint.method === "GET" ? "secondary" : "default"
                          }
                          className="text-[10px] xs:text-xs"
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-[10px] xs:text-xs sm:text-sm bg-muted px-1 xs:px-2 py-0.5 xs:py-1 rounded break-all">
                          {endpoint.path}
                        </code>
                      </div>
                    </div>

                    <h3 className="font-medium mb-0.5 xs:mb-1 text-xs xs:text-sm sm:text-base leading-tight">
                      {endpoint.name}
                    </h3>
                    <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground mb-2 xs:mb-3 leading-tight">
                      {endpoint.description}
                    </p>

                    <details className="text-[10px] xs:text-xs sm:text-sm">
                      <summary className="cursor-pointer text-primary hover:underline">
                        View example request
                      </summary>
                      <pre className="mt-1 xs:mt-2 p-1 xs:p-2 sm:p-3 bg-muted rounded text-[8px] xs:text-xs overflow-x-auto">
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

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
                <div className="border rounded-lg p-2 xs:p-3 sm:p-4">
                  <h3 className="font-medium mb-1 xs:mb-2 text-xs xs:text-sm sm:text-base leading-tight">
                    Financial Identity
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground leading-tight">
                    Verify customer financial identity through BVN linked to all
                    Nigerian bank accounts.
                  </p>
                </div>

                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Cross-Bank Validation
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Single BVN works across all Nigerian banks for comprehensive
                    customer verification.
                  </p>
                </div>

                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    KYC Compliance
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Meet regulatory KYC requirements with CBN-approved BVN
                    verification process.
                  </p>
                </div>

                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Fraud Prevention
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Reduce financial fraud with verified customer identity and
                    banking history.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                BVN Format & Requirements
              </h2>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">BVN Format</h3>
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
                        <div className="font-medium">BVN Lookup</div>
                        <div className="text-muted-foreground">
                          Validates BVN format and existence
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="default" className="mt-0.5">
                        Full
                      </Badge>
                      <div>
                        <div className="font-medium">BVN Verification</div>
                        <div className="text-muted-foreground">
                          Complete financial identity verification with banking
                          details
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Use Cases</h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div>
                      <div className="font-medium">Fintech Onboarding</div>
                      <div className="text-muted-foreground">
                        Customer verification for digital banking
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Loan Applications</div>
                      <div className="text-muted-foreground">
                        Identity verification for credit assessment
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Payment Processing</div>
                      <div className="text-muted-foreground">
                        Merchant verification for payment gateways
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Account Opening</div>
                      <div className="text-muted-foreground">
                        Bank account creation and verification
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-blue-600" />
                    Regulatory Compliance
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • BVN verification is regulated by the Central Bank of
                      Nigeria (CBN)
                    </li>
                    <li>• Customer consent required before BVN verification</li>
                    <li>
                      • Data handling must comply with NDPR and CBN guidelines
                    </li>
                    <li>
                      • Verification records must be maintained for audit
                      purposes
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </ScrollArea>

      <div className="p-2 xs:p-3 sm:p-6 border-t">
        <PageNavigation {...getNavigation("/introduction/services/bvn")} />
      </div>
    </div>
  );
}

export default function BVNServicePage() {
  return (
    <SuspenseWrapper>
      <BVNServiceContent />
    </SuspenseWrapper>
  );
}
