"use client";

import { useSearchParams } from "next/navigation";
import { ApiClientInterface } from "../components/api-client-interface";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, AlertTriangle, BarChart3 } from "lucide-react";

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

export default function NINServicePage() {
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
    <div className="h-full flex flex-col">
      <div className="p-6 border-b bg-card">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">NIN Service</h1>
          <Badge variant="secondary">Identity Verification</Badge>
        </div>
        <p className="text-muted-foreground">
          Nigerian National Identity Number verification service powered by
          Dojah API
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="grid gap-6">
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Available Endpoints
              </h2>

              <div className="space-y-4">
                {ninEndpoints.map((endpoint) => (
                  <div
                    key={endpoint.path}
                    className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            endpoint.method === "GET" ? "secondary" : "default"
                          }
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {endpoint.path}
                        </code>
                      </div>
                    </div>

                    <h3 className="font-medium mb-1">{endpoint.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {endpoint.description}
                    </p>

                    <details className="text-sm">
                      <summary className="cursor-pointer text-primary hover:underline">
                        View example request
                      </summary>
                      <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-x-auto">
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

              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Real-time Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    Instant NIN verification through direct integration with
                    NIMC database via Dojah API.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Comprehensive Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Access to full identity information including name, date of
                    birth, and photo verification.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Status Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Track verification status and maintain audit trails for
                    compliance requirements.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Secure Processing</h3>
                  <p className="text-sm text-muted-foreground">
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
    </div>
  );
}
