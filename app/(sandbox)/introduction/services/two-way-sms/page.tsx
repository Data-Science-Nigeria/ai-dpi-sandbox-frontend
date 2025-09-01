"use client";

import { useSearchParams } from "next/navigation";
import { ApiClientInterface } from "../components/api-client-interface";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ArrowLeftRight, BarChart3 } from "lucide-react";

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

export default function TwoWaySMSServicePage() {
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
    <div className="h-full flex flex-col">
      <div className="p-6 border-b bg-card">
        <div className="flex items-center gap-3 mb-2">
          <MessageCircle className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Two-Way SMS</h1>
          <Badge variant="secondary">Interactive Messaging</Badge>
        </div>
        <p className="text-muted-foreground">
          Interactive SMS messaging service for conversational experiences with
          Nigerian customers
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="grid gap-6">
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ArrowLeftRight className="h-5 w-5" />
                Available Endpoints
              </h2>

              <div className="space-y-4">
                {twoWaySmsEndpoints.map((endpoint) => (
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
                  <h3 className="font-medium mb-2">Session Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Maintain conversation context across multiple SMS exchanges
                    with session tracking.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Menu-driven Flows</h3>
                  <p className="text-sm text-muted-foreground">
                    Create interactive menus with numbered options for easy
                    customer navigation.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Response Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Intelligent parsing of customer responses with validation
                    and error handling.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Timeout Handling</h3>
                  <p className="text-sm text-muted-foreground">
                    Configurable session timeouts with automatic cleanup and
                    fallback messages.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
