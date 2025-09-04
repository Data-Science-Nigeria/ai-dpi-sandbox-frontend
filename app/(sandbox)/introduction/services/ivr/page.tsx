"use client";

import { useSearchParams } from "next/navigation";
import { ApiClientInterface } from "../components/api-client-interface";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Phone, Code, BarChart3, Headphones } from "lucide-react";
import { PageNavigation } from "@/app/(sandbox)/components/page-navigation";
import { getNavigation } from "@/app/(sandbox)/lib/navigation";

const ivrEndpoints = [
  {
    name: "Create Call",
    method: "POST",
    path: "/api/v1/call",
    description: "Initiate IVR call to Nigerian phone number",
    example: {
      to: "+2348012345678",
      flow_id: "welcome_flow",
      variables: {
        customer_name: "John Doe",
        account_balance: "50000",
      },
    },
  },
  {
    name: "Call Status",
    method: "GET",
    path: "/api/v1/call/{call_id}",
    description: "Get IVR call status and results",
    example: {
      call_id: "call_12345",
    },
  },
];

export default function IVRServicePage() {
  const searchParams = useSearchParams();
  const selectedEndpoint = searchParams.get("endpoint");

  const endpoint = ivrEndpoints.find((e) => e.path === selectedEndpoint);

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
      <div className="p-3 sm:p-6 border-b bg-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-xl sm:text-2xl font-bold">IVR Service</h1>
          </div>
          <Badge variant="secondary" className="text-xs sm:text-sm">
            Voice Interactions
          </Badge>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Interactive Voice Response system for automated phone interactions
          with Nigerian customers
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 sm:p-6">
          <div className="grid gap-4 sm:gap-6">
            <section>
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                <Code className="h-4 w-4 sm:h-5 sm:w-5" />
                Available Endpoints
              </h2>

              <div className="space-y-3 sm:space-y-4">
                {ivrEndpoints.map((endpoint) => (
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
                    Multi-language Support
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Support for English, Hausa, Yoruba, and Igbo languages for
                    better customer experience.
                  </p>
                </div>

                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    USSD Integration
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Seamless integration with USSD codes for feature phone
                    compatibility.
                  </p>
                </div>

                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Call Flow Management
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Design complex call flows with branching logic and dynamic
                    content.
                  </p>
                </div>

                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Real-time Analytics
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Track call completion rates, user interactions, and system
                    performance.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Headphones className="h-5 w-5" />
                Use Cases
              </h2>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Customer Support
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                    Automated customer service with menu options and call
                    routing.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    • Account balance inquiries
                    <br />
                    • Transaction history
                    <br />• Support ticket creation
                  </div>
                </div>

                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Payment Notifications
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                    Automated payment confirmations and reminders.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    • Payment confirmations
                    <br />
                    • Due date reminders
                    <br />• Account updates
                  </div>
                </div>

                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Survey & Feedback
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                    Collect customer feedback through voice surveys.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    • Service satisfaction
                    <br />
                    • Product feedback
                    <br />• Market research
                  </div>
                </div>

                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Authentication
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                    Voice-based OTP and identity verification.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    • Voice OTP delivery
                    <br />
                    • PIN verification
                    <br />• Account authentication
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </ScrollArea>

      <div className="p-3 sm:p-6 border-t">
        <PageNavigation {...getNavigation("/introduction/services/ivr")} />
      </div>
    </div>
  );
}
