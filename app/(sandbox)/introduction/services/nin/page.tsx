"use client";

import { useSearchParams } from "next/navigation";
import { ApiClientInterface } from "../components/api-client-interface";
import { Badge } from "@/components/ui/badge";
import { Shield, Code, AlertTriangle, BarChart3 } from "lucide-react";
import { PageNavigation } from "@/app/(sandbox)/components/page-navigation";
import { getNavigation } from "@/app/(sandbox)/lib/navigation";
import { SuspenseWrapper } from "../components/suspense-wrapper";
import { CodeBlock } from "../components/code-block";
import { LanguageSelector } from "../components/language-selector";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const ninEndpoints = [
  {
    name: "Verify NIN",
    method: "POST",
    path: "/api/v1/nin/verify",
    description: "Verify Nigerian National Identity Number",
    examples: {
      curl: `curl -X POST ${baseUrl}/api/v1/nin/verify \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "nin": "12345678901"
  }'`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/nin/verify', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nin: "12345678901"
  })
});`,
      python: `import requests

response = requests.post(
    '${baseUrl}/api/v1/nin/verify',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'nin': '12345678901'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/nin/verify');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'nin' => '12345678901'
]));
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/nin/verify"))
    .header("Authorization", "Bearer " + token)
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{"nin":"12345678901"}"
    ))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      status: "verified",
      nin: "12345678901",
      data: {
        first_name: "Adebayo",
        last_name: "Ogundimu",
        middle_name: "Tunde",
        date_of_birth: "1990-05-15",
        gender: "Male",
        phone: "+2348012345678",
        email: "adebayo@example.com",
        address: "123 Lagos Street, Victoria Island, Lagos",
        state_of_origin: "Lagos",
        lga_of_origin: "Lagos Island",
      },
      verification_id: "ver_nin_123456789",
      timestamp: "2025-08-25T20:45:30Z",
      cost: 50.0,
    },
  },
  {
    name: "Quick NIN Validation",
    method: "POST",
    path: "/api/v1/nin/lookup",
    description: "Quick NIN validation",
    examples: {
      curl: `curl -X POST ${baseUrl}/api/v1/nin/lookup \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "nin": "12345678901"
  }'`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/nin/lookup', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nin: "12345678901"
  })
});`,
      python: `import requests

response = requests.post(
    '${baseUrl}/api/v1/nin/lookup',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'nin': '12345678901'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/nin/lookup');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'nin' => '12345678901'
]));
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/nin/lookup"))
    .header("Authorization", "Bearer " + token)
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{"nin":"12345678901"}"
    ))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      status: "valid",
      nin: "12345678901",
      exists: true,
      basic_info: {
        first_name: "Adebayo",
        last_name: "Ogundimu",
      },
    },
  },
  {
    name: "Check Verification Status",
    method: "GET",
    path: "/api/v1/nin/status/{nin}",
    description: "Check NIN verification status",
    examples: {
      curl: `curl -X GET ${baseUrl}/api/v1/nin/status/12345678901 \\
  -H "Authorization: Bearer $TOKEN"`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/nin/status/12345678901', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + token
  }
});`,
      python: `import requests

response = requests.get(
    '${baseUrl}/api/v1/nin/status/12345678901',
    headers={
        'Authorization': f'Bearer {token}'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/nin/status/12345678901');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token
]);
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/nin/status/12345678901"))
    .header("Authorization", "Bearer " + token)
    .GET()
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      nin: "12345678901",
      last_verified: "2025-08-25T20:45:30Z",
      verification_count: 3,
      status: "verified",
    },
  },
];

function NINServiceContent() {
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
    <div className="h-full flex flex-col w-full">
      <div className="p-3 sm:p-4 lg:p-6 border-b bg-card mt-4 sm:mt-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
              NIN Service
            </h1>
          </div>
          <Badge variant="secondary" className="text-xs sm:text-sm">
            Identity Verification
          </Badge>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Nigerian National Identity Number verification service powered by
          Dojah API
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
                {ninEndpoints.map((endpoint) => (
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
                    Real-time Verification
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Instant NIN verification through direct integration with
                    NIMC database via Dojah API.
                  </p>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Comprehensive Data
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Access to full identity information including name, date of
                    birth, and photo verification.
                  </p>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Status Tracking
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Track verification status and maintain audit trails for
                    compliance requirements.
                  </p>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Secure Processing
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
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
      </div>

      <div className="p-3 sm:p-4 lg:p-6 border-t">
        <PageNavigation {...getNavigation("/introduction/services/nin")} />
      </div>
    </div>
  );
}

export default function NINServicePage() {
  return (
    <SuspenseWrapper>
      <NINServiceContent />
    </SuspenseWrapper>
  );
}
