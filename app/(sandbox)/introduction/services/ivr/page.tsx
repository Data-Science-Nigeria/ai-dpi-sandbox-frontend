"use client";

import { useSearchParams } from "next/navigation";
import { ApiClientInterface } from "../components/api-client-interface";
import { Badge } from "@/components/ui/badge";
import { Phone, Code, BarChart3, Headphones } from "lucide-react";
import { AccessAwarePageNavigation } from "@/app/(sandbox)/components/access-aware-page-navigation";
import { SuspenseWrapper } from "../components/suspense-wrapper";
import { CodeBlock } from "../components/code-block";
import { LanguageSelector } from "../components/language-selector";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.dsnsandbox.com";

const ivrEndpoints = [
  {
    name: "Create Banking IVR Flow",
    method: "POST",
    path: "/api/v1/ivr/create-flow",
    description: "Create IVR flow for banking services",
    examples: {
      curl: `curl -X POST ${baseUrl}/api/v1/ivr/create-flow \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Banking IVR",
    "language": "english_ng",
    "flow": {
      "welcome": {
        "message": "Welcome to First Bank. Press 1 for account balance, 2 for transaction history, 3 for customer service",
        "options": {
          "1": "check_balance",
          "2": "transaction_history",
          "3": "customer_service"
        }
      },
      "check_balance": {
        "message": "Please enter your account number followed by the hash key",
        "input_type": "account_number",
        "next": "balance_response"
      }
    }
  }'`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/ivr/create-flow', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: "Banking IVR",
    language: "english_ng",
    flow: {
      welcome: {
        message: "Welcome to First Bank. Press 1 for account balance, 2 for transaction history, 3 for customer service",
        options: {
          "1": "check_balance",
          "2": "transaction_history",
          "3": "customer_service"
        }
      },
      check_balance: {
        message: "Please enter your account number followed by the hash key",
        input_type: "account_number",
        next: "balance_response"
      }
    }
  })
});`,
      python: `import requests

response = requests.post(
    '${baseUrl}/api/v1/ivr/create-flow',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'name': 'Banking IVR',
        'language': 'english_ng',
        'flow': {
            'welcome': {
                'message': 'Welcome to First Bank. Press 1 for account balance, 2 for transaction history, 3 for customer service',
                'options': {
                    '1': 'check_balance',
                    '2': 'transaction_history',
                    '3': 'customer_service'
                }
            },
            'check_balance': {
                'message': 'Please enter your account number followed by the hash key',
                'input_type': 'account_number',
                'next': 'balance_response'
            }
        }
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/ivr/create-flow');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'name' => 'Banking IVR',
    'language' => 'english_ng',
    'flow' => [
        'welcome' => [
            'message' => 'Welcome to First Bank. Press 1 for account balance, 2 for transaction history, 3 for customer service',
            'options' => [
                '1' => 'check_balance',
                '2' => 'transaction_history',
                '3' => 'customer_service'
            ]
        ],
        'check_balance' => [
            'message' => 'Please enter your account number followed by the hash key',
            'input_type' => 'account_number',
            'next' => 'balance_response'
        ]
    ]
]));
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/ivr/create-flow"))
    .header("Authorization", "Bearer " + token)
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{"name":"Banking IVR","language":"english_ng","flow":{"welcome":{"message":"Welcome to First Bank. Press 1 for account balance, 2 for transaction history, 3 for customer service","options":{"1":"check_balance","2":"transaction_history","3":"customer_service"}},"check_balance":{"message":"Please enter your account number followed by the hash key","input_type":"account_number","next":"balance_response"}}}"
    ))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      flow_id: "banking_ivr_001",
      name: "Banking IVR",
      language: "english_ng",
      status: "active",
      created_at: "2025-01-15T10:30:00Z",
      steps_count: 2,
      estimated_duration: "3-5 minutes",
      message: "IVR flow created successfully",
    },
  },
  {
    name: "Handle Incoming Call",
    method: "POST",
    path: "/api/v1/ivr/handle-call",
    description: "Handle incoming IVR call",
    examples: {
      curl: `curl -X POST ${baseUrl}/api/v1/ivr/handle-call \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "call_id": "call_123456",
    "from": "+2348012345678",
    "to": "+2341234567890",
    "flow_id": "banking_ivr_001"
  }'`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/ivr/handle-call', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    call_id: "call_123456",
    from: "+2348012345678",
    to: "+2341234567890",
    flow_id: "banking_ivr_001"
  })
});`,
      python: `import requests

response = requests.post(
    '${baseUrl}/api/v1/ivr/handle-call',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'call_id': 'call_123456',
        'from': '+2348012345678',
        'to': '+2341234567890',
        'flow_id': 'banking_ivr_001'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/ivr/handle-call');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'call_id' => 'call_123456',
    'from' => '+2348012345678',
    'to' => '+2341234567890',
    'flow_id' => 'banking_ivr_001'
]));
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/ivr/handle-call"))
    .header("Authorization", "Bearer " + token)
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{"call_id":"call_123456","from":"+2348012345678","to":"+2341234567890","flow_id":"banking_ivr_001"}"
    ))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      call_id: "call_123456",
      status: "in_progress",
      current_step: "welcome",
      response: {
        action: "play_message",
        message: "Welcome to First Bank. Press 1 for account balance...",
        voice: "nigerian_female",
        language: "english_ng",
      },
      next_expected: "dtmf_input",
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
                      <LanguageSelector
                        examples={endpoint.examples}
                        title="Request Example"
                      />
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
        <AccessAwarePageNavigation currentPath="/introduction/services/ivr" />
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
