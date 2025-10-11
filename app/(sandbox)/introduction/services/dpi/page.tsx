"use client";

import { useSearchParams } from "next/navigation";
import { ApiClientInterface } from "../components/api-client-interface";
import { Badge } from "@/components/ui/badge";
import { Shield, Code, Users, BarChart3 } from "lucide-react";
import { AccessAwarePageNavigation } from "@/app/(sandbox)/components/access-aware-page-navigation";
import { SuspenseWrapper } from "../components/suspense-wrapper";
import { CodeBlock } from "../components/code-block";
import { LanguageSelector } from "../components/language-selector";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.dsnsandbox.com";

const dpiEndpoints = [
  {
    name: "National Identity Number (NIN) Lookup",
    method: "POST",
    path: "/api/v1/dpi/nin/lookup",
    description:
      "Performs a lookup of the provided 11-digit NIN against the national identity database",
    examples: {
      curl: `curl -X POST ${baseUrl}/api/v1/dpi/nin/lookup \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "nin": "25822858953",
    "test_mode": false
  }'`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/dpi/nin/lookup', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nin: "25822858953",
    test_mode: false
  })
});`,
      python: `import requests

response = requests.post(
    '${baseUrl}/api/v1/dpi/nin/lookup',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'nin': '25822858953',
        'test_mode': False
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/dpi/nin/lookup');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'nin' => '25822858953',
    'test_mode' => false
]));
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/dpi/nin/lookup"))
    .header("Authorization", "Bearer " + token)
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{\\"nin\\":\\"25822858953\\",\\"test_mode\\":false}"
    ))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      status: "verified",
      nin: "25822858953",
      data: {
        first_name: "CHUKWU",
        last_name: "EMEKA",
        middle_name: "JUDE",
        date_of_birth: "1990-01-01",
        gender: "M",
        phone_number: "08031234567",
        email: "c.emeka@example.com",
        address: "45 MAIN ROAD, PORT HARCOURT",
        state_of_origin: "Rivers",
        lga_of_origin: "Obio-Akpor",
        nin: "25822858953",
        photo: "base64_encoded_image_string...",
        enrollment_bank: "UBA",
        level_of_account: "Tier 3",
        watch_listed: false,
      },
      verification_id: "ver_nin_001234567",
      timestamp: "2025-10-09T14:45:30Z",
      cost: 150.0,
    },
  },
  {
    name: "Bank Verification Number (BVN) Lookup",
    method: "POST",
    path: "/api/v1/dpi/bvn/lookup",
    description:
      "Performs a lookup of the provided 11-digit BVN against the relevant identity database",
    examples: {
      curl: `curl -X POST ${baseUrl}/api/v1/dpi/bvn/lookup \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "bvn": "45678901234",
    "test_mode": false
  }'`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/dpi/bvn/lookup', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    bvn: "45678901234",
    test_mode: false
  })
});`,
      python: `import requests

response = requests.post(
    '${baseUrl}/api/v1/dpi/bvn/lookup',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'bvn': '45678901234',
        'test_mode': False
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/dpi/bvn/lookup');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'bvn' => '45678901234',
    'test_mode' => false
]));
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/dpi/bvn/lookup"))
    .header("Authorization", "Bearer " + token)
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{\\"bvn\\":\\"45678901234\\",\\"test_mode\\":false}"
    ))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      status: "verified",
      bvn: "45678901234",
      data: {
        first_name: "Lelouch",
        last_name: "NGIM",
        middle_name: "Lamperouge",
        date_of_birth: "2002-09-20",
        gender: "Male",
        phone_number: "070223457891",
        email: null,
        address: null,
        state_of_origin: null,
        lga_of_origin: null,
        nin: null,
        photo: null,
        enrollment_bank: null,
        level_of_account: null,
        watch_listed: null,
      },
      verification_id: "ver_bvn_000",
      timestamp: "2025-01-01T00:00:00Z",
      cost: 0,
    },
  },
  {
    name: "Credit Score Lookup",
    method: "POST",
    path: "/api/v1/dpi/credit/score",
    description: "Retrieve credit score information using BVN",
    examples: {
      curl: `curl -X POST ${baseUrl}/api/v1/dpi/credit/score \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "bvn": "45678901234",
    "test_mode": false
  }'`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/dpi/credit/score', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    bvn: "45678901234",
    test_mode: false
  })
});`,
      python: `import requests

response = requests.post(
    '${baseUrl}/api/v1/dpi/credit/score',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'bvn': '45678901234',
        'test_mode': False
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/dpi/credit/score');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'bvn' => '45678901234',
    'test_mode' => false
]));
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/dpi/credit/score"))
    .header("Authorization", "Bearer " + token)
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{\\"bvn\\":\\"45678901234\\",\\"test_mode\\":false}"
    ))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      score_retrieved: false,
      score_data: {},
      bvn: "string",
      data: {
        first_name: "string",
        last_name: "string",
        middle_name: "string",
        date_of_birth: "string",
        gender: "string",
        phone_number: "string",
        email: "user@example.com",
        address: "string",
        state_of_origin: "string",
        lga_of_origin: "string",
        nin: "string",
        photo: "string",
        score: {},
        enrollment_bank: "string",
        level_of_account: "string",
        watch_listed: true,
      },
      verification_id: "string",
      timestamp: "string",
      cost: 0,
    },
  },
  {
    name: "Selfie Verification with NIN",
    method: "POST",
    path: "/api/v1/dpi/selfie/verification/nin",
    description: "Verify identity using selfie photo and NIN comparison",
    examples: {
      curl: `curl -X POST ${baseUrl}/api/v1/dpi/selfie/verification/nin \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "selfie_image": "base64_encoded_selfie_image",
    "nin": "25822858953",
    "test_mode": false,
    "first_name": "CHUKWU",
    "last_name": "EMEKA"
  }'`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/dpi/selfie/verification/nin', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    selfie_image: "base64_encoded_selfie_image",
    nin: "25822858953",
    test_mode: false,
    first_name: "CHUKWU",
    last_name: "EMEKA"
  })
});`,
      python: `import requests

response = requests.post(
    '${baseUrl}/api/v1/dpi/selfie/verification/nin',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'selfie_image': 'base64_encoded_selfie_image',
        'nin': '25822858953',
        'test_mode': False,
        'first_name': 'CHUKWU',
        'last_name': 'EMEKA'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/dpi/selfie/verification/nin');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'selfie_image' => 'base64_encoded_selfie_image',
    'nin' => '25822858953',
    'test_mode' => false,
    'first_name' => 'CHUKWU',
    'last_name' => 'EMEKA'
]));
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/dpi/selfie/verification/nin"))
    .header("Authorization", "Bearer " + token)
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{\\"selfie_image\\":\\"base64_encoded_selfie_image\\",\\"nin\\":\\"25822858953\\",\\"test_mode\\":false,\\"first_name\\":\\"CHUKWU\\",\\"last_name\\":\\"EMEKA\\"}"
    ))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      status: "string",
      nin: "string",
      data: {
        first_name: "CHUKWU",
        last_name: "EMEKA",
        middle_name: "string",
        date_of_birth: "string",
        gender: "string",
        phone_number: "string",
        email: "user@example.com",
        address: "string",
        state_of_origin: "string",
        lga_of_origin: "string",
        nin: "string",
        photo: "string",
        score: {},
        enrollment_bank: "string",
        level_of_account: "string",
        watch_listed: true,
      },
      verification_id: "string",
      timestamp: "string",
      cost: 0,
    },
  },
];

function DPIServiceContent() {
  const searchParams = useSearchParams();
  const selectedEndpoint = searchParams.get("endpoint");

  const endpoint = dpiEndpoints.find((e) => e.path === selectedEndpoint);

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
              Digital Identity Verification Services
            </h1>
          </div>
          <Badge variant="secondary" className="text-xs sm:text-sm">
            Nigerian Identity Records
          </Badge>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Secure lookup service for validating the National Identity Number
          (NIN) and Bank Verification Number (BVN) records of Nigerian citizens.
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
                {dpiEndpoints.map((endpoint, index) => (
                  <div
                    key={`${endpoint.path}-${index}`}
                    className="border rounded-lg p-3 sm:p-4 hover:bg-accent/50 transition-colors w-full"
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-2 gap-2">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full">
                        <Badge variant="default" className="text-xs sm:text-sm">
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
                    Unified Identity Data Model
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    All verification lookups (NIN, BVN) return a unified
                    Identity Data structure under the data field, simplifying
                    integration and data handling across different verification
                    types.
                  </p>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Secure Authentication
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    All endpoints are secured using OAuth 2.0 Bearer Tokens
                    (JWT). A valid token, obtained from the /token endpoint,
                    must be passed in the Authorization header for every
                    request.
                  </p>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Live/Test Mode Control
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    The optional test_mode flag in the request body allows
                    clients to seamlessly switch between the Sandbox (for
                    development and zero-cost mock responses) and Production
                    (for live data and billing) environments.
                  </p>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Biometric Verification
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Advanced selfie verification with NIN comparison for
                    enhanced security and identity confirmation.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Identity Number Formats
              </h2>

              <div className="border rounded-lg p-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-gray-300 px-2 py-1 text-left">
                          Format
                        </th>
                        <th className="border border-gray-300 px-2 py-1 text-left">
                          Length
                        </th>
                        <th className="border border-gray-300 px-2 py-1 text-left">
                          Example
                        </th>
                        <th className="border border-gray-300 px-2 py-1 text-left">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1">
                          NIN
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          11 Digits
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          25822858953
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          <span className="text-green-600">Valid</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1">
                          BVN
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          11 Digits
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          12345678901
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          <span className="text-green-600">Valid</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 lg:p-6 border-t">
        <AccessAwarePageNavigation currentPath="/introduction/services/dpi" />
      </div>
    </div>
  );
}

export default function DPIServicePage() {
  return (
    <SuspenseWrapper>
      <DPIServiceContent />
    </SuspenseWrapper>
  );
}
