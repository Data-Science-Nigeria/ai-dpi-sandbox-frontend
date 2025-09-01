"use client";

import { useSearchParams } from "next/navigation";
import { ApiClientInterface } from "../components/api-client-interface";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Users, BarChart3 } from "lucide-react";

const smsEndpoints = [
  {
    name: "Send SMS",
    method: "POST",
    path: "/api/v1/send",
    description: "Send SMS to Nigerian phone number",
    example: {
      to: "+2348012345678",
      message: "Your OTP is 123456. Valid for 5 minutes.",
      sender_id: "MyApp",
    },
  },
  {
    name: "Bulk SMS",
    method: "POST",
    path: "/api/v1/send/bulk",
    description: "Send SMS to multiple Nigerian phone numbers",
    example: {
      recipients: ["+2348012345678", "+2347012345678"],
      message: "Welcome to our DPI platform!",
      sender_id: "MyApp",
    },
  },
  {
    name: "SMS Status",
    method: "GET",
    path: "/api/v1/status/{message_id}",
    description: "Get SMS delivery status",
    example: {
      message_id: "msg_12345",
    },
  },
];

export default function SMSServicePage() {
  const searchParams = useSearchParams();
  const selectedEndpoint = searchParams.get("endpoint");

  const endpoint = smsEndpoints.find((e) => e.path === selectedEndpoint);

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
          <MessageSquare className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">SMS Service</h1>
          <Badge variant="secondary">Nigerian Networks</Badge>
        </div>
        <p className="text-muted-foreground">
          SMS messaging service for Nigerian phone numbers with support for all
          major networks
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="grid gap-6">
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Send className="h-5 w-5" />
                Available Endpoints
              </h2>

              <div className="space-y-4">
                {smsEndpoints.map((endpoint) => (
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
                  <h3 className="font-medium mb-2">Nigerian Networks</h3>
                  <p className="text-sm text-muted-foreground">
                    Support for MTN, Airtel, Glo, and 9mobile networks with
                    optimized delivery routes.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Bulk Messaging</h3>
                  <p className="text-sm text-muted-foreground">
                    Send messages to multiple recipients efficiently with
                    detailed delivery reports.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Delivery Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time delivery status tracking with detailed reporting
                    and analytics.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Custom Sender ID</h3>
                  <p className="text-sm text-muted-foreground">
                    Use custom sender IDs to brand your messages and improve
                    recognition.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Phone Number Formats
              </h2>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Supported Formats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <code className="bg-muted px-2 py-1 rounded">
                      +234XXXXXXXXXX
                    </code>
                    <span className="text-muted-foreground">
                      International format (recommended)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="bg-muted px-2 py-1 rounded">
                      0XXXXXXXXXX
                    </code>
                    <span className="text-muted-foreground">Local format</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium mb-2">Examples</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>MTN: +2348012345678 or 08012345678</div>
                    <div>Airtel: +2347012345678 or 07012345678</div>
                    <div>Glo: +2348052345678 or 08052345678</div>
                    <div>9mobile: +2349012345678 or 09012345678</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
