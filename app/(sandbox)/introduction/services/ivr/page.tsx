"use client";

import { useSearchParams } from "next/navigation";
import { ApiClientInterface } from "../components/api-client-interface";
import { Badge } from "@/components/ui/badge";
import { Phone, Code, BarChart3, Headphones } from "lucide-react";
import { PageNavigation } from "@/app/(sandbox)/components/page-navigation";
import { getNavigation } from "@/app/(sandbox)/lib/navigation";
import { SuspenseWrapper } from "../components/suspense-wrapper";
import { CodeBlock } from "../components/code-block";

const ivrEndpoints = [
  {
    name: "Create Call",
    method: "POST",
    path: "/api/v1/call",
    description: "Initiate IVR call to Nigerian phone number",
    example: {
      to: "+2348012345678",
      flow_id: "customer_service_flow",
      language: "en",
      fallback_language: "ha",
      variables: {
        customer_name: "Adebayo Johnson",
        account_balance: "125,500",
        last_transaction: "Transfer to Kemi - ₦15,000",
        account_type: "Savings",
        branch_name: "Victoria Island",
      },
      settings: {
        max_duration: 300,
        retry_attempts: 2,
        timeout_seconds: 30,
        record_call: true,
        dtmf_timeout: 10,
      },
      callback_url: "https://myapp.com/webhooks/ivr-status",
      metadata: {
        user_id: "user_789",
        session_id: "sess_456",
        purpose: "account_inquiry",
      },
    },
    response: {
      status: "success",
      call_id: "call_abc123",
      to: "+2348012345678",
      flow_id: "customer_service_flow",
      call_status: "initiated",
      estimated_duration: 180,
      cost_estimate: 25.5,
      currency: "NGN",
      created_at: "2024-01-15T10:30:00Z",
      expected_completion: "2024-01-15T10:33:00Z",
      tracking_url: "https://api.myapp.com/calls/call_abc123/status",
    },
  },
  {
    name: "Call Status",
    method: "GET",
    path: "/api/v1/call/{call_id}",
    description: "Get IVR call status and results",
    example: {
      call_id: "call_abc123",
    },
    response: {
      call_id: "call_abc123",
      status: "completed",
      call_details: {
        to: "+2348012345678",
        duration: 165,
        start_time: "2024-01-15T10:30:05Z",
        end_time: "2024-01-15T10:32:50Z",
        answered: true,
        completion_reason: "user_hangup",
      },
      flow_execution: {
        flow_id: "customer_service_flow",
        steps_completed: 4,
        total_steps: 5,
        user_inputs: [
          { step: "main_menu", input: "1", timestamp: "2024-01-15T10:30:15Z" },
          {
            step: "account_menu",
            input: "2",
            timestamp: "2024-01-15T10:30:45Z",
          },
          {
            step: "balance_inquiry",
            input: "#",
            timestamp: "2024-01-15T10:31:30Z",
          },
        ],
        final_action: "balance_provided",
      },
      cost: {
        total_cost: 22.75,
        currency: "NGN",
        breakdown: {
          connection_fee: 5.0,
          per_minute_rate: 10.75,
          minutes_billed: 2.75,
        },
      },
      recording_url: "https://recordings.myapp.com/call_abc123.mp3",
    },
  },
];

function IVRServiceContent() {
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
    <div className="h-full flex flex-col w-full">
      <div className="p-3 sm:p-4 lg:p-6 border-b bg-card mt-4 sm:mt-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
              IVR Service
            </h1>
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

      <div className="flex-1 overflow-auto custom-scrollbar">
        <div className="p-3 sm:p-4 lg:p-6 w-full max-w-full">
          <div className="grid gap-3 xs:gap-4 sm:gap-6">
            <section>
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                <Code className="h-4 w-4 sm:h-5 sm:w-5" />
                Available Endpoints
              </h2>

              <div className="space-y-3 sm:space-y-4">
                {ivrEndpoints.map((endpoint) => (
                  <div
                    key={endpoint.path}
                    className="border rounded-lg p-3 sm:p-4 hover:bg-accent/50 transition-colors w-full"
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-2 gap-2">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full">
                        <Badge
                          variant={
                            endpoint.method === "GET" ? "secondary" : "default"
                          }
                          className="text-xs sm:text-sm"
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-xs sm:text-sm bg-muted px-2 py-1 rounded break-all w-full sm:w-auto">
                          {endpoint.path}
                        </code>
                      </div>
                    </div>

                    <h3 className="font-medium mb-1 text-sm sm:text-base lg:text-lg">
                      {endpoint.name}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-3">
                      {endpoint.description}
                    </p>

                    <div className="space-y-3 w-full">
                      <div className="w-full">
                        <h4 className="text-sm sm:text-base font-medium mb-2">
                          Request Example
                        </h4>
                        <CodeBlock
                          code={JSON.stringify(endpoint.example, null, 2)}
                          language="json"
                          title={`${endpoint.method} Request Body`}
                        />
                      </div>
                      {endpoint.response && (
                        <div className="w-full">
                          <h4 className="text-sm sm:text-base font-medium mb-2">
                            Response Example
                          </h4>
                          <CodeBlock
                            code={JSON.stringify(endpoint.response, null, 2)}
                            language="json"
                            title="200 OK Response"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Features
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Multi-language Support
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Support for English, Hausa, Yoruba, and Igbo languages for
                    better customer experience.
                  </p>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    USSD Integration
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Seamless integration with USSD codes for feature phone
                    compatibility.
                  </p>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Call Flow Management
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Design complex call flows with branching logic and dynamic
                    content.
                  </p>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Real-time Analytics
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Customer Support
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-2">
                    Automated customer service with menu options and call
                    routing.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    • Account balance inquiries
                    <br />
                    • Transaction history
                    <br />• Support ticket creation
                  </div>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Payment Notifications
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-2">
                    Automated payment confirmations and reminders.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    • Payment confirmations
                    <br />
                    • Due date reminders
                    <br />• Account updates
                  </div>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Survey & Feedback
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-2">
                    Collect customer feedback through voice surveys.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    • Service satisfaction
                    <br />
                    • Product feedback
                    <br />• Market research
                  </div>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Authentication
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-2">
                    Voice-based OTP and identity verification.
                  </p>
                  <div className="text-sm text-muted-foreground">
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
      </div>

      <div className="p-3 sm:p-4 lg:p-6 border-t">
        <PageNavigation {...getNavigation("/introduction/services/ivr")} />
      </div>
    </div>
  );
}

export default function IVRServicePage() {
  return (
    <SuspenseWrapper>
      <IVRServiceContent />
    </SuspenseWrapper>
  );
}
