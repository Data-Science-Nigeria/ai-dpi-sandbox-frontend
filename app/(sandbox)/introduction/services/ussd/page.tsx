"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Phone, Zap } from "lucide-react";
import { PageNavigation } from "@/app/(sandbox)/components/page-navigation";
import { SuspenseWrapper } from "../components/suspense-wrapper";
import { CodeBlock } from "../components/code-block";
import { LanguageSelector } from "../components/language-selector";
import { authenticationGetApiV1AuthMeReadUserMe } from "@/client";
import {
  getStartupByUser,
  getUssdEndpointName,
  type Startup,
} from "../../types/startup-config";
import { hasServiceAccess } from "../../types/access-control";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.dsnsandbox.com";

function UssdServiceContent() {
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await authenticationGetApiV1AuthMeReadUserMe();
        if (data) {
          const matchedStartup = getStartupByUser(
            data.id,
            data.email,
            data.username || undefined
          );
          setStartup(matchedStartup);
        }
      } catch {
        const defaultStartup = getStartupByUser();
        setStartup(defaultStartup);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return null;
  }

  if (!startup) {
    return <div className="p-6">Error loading page</div>;
  }

  const endpointName = getUssdEndpointName(startup.username);

  const examples = {
    curl: `curl -X POST "${baseUrl}/ussd/api/v1/test_${endpointName}_ussd" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "sessionId=lirwf23455&serviceCode=${startup.serviceCode || ""}&phoneNumber=%2B2348103317200&text="`,
    javascript: `const response = await fetch('${baseUrl}/ussd/api/v1/test_${endpointName}_ussd', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams({
    sessionId: 'lirwf23455',
    serviceCode: '${startup.serviceCode || ""}',
    phoneNumber: '+2348103317200',
    text: ''
  })
});`,
    python: `import requests

response = requests.post(
    '${baseUrl}/ussd/api/v1/test_${endpointName}_ussd',
    headers={'Authorization': f'Bearer {token}'},
    data={
        'sessionId': 'lirwf23455',
        'serviceCode': '${startup.serviceCode || ""}',
        'phoneNumber': '+2348103317200',
        'text': ''
    }
)`,
    php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/ussd/api/v1/test_${endpointName}_ussd');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/x-www-form-urlencoded'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
    'sessionId' => 'lirwf23455',
    'serviceCode' => '${startup.serviceCode || ""}',
    'phoneNumber' => '+2348103317200',
    'text' => ''
]));
$response = curl_exec($ch);
curl_close($ch);`,
    java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/ussd/api/v1/test_${endpointName}_ussd"))
    .header("Authorization", "Bearer " + token)
    .header("Content-Type", "application/x-www-form-urlencoded")
    .POST(HttpRequest.BodyPublishers.ofString(
        "sessionId=lirwf23455&serviceCode=${startup.serviceCode || ""}&phoneNumber=%2B2348103317200&text="))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
  };

  const codeExample = `@router.post("/test_${endpointName}_ussd")
async def test_${endpointName}_ussd(
    sessionId: str = Form(...),
    serviceCode: str = Form("${startup.serviceCode || ""}"),
    phoneNumber: str = Form(...),
    text: str = Form("")
):
    """
    Test endpoint for ${startup.name} USSD logic.
    Accepts POST form data and returns the same response as /${startup.username}_ussd.
    
    Requires: 
    sessionId e.g., lirwf23455 
    phoneNumber e.g., +2348103317200 
    text (location of interest in the pipeline) e.g., "" (empty for first interaction), "1", "1*1", etc. like you would interact with USSD codes
    """
    # Simulate the same logic as in callback_${endpointName}
    if text == '' or text == 'default':
        response = "CON Welcome to ${startup.name} USSD\\n"
        response += "1. Track your cycle\\n"
        response += "2. Get fertility tips"
    elif text == '1':
        response = "END Cycle tracking information updated."
    elif text == '2':
        response = "END A tip has been sent to your phone."
    else:
        response = "END Invalid choice for ${startup.name} USSD"
    return PlainTextResponse(content=response)`;

  return (
    <div className="h-full flex flex-col w-full">
      <div className="p-3 sm:p-4 lg:p-6 border-b bg-card mt-4 sm:mt-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
              USSD Services
            </h1>
          </div>
          <Badge variant="secondary" className="text-xs sm:text-sm">
            Unstructured Supplementary Service Data
          </Badge>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground mb-4">
          Hello <strong>{startup.name}</strong>,
        </p>
        <div className="space-y-3">
          <div>
            <span className="text-sm text-muted-foreground">
              Your service code is{" "}
            </span>
            {startup.serviceCode ? (
              <code className="bg-muted px-2 py-1 rounded font-mono">
                {startup.serviceCode}
              </code>
            ) : (
              <span className="text-muted-foreground italic">
                Not assigned yet
              </span>
            )}
          </div>
          <div>
            <span className="text-sm text-muted-foreground">
              Here is your callback url:
            </span>
            <br />
            <code className="bg-muted px-2 py-1 rounded font-mono text-xs sm:text-sm break-all">
              {baseUrl}/ussd/api/v1/{endpointName}_ussd
            </code>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        <div className="p-3 sm:p-4 lg:p-6 w-full max-w-full">
          <div className="grid gap-3 xs:gap-4 sm:gap-6">
            <section>
              <p className="text-sm text-muted-foreground mb-4">
                You can review your setup below, however, please note that
                sessionId, serviceCode, phoneNumber, and text are autofilled by
                Africa&apos;s Talking during a session but you must input them
                when testing via the test endpoints.
              </p>

              <div className="border rounded-lg p-3 sm:p-4 hover:bg-accent/50 transition-colors w-full">
                <div className="flex flex-col sm:flex-row items-start justify-between mb-2 gap-2">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full">
                    <Badge variant="default" className="text-xs sm:text-sm">
                      POST
                    </Badge>
                    <code className="text-xs sm:text-sm bg-muted px-2 py-1 rounded break-all w-full sm:w-auto">
                      /ussd/api/v1/test_{endpointName}_ussd
                    </code>
                  </div>
                </div>

                <h3 className="font-medium mb-1 text-sm sm:text-base lg:text-lg flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Test {startup.name} USSD
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-3">
                  Test endpoint for {startup.name} USSD logic with form data
                  parameters.
                </p>

                <div className="space-y-4 w-full">
                  <div>
                    <h4 className="font-medium mb-2">Form Parameters:</h4>
                    <div className="overflow-x-auto">
                      <table className="max-w-3xl text-sm border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-muted">
                            <th className="border border-gray-300 px-2 py-1 text-left">
                              Parameter
                            </th>
                            <th className="border border-gray-300 px-2 py-1 text-left">
                              Type
                            </th>
                            <th className="border border-gray-300 px-2 py-1 text-left">
                              Required
                            </th>
                            <th className="border border-gray-300 px-2 py-1 text-left">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-2 py-1">
                              sessionId
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              string
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              ✅
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              Session identifier e.g., lirwf23455
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-2 py-1">
                              serviceCode
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              string
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              ✅
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              USSD service code
                              {startup.serviceCode
                                ? ` (default: ${startup.serviceCode})`
                                : " (not assigned)"}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-2 py-1">
                              phoneNumber
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              string
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              ✅
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              Phone number e.g., +2348103317200
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-2 py-1">
                              text
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              string
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              ✅
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              User input text (empty for first interaction)
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="w-full overflow-hidden">
                    <LanguageSelector
                      examples={examples}
                      title="Request Example"
                    />
                  </div>

                  <div className="w-full break-words">
                    <h4 className="text-sm sm:text-base font-medium mb-2">
                      Response Example
                    </h4>
                    <div className="w-full overflow-hidden">
                      <CodeBlock
                        code={codeExample}
                        language="python"
                        title="Endpoint Implementation"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 lg:p-6 border-t">
        <PageNavigation
          previous={{
            title: "Status",
            href: "/introduction/services/sms/status",
          }}
          next={
            hasServiceAccess(
              "ussd",
              startup.id,
              startup.email,
              startup.username
            )
              ? {
                  title: `${startup.name} USSD`,
                  href: `/introduction/services/ussd/${endpointName}_ussd`,
                }
              : undefined
          }
        />
      </div>
    </div>
  );
}

export default function UssdServicePage() {
  return (
    <SuspenseWrapper>
      <UssdServiceContent />
    </SuspenseWrapper>
  );
}
