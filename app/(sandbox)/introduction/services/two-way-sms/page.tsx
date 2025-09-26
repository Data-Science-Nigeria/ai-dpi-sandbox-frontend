"use client";

import { useSearchParams } from "next/navigation";
import { ApiClientInterface } from "../components/api-client-interface";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Code, BarChart3 } from "lucide-react";
import { AccessAwarePageNavigation } from "@/app/(sandbox)/components/access-aware-page-navigation";
import { SuspenseWrapper } from "../components/suspense-wrapper";
import { CodeBlock } from "../components/code-block";
import { LanguageSelector } from "../components/language-selector";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.dsnsandbox.com";

const twoWaySmsEndpoints = [
  {
    name: "Handle Incoming Customer SMS",
    method: "POST",
    path: "/api/v1/two-way-sms/webhook",
    description: "Webhook endpoint receives incoming SMS",
    examples: {
      curl: `curl -X POST ${baseUrl}/api/v1/two-way-sms/webhook \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": "+2348012345678",
    "to": "+2341234567890",
    "message": "BALANCE",
    "message_id": "msg_incoming_123",
    "timestamp": "2025-08-25T20:45:30Z"
  }'`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/two-way-sms/webhook', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    from: "+2348012345678",
    to: "+2341234567890",
    message: "BALANCE",
    message_id: "msg_incoming_123",
    timestamp: "2025-08-25T20:45:30Z"
  })
});`,
      python: `import requests

response = requests.post(
    '${baseUrl}/api/v1/two-way-sms/webhook',
    headers={
        'Content-Type': 'application/json'
    },
    json={
        'from': '+2348012345678',
        'to': '+2341234567890',
        'message': 'BALANCE',
        'message_id': 'msg_incoming_123',
        'timestamp': '2025-08-25T20:45:30Z'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/two-way-sms/webhook');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'from' => '+2348012345678',
    'to' => '+2341234567890',
    'message' => 'BALANCE',
    'message_id' => 'msg_incoming_123',
    'timestamp' => '2025-08-25T20:45:30Z'
]));
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/two-way-sms/webhook"))
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{"from":"+2348012345678","to":"+2341234567890","message":"BALANCE","message_id":"msg_incoming_123","timestamp":"2025-08-25T20:45:30Z"}"
    ))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      status: "processed",
      conversation_id: "conv_789012",
      auto_reply: {
        message:
          "Your account balance is ₦25,450.00. Reply HELP for more options.",
        sent: true,
        message_id: "msg_reply_456",
      },
      workflow_triggered: "banking_keywords",
    },
  },
  {
    name: "Create Interactive Survey Workflow",
    method: "POST",
    path: "/api/v1/two-way-sms/create-workflow",
    description: "Create interactive survey workflow",
    examples: {
      curl: `curl -X POST ${baseUrl}/api/v1/two-way-sms/create-workflow \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Customer Satisfaction Survey",
    "trigger_keyword": "SURVEY",
    "steps": [
      {
        "step": 1,
        "message": "Thank you for choosing our service! How would you rate your experience? Reply 1-5 (1=Poor, 5=Excellent)",
        "expected_input": "number",
        "validation": "range:1-5"
      },
      {
        "step": 2,
        "message": "What can we improve? Reply with your suggestions or SKIP to finish.",
        "expected_input": "text",
        "optional": true
      },
      {
        "step": 3,
        "message": "Thank you for your feedback! We appreciate your input.",
        "final_step": true
      }
    ]
  }'`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/two-way-sms/create-workflow', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: "Customer Satisfaction Survey",
    trigger_keyword: "SURVEY",
    steps: [
      {
        step: 1,
        message: "Thank you for choosing our service! How would you rate your experience? Reply 1-5 (1=Poor, 5=Excellent)",
        expected_input: "number",
        validation: "range:1-5"
      },
      {
        step: 2,
        message: "What can we improve? Reply with your suggestions or SKIP to finish.",
        expected_input: "text",
        optional: true
      },
      {
        step: 3,
        message: "Thank you for your feedback! We appreciate your input.",
        final_step: true
      }
    ]
  })
});`,
      python: `import requests

response = requests.post(
    '${baseUrl}/api/v1/two-way-sms/create-workflow',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'name': 'Customer Satisfaction Survey',
        'trigger_keyword': 'SURVEY',
        'steps': [
            {
                'step': 1,
                'message': 'Thank you for choosing our service! How would you rate your experience? Reply 1-5 (1=Poor, 5=Excellent)',
                'expected_input': 'number',
                'validation': 'range:1-5'
            },
            {
                'step': 2,
                'message': 'What can we improve? Reply with your suggestions or SKIP to finish.',
                'expected_input': 'text',
                'optional': True
            },
            {
                'step': 3,
                'message': 'Thank you for your feedback! We appreciate your input.',
                'final_step': True
            }
        ]
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/two-way-sms/create-workflow');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'name' => 'Customer Satisfaction Survey',
    'trigger_keyword' => 'SURVEY',
    'steps' => [
        [
            'step' => 1,
            'message' => 'Thank you for choosing our service! How would you rate your experience? Reply 1-5 (1=Poor, 5=Excellent)',
            'expected_input' => 'number',
            'validation' => 'range:1-5'
        ],
        [
            'step' => 2,
            'message' => 'What can we improve? Reply with your suggestions or SKIP to finish.',
            'expected_input' => 'text',
            'optional' => true
        ],
        [
            'step' => 3,
            'message' => 'Thank you for your feedback! We appreciate your input.',
            'final_step' => true
        ]
    ]
]));
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/two-way-sms/create-workflow"))
    .header("Authorization", "Bearer " + token)
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{"name":"Customer Satisfaction Survey","trigger_keyword":"SURVEY","steps":[{"step":1,"message":"Thank you for choosing our service! How would you rate your experience? Reply 1-5 (1=Poor, 5=Excellent)","expected_input":"number","validation":"range:1-5"},{"step":2,"message":"What can we improve? Reply with your suggestions or SKIP to finish.","expected_input":"text","optional":true},{"step":3,"message":"Thank you for your feedback! We appreciate your input.","final_step":true}]}"
    ))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      workflow_id: "wf_survey_001",
      name: "Customer Satisfaction Survey",
      trigger_keyword: "SURVEY",
      status: "active",
      steps_count: 3,
      created_at: "2025-08-25T20:45:30Z",
      message: "Survey workflow created successfully",
    },
  },
  {
    name: "Send Manual Reply",
    method: "POST",
    path: "/api/v1/two-way-sms/send-reply",
    description: "Send manual reply to customer",
    examples: {
      curl: `curl -X POST ${baseUrl}/api/v1/two-way-sms/send-reply \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "conversation_id": "conv_789012",
    "to": "+2348012345678",
    "message": "Hello! A customer service agent will assist you shortly. Your ticket number is #CS001234.",
    "agent_id": "agent_001"
  }'`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/two-way-sms/send-reply', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    conversation_id: "conv_789012",
    to: "+2348012345678",
    message: "Hello! A customer service agent will assist you shortly. Your ticket number is #CS001234.",
    agent_id: "agent_001"
  })
});`,
      python: `import requests

response = requests.post(
    '${baseUrl}/api/v1/two-way-sms/send-reply',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'conversation_id': 'conv_789012',
        'to': '+2348012345678',
        'message': 'Hello! A customer service agent will assist you shortly. Your ticket number is #CS001234.',
        'agent_id': 'agent_001'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/two-way-sms/send-reply');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'conversation_id' => 'conv_789012',
    'to' => '+2348012345678',
    'message' => 'Hello! A customer service agent will assist you shortly. Your ticket number is #CS001234.',
    'agent_id' => 'agent_001'
]));
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/two-way-sms/send-reply"))
    .header("Authorization", "Bearer " + token)
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{"conversation_id":"conv_789012","to":"+2348012345678","message":"Hello! A customer service agent will assist you shortly. Your ticket number is #CS001234.","agent_id":"agent_001"}"
    ))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      status: "sent",
      message_id: "msg_reply_789",
      conversation_id: "conv_789012",
      to: "+2348012345678",
      cost: 4.5,
      timestamp: "2025-08-25T20:46:00Z",
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
        <AccessAwarePageNavigation currentPath="/introduction/services/two-way-sms" />
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
