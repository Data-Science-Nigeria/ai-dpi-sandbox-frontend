"use client";

import { useSearchParams } from "next/navigation";
import { ApiClientInterface } from "../components/api-client-interface";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Code, Users, BarChart3 } from "lucide-react";
import { PageNavigation } from "@/app/(sandbox)/components/page-navigation";
import { getNavigation } from "@/app/(sandbox)/lib/navigation";
import { SuspenseWrapper } from "../components/suspense-wrapper";
import { CodeBlock } from "../components/code-block";
import { LanguageSelector } from "../components/language-selector";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const smsEndpoints = [
  {
    name: "Send OTP for User Verification",
    method: "POST",
    path: "/api/v1/sms/send",
    description: "Send SMS to Nigerian phone number",
    examples: {
      curl: `curl -X POST ${baseUrl}/api/v1/sms/send \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+2348012345678",
    "message": "Your OTP is 123456. Valid for 5 minutes. Do not share with anyone.",
    "type": "otp"
  }'`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/sms/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: "+2348012345678",
    message: "Your OTP is 123456. Valid for 5 minutes. Do not share with anyone.",
    type: "otp"
  })
});`,
      python: `import requests

response = requests.post(
    '${baseUrl}/api/v1/sms/send',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'to': '+2348012345678',
        'message': 'Your OTP is 123456. Valid for 5 minutes. Do not share with anyone.',
        'type': 'otp'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/sms/send');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'to' => '+2348012345678',
    'message' => 'Your OTP is 123456. Valid for 5 minutes. Do not share with anyone.',
    'type' => 'otp'
]));
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/sms/send"))
    .header("Authorization", "Bearer " + token)
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{"to":"+2348012345678","message":"Your OTP is 123456. Valid for 5 minutes. Do not share with anyone.","type":"otp"}"
    ))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      status: "sent",
      message_id: "msg_sms_789012345",
      to: "+2348012345678",
      message: "Your OTP is 123456. Valid for 5 minutes.",
      network: "MTN",
      cost: 4.5,
      units_used: 1,
      timestamp: "2025-08-25T20:45:30Z",
      estimated_delivery: "2025-08-25T20:45:35Z",
    },
  },
  {
    name: "Send Payment Confirmation",
    method: "POST",
    path: "/api/v1/sms/send",
    description: "Send payment confirmation SMS",
    examples: {
      curl: `curl -X POST ${baseUrl}/api/v1/sms/send \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+2348012345678",
    "message": "Payment of ₦5,000 received successfully. Transaction ID: TXN123456. Thank you for your business!",
    "type": "notification"
  }'`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/sms/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: "+2348012345678",
    message: "Payment of ₦5,000 received successfully. Transaction ID: TXN123456. Thank you for your business!",
    type: "notification"
  })
});`,
      python: `import requests

response = requests.post(
    '${baseUrl}/api/v1/sms/send',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'to': '+2348012345678',
        'message': 'Payment of ₦5,000 received successfully. Transaction ID: TXN123456. Thank you for your business!',
        'type': 'notification'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/sms/send');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'to' => '+2348012345678',
    'message' => 'Payment of ₦5,000 received successfully. Transaction ID: TXN123456. Thank you for your business!',
    'type' => 'notification'
]));
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/sms/send"))
    .header("Authorization", "Bearer " + token)
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{"to":"+2348012345678","message":"Payment of ₦5,000 received successfully. Transaction ID: TXN123456. Thank you for your business!","type":"notification"}"
    ))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      status: "sent",
      message_id: "msg_sms_789012346",
      to: "+2348012345678",
      network: "Airtel",
      cost: 4.5,
      units_used: 1,
    },
  },
  {
    name: "Send Bulk Marketing SMS",
    method: "POST",
    path: "/api/v1/sms/send-bulk",
    description: "Send SMS to multiple Nigerian phone numbers",
    examples: {
      curl: `curl -X POST ${baseUrl}/api/v1/sms/send-bulk \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "recipients": [
      "+2348012345678",
      "+2348087654321",
      "+2348098765432"
    ],
    "message": "Special offer! Get 20% off your next purchase. Use code SAVE20. Valid until midnight. Shop now!",
    "type": "marketing",
    "sender_id": "YourBrand"
  }'`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/sms/send-bulk', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    recipients: [
      "+2348012345678",
      "+2348087654321",
      "+2348098765432"
    ],
    message: "Special offer! Get 20% off your next purchase. Use code SAVE20. Valid until midnight. Shop now!",
    type: "marketing",
    sender_id: "YourBrand"
  })
});`,
      python: `import requests

response = requests.post(
    '${baseUrl}/api/v1/sms/send-bulk',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'recipients': [
            '+2348012345678',
            '+2348087654321',
            '+2348098765432'
        ],
        'message': 'Special offer! Get 20% off your next purchase. Use code SAVE20. Valid until midnight. Shop now!',
        'type': 'marketing',
        'sender_id': 'YourBrand'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/sms/send-bulk');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'recipients' => [
        '+2348012345678',
        '+2348087654321',
        '+2348098765432'
    ],
    'message' => 'Special offer! Get 20% off your next purchase. Use code SAVE20. Valid until midnight. Shop now!',
    'type' => 'marketing',
    'sender_id' => 'YourBrand'
]));
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/sms/send-bulk"))
    .header("Authorization", "Bearer " + token)
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{"recipients":["+2348012345678","+2348087654321","+2348098765432"],"message":"Special offer! Get 20% off your next purchase. Use code SAVE20. Valid until midnight. Shop now!","type":"marketing","sender_id":"YourBrand"}"
    ))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      status: "queued",
      batch_id: "batch_sms_456789",
      total_recipients: 3,
      estimated_cost: 13.5,
      estimated_delivery: "2025-08-25T20:50:00Z",
      messages: [
        {
          message_id: "msg_sms_789012347",
          to: "+2348012345678",
          status: "queued",
        },
        {
          message_id: "msg_sms_789012348",
          to: "+2348087654321",
          status: "queued",
        },
        {
          message_id: "msg_sms_789012349",
          to: "+2348098765432",
          status: "queued",
        },
      ],
    },
  },
  {
    name: "Check Message Delivery Status",
    method: "GET",
    path: "/api/v1/sms/status/{message_id}",
    description: "Get SMS delivery status",
    examples: {
      curl: `curl -X GET ${baseUrl}/api/v1/sms/status/msg_sms_789012345 \\
  -H "Authorization: Bearer $TOKEN"`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/sms/status/msg_sms_789012345', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + token
  }
});`,
      python: `import requests

response = requests.get(
    '${baseUrl}/api/v1/sms/status/msg_sms_789012345',
    headers={
        'Authorization': f'Bearer {token}'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/sms/status/msg_sms_789012345');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token
]);
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/sms/status/msg_sms_789012345"))
    .header("Authorization", "Bearer " + token)
    .GET()
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      message_id: "msg_sms_789012345",
      status: "delivered",
      to: "+2348012345678",
      network: "MTN",
      sent_at: "2025-08-25T20:45:30Z",
      delivered_at: "2025-08-25T20:45:33Z",
      cost: 4.5,
    },
  },
];

function SMSServiceContent() {
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
    <div className="h-full flex flex-col w-full">
      <div className="p-3 sm:p-4 lg:p-6 border-b bg-card mt-4 sm:mt-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
              SMS Service
            </h1>
          </div>
          <Badge variant="secondary" className="text-xs sm:text-sm">
            Nigerian Networks
          </Badge>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          SMS messaging service for Nigerian phone numbers with support for all
          major networks
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
                {smsEndpoints.map((endpoint) => (
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
                    Nigerian Networks
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Support for MTN, Airtel, Glo, and 9mobile networks with
                    optimized delivery routes.
                  </p>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Bulk Messaging
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Send messages to multiple recipients efficiently with
                    detailed delivery reports.
                  </p>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Delivery Tracking
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Real-time delivery status tracking with detailed reporting
                    and analytics.
                  </p>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Custom Sender ID
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
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
                </div>

                <div className="mt-4">
                  <h4 className="font-medium mb-2">Invalid formats</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <code className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-2 py-1 rounded">
                        &quot;8012345678&quot;
                      </code>
                      <span className="text-red-600 dark:text-red-400">
                        ❌ (missing leading zero)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-2 py-1 rounded">
                        &quot;2348012345678&quot;
                      </code>
                      <span className="text-red-600 dark:text-red-400">
                        ❌ (missing plus sign)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-2 py-1 rounded">
                        &quot;+234801234567&quot;
                      </code>
                      <span className="text-red-600 dark:text-red-400">
                        ❌ (too short)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium mb-2">Examples</h4>
                  <div className="space-y-1 text-sm">
                    <div className="text-yellow-600 dark:text-yellow-400">
                      MTN: +2348012345678
                    </div>
                    <div className="text-red-600 dark:text-red-400">
                      Airtel: +2347012345678
                    </div>
                    <div className="text-green-800 dark:text-green-600">
                      Glo: +2348052345678
                    </div>
                    <div className="text-green-500 dark:text-green-400">
                      9mobile: +2349012345678
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 lg:p-6 border-t">
        <PageNavigation {...getNavigation("/introduction/services/sms")} />
      </div>
    </div>
  );
}

export default function SMSServicePage() {
  return (
    <SuspenseWrapper>
      <SMSServiceContent />
    </SuspenseWrapper>
  );
}
