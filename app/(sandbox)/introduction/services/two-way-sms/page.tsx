"use client";

import { useSearchParams } from "next/navigation";
import { ApiClientInterface } from "../components/api-client-interface";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Code, BarChart3 } from "lucide-react";
import { PageNavigation } from "@/app/(sandbox)/components/page-navigation";
import { getNavigation } from "@/app/(sandbox)/lib/navigation";
import { SuspenseWrapper } from "../components/suspense-wrapper";

const twoWaySmsEndpoints = [
  {
    name: "Send Interactive SMS",
    method: "POST",
    path: "/api/v1/interactive",
    description: "Send interactive SMS with response options",
    example: {
      to: "+2348012345678",
      message: "Reply with 1 for Balance, 2 for History, 3 for Support",
      session_id: "session_12345",
      timeout: 300,
    },
  },
  {
    name: "Handle Response",
    method: "POST",
    path: "/api/v1/response",
    description: "Process incoming SMS response",
    example: {
      from: "+2348012345678",
      message: "1",
      session_id: "session_12345",
    },
  },
];

function TwoWaySMSServiceContent() {
  const searchParams = useSearchParams();
  const selectedEndpoint = searchParams.get("endpoint");

  const endpoint = twoWaySmsEndpoints.find((e) => e.path === selectedEndpoint);

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
            <MessageCircle className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-lg xs:text-xl sm:text-2xl font-bold leading-tight">
              Two-Way SMS
            </h1>
          </div>
          <Badge
            variant="secondary"
            className="text-[10px] xs:text-xs sm:text-sm"
          >
            Interactive Messaging
          </Badge>
        </div>
        <p className="text-xs xs:text-sm sm:text-base text-muted-foreground leading-tight">
          Interactive SMS messaging service for conversational experiences with
          Nigerian customers
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 xs:p-3 sm:p-6">
          <div className="grid gap-3 xs:gap-4 sm:gap-6">
            <section>
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                <Code className="h-4 w-4 sm:h-5 sm:w-5" />
                Available Endpoints
              </h2>

              <div className="space-y-3 sm:space-y-4">
                {twoWaySmsEndpoints.map((endpoint) => (
                  <div
                    key={endpoint.path}
                    className="border rounded-lg p-3 sm:p-4 hover:bg-accent/50 transition-colors"
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
                    Session Management
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Maintain conversation context across multiple SMS exchanges
                    with session tracking.
                  </p>
                </div>

                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Menu-driven Flows
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Create interactive menus with numbered options for easy
                    customer navigation.
                  </p>
                </div>

                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Response Processing
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Intelligent parsing of customer responses with validation
                    and error handling.
                  </p>
                </div>

                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Timeout Handling
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Configurable session timeouts with automatic cleanup and
                    fallback messages.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </ScrollArea>

      <div className="p-2 xs:p-3 sm:p-6 border-t">
        <PageNavigation
          {...getNavigation("/introduction/services/two-way-sms")}
        />
      </div>
    </div>
  );
}

export default function TwoWaySMSServicePage() {
  return (
    <SuspenseWrapper>
      <TwoWaySMSServiceContent />
    </SuspenseWrapper>
  );
}
