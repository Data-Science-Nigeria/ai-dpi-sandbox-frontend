"use client";

import { useSearchParams } from "next/navigation";
import { ApiClientInterface } from "../components/api-client-interface";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Code, AlertTriangle, BarChart3 } from "lucide-react";
import { PageNavigation } from "@/app/(sandbox)/components/page-navigation";
import { getNavigation } from "@/app/(sandbox)/lib/navigation";
import { SuspenseWrapper } from "../components/suspense-wrapper";
import { CodeBlock } from "../components/code-block";
import { LanguageSelector } from "../components/language-selector";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://dsnsandbox.com";

const bvnEndpoints = [
  {
    name: "Full BVN Verification",
    method: "POST",
    path: "/api/v1/verify",
    description: "Full BVN verification with Dojah API",
    examples: {
      curl: `curl -X POST ${baseUrl}/api/v1/verify \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "bvn": "12345678901"
  }'`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/verify', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    bvn: "12345678901"
  })
});`,
      python: `import requests

response = requests.post(
    '${baseUrl}/api/v1/verify',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'bvn': '12345678901'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/verify');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'bvn' => '12345678901'
]));
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/verify"))
    .header("Authorization", "Bearer " + token)
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{"bvn":"12345678901"}"
    ))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      bvn_verified: true,
      verification_data: {
        first_name: "John",
        last_name: "Doe",
        middle_name: "Smith",
        date_of_birth: "1990-01-01",
        gender: "Male",
        phone_number: "08012345678",
        email: "john.doe@email.com",
        address: "123 Main Street, Lagos",
        state_of_origin: "Lagos",
        lga_of_origin: "Lagos Island",
        bvn: "12345678901",
        enrollment_bank: "First Bank",
        enrollment_branch: "Victoria Island",
        watch_listed: "No",
      },
      message: "BVN verified successfully",
    },
  },
  {
    name: "Basic BVN Lookup",
    method: "POST",
    path: "/api/v1/lookup",
    description: "Basic BVN lookup",
    examples: {
      curl: `curl -X POST ${baseUrl}/api/v1/lookup \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "bvn": "12345678901"
  }'`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/lookup', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    bvn: "12345678901"
  })
});`,
      python: `import requests

response = requests.post(
    '${baseUrl}/api/v1/lookup',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'bvn': '12345678901'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/lookup');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'bvn' => '12345678901'
]));
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/lookup"))
    .header("Authorization", "Bearer " + token)
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{"bvn":"12345678901"}"
    ))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      bvn_verified: true,
      verification_data: {
        first_name: "John",
        last_name: "Doe",
        middle_name: "Smith",
        date_of_birth: "1990-01-01",
        gender: "Male",
        phone_number: "08012345678",
        email: "john.doe@email.com",
        address: "123 Main Street, Lagos",
        state_of_origin: "Lagos",
        lga_of_origin: "Lagos Island",
        bvn: "12345678901",
        enrollment_bank: "First Bank",
        enrollment_branch: "Victoria Island",
        watch_listed: "No",
      },
      message: "BVN verified successfully",
    },
  },
  {
    name: "BVN Status Check",
    method: "GET",
    path: "/api/v1/status/{bvn}",
    description: "Get BVN verification status",
    examples: {
      curl: `curl -X GET ${baseUrl}/api/v1/status/12345678901 \\
  -H "Authorization: Bearer $TOKEN"`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/status/12345678901', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + token
  }
});`,
      python: `import requests

response = requests.get(
    '${baseUrl}/api/v1/status/12345678901',
    headers={
        'Authorization': f'Bearer {token}'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/status/12345678901');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token
]);
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/status/12345678901"))
    .header("Authorization", "Bearer " + token)
    .GET()
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      message: "BVN 12345678901 status check",
      bvn: "12345678901",
    },
  },
];

function BVNServiceContent() {
  const searchParams = useSearchParams();
  const selectedEndpoint = searchParams.get("endpoint");

  const endpoint = bvnEndpoints.find((e) => e.path === selectedEndpoint);

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
            <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
              BVN Service
            </h1>
          </div>
          <Badge variant="secondary" className="text-xs sm:text-sm">
            Bank Verification
          </Badge>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Bank Verification Number validation service for Nigerian financial
          identity verification
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
                {bvnEndpoints.map((endpoint) => (
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
                    Financial Identity
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Verify customer financial identity through BVN linked to all
                    Nigerian bank accounts.
                  </p>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Cross-Bank Validation
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Single BVN works across all Nigerian banks for comprehensive
                    customer verification.
                  </p>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    KYC Compliance
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Meet regulatory KYC requirements with CBN-approved BVN
                    verification process.
                  </p>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Fraud Prevention
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Reduce financial fraud with verified customer identity and
                    banking history.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                BVN Format & Requirements
              </h2>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">BVN Format</h3>
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
                        <div className="font-medium">BVN Lookup</div>
                        <div className="text-muted-foreground">
                          Validates BVN format and existence
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="default" className="mt-0.5">
                        Full
                      </Badge>
                      <div>
                        <div className="font-medium">BVN Verification</div>
                        <div className="text-muted-foreground">
                          Complete financial identity verification with banking
                          details
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Use Cases</h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div>
                      <div className="font-medium">Fintech Onboarding</div>
                      <div className="text-muted-foreground">
                        Customer verification for digital banking
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Loan Applications</div>
                      <div className="text-muted-foreground">
                        Identity verification for credit assessment
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Payment Processing</div>
                      <div className="text-muted-foreground">
                        Merchant verification for payment gateways
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Account Opening</div>
                      <div className="text-muted-foreground">
                        Bank account creation and verification
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-blue-600" />
                    Regulatory Compliance
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • BVN verification is regulated by the Central Bank of
                      Nigeria (CBN)
                    </li>
                    <li>• Customer consent required before BVN verification</li>
                    <li>
                      • Data handling must comply with NDPR and CBN guidelines
                    </li>
                    <li>
                      • Verification records must be maintained for audit
                      purposes
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 lg:p-6 border-t">
        <PageNavigation {...getNavigation("/introduction/services/bvn")} />
      </div>
    </div>
  );
}

export default function BVNServicePage() {
  return (
    <SuspenseWrapper>
      <BVNServiceContent />
    </SuspenseWrapper>
  );
}
