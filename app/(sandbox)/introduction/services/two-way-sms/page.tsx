"use client";

import { useSearchParams } from "next/navigation";
import { ApiClientInterface } from "../components/api-client-interface";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Code, BarChart3 } from "lucide-react";
import { PageNavigation } from "@/app/(sandbox)/components/page-navigation";
import { getNavigation } from "@/app/(sandbox)/lib/navigation";
import { SuspenseWrapper } from "../components/suspense-wrapper";
import { CodeBlock } from "../components/code-block";

const twoWaySmsEndpoints = [
  {
    name: "Send Interactive SMS",
    method: "POST",
    path: "/api/v1/interactive",
    description: "Send interactive SMS with response options",
    example: {
      to: "+2348012345678",
      message:
        "Welcome to MyBank!\n\nReply:\n1 - Balance\n2 - History\n3 - Transfer\n4 - Support\n\nExpires in 5 min",
      session_id: "session_abc123",
      timeout: 300,
      sender_id: "MyBank",
      session_data: {
        user_id: "user_789",
        account_number: "1234567890",
        customer_name: "Adebayo Johnson",
        account_type: "savings",
      },
      menu_options: [
        { key: "1", action: "check_balance", description: "Check Balance" },
        {
          key: "2",
          action: "transaction_history",
          description: "Transaction History",
        },
        { key: "3", action: "transfer_money", description: "Transfer Money" },
        {
          key: "4",
          action: "customer_support",
          description: "Customer Support",
        },
      ],
      fallback_message: "Invalid option. Please reply with 1, 2, 3, or 4.",
      callback_url: "https://myapp.com/webhooks/sms-response",
    },
    response: {
      status: "success",
      session_id: "session_abc123",
      message_id: "msg_interactive_001",
      to: "+2348012345678",
      message_sent:
        "Welcome to MyBank!\n\nReply:\n1 - Balance\n2 - History\n3 - Transfer\n4 - Support\n\nExpires in 5 min",
      session_expires_at: "2024-01-15T10:35:00Z",
      cost: 4.5,
      currency: "NGN",
      created_at: "2024-01-15T10:30:00Z",
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
      session_id: "session_abc123",
      received_at: "2024-01-15T10:31:30Z",
      network: "MTN",
    },
    response: {
      status: "success",
      session_id: "session_abc123",
      action_taken: "check_balance",
      response_message: {
        to: "+2348012345678",
        message:
          "Balance: ₦125,500.00\n\nLast Transaction:\nTo: Kemi Johnson\nAmount: ₦15,000\nDate: Jan 14\n\nReply MENU or END",
        message_id: "msg_response_001",
      },
      session_data: {
        user_id: "user_789",
        account_number: "1234567890",
        current_balance: 125500.0,
        last_transaction: {
          type: "transfer",
          amount: 15000,
          recipient: "Kemi Johnson",
          date: "2024-01-14T15:30:00Z",
        },
      },
      next_actions: [
        { key: "MENU", action: "return_to_menu" },
        { key: "END", action: "end_session" },
      ],
      cost: 4.5,
      currency: "NGN",
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
    <div className="h-full flex flex-col w-full">
      <div className="p-3 sm:p-4 lg:p-6 border-b bg-card mt-4 sm:mt-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
              Two-Way SMS
            </h1>
          </div>
          <Badge variant="secondary" className="text-xs sm:text-sm">
            Interactive Messaging
          </Badge>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Interactive SMS messaging service for conversational experiences with
          Nigerian customers
        </p>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        <div className="p-3 sm:p-4 lg:p-6 w-full max-w-full">
          <div className="grid gap-3 xs:gap-4 sm:gap-6">
            <section>
              <h2 className="text-sm xs:text-base sm:text-lg font-semibold mb-2 xs:mb-3 sm:mb-4 flex items-center gap-1 xs:gap-2">
                <Code className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
                Available Endpoints
              </h2>

              <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                {twoWaySmsEndpoints.map((endpoint) => (
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
                    Session Management
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Maintain conversation context across multiple SMS exchanges
                    with session tracking.
                  </p>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Menu-driven Flows
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Create interactive menus with numbered options for easy
                    customer navigation.
                  </p>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Response Processing
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Intelligent parsing of customer responses with validation
                    and error handling.
                  </p>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Timeout Handling
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Configurable session timeouts with automatic cleanup and
                    fallback messages.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Session Configuration
              </h2>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Session Settings</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <code className="bg-muted px-2 py-1 rounded">
                        timeout: 300
                      </code>
                      <span className="text-muted-foreground">
                        Session timeout in seconds (5 minutes)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="bg-muted px-2 py-1 rounded">
                        max_steps: 10
                      </code>
                      <span className="text-muted-foreground">
                        Maximum conversation steps
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Response Types</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">
                        Menu
                      </Badge>
                      <div>
                        <div className="font-medium">Numbered Options</div>
                        <div className="text-muted-foreground">
                          1, 2, 3... for menu selection
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">
                        Keywords
                      </Badge>
                      <div>
                        <div className="font-medium">Text Commands</div>
                        <div className="text-muted-foreground">
                          MENU, END, HELP, BACK
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Use Cases</h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div>
                      <div className="font-medium">Banking Services</div>
                      <div className="text-muted-foreground">
                        Account operations and balance inquiries
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Customer Support</div>
                      <div className="text-muted-foreground">
                        Automated help desk and ticket creation
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">E-commerce</div>
                      <div className="text-muted-foreground">
                        Order tracking and product catalogs
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Surveys</div>
                      <div className="text-muted-foreground">
                        Interactive feedback collection
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                    Best Practices
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Keep menu options simple and numbered</li>
                    <li>• Provide clear instructions in each message</li>
                    <li>• Include fallback options for invalid responses</li>
                    <li>• Set appropriate session timeouts</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 lg:p-6 border-t">
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
