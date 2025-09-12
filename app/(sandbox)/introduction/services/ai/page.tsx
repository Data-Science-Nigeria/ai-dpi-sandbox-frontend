"use client";

import { useSearchParams } from "next/navigation";
import { ApiClientInterface } from "../components/api-client-interface";
import { Badge } from "@/components/ui/badge";
import { Zap, Code, BarChart3 } from "lucide-react";
import { PageNavigation } from "@/app/(sandbox)/components/page-navigation";
import { getNavigation } from "@/app/(sandbox)/lib/navigation";
import { SuspenseWrapper } from "../components/suspense-wrapper";
import { CodeBlock } from "../components/code-block";
import { LanguageSelector } from "../components/language-selector";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.dsnsandbox.com";

const aiEndpoints = [
  {
    name: "Generate Nigerian Business Plan",
    method: "POST",
    path: "/api/v1/ai/generate",
    description: "Generate AI content with Nigerian context",
    examples: {
      curl: `curl -X POST ${baseUrl}/api/v1/ai/generate \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Create a business plan for a Nigerian fintech startup focusing on mobile payments",
    "type": "business_plan",
    "max_tokens": 1000,
    "context": "nigerian_market"
  }'`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/ai/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: "Create a business plan for a Nigerian fintech startup focusing on mobile payments",
    type: "business_plan",
    max_tokens: 1000,
    context: "nigerian_market"
  })
});`,
      python: `import requests

response = requests.post(
    '${baseUrl}/api/v1/ai/generate',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'prompt': 'Create a business plan for a Nigerian fintech startup focusing on mobile payments',
        'type': 'business_plan',
        'max_tokens': 1000,
        'context': 'nigerian_market'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/ai/generate');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'prompt' => 'Create a business plan for a Nigerian fintech startup focusing on mobile payments',
    'type' => 'business_plan',
    'max_tokens' => 1000,
    'context' => 'nigerian_market'
]));
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/ai/generate"))
    .header("Authorization", "Bearer " + token)
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{"prompt":"Create a business plan for a Nigerian fintech startup focusing on mobile payments","type":"business_plan","max_tokens":1000,"context":"nigerian_market"}"
    ))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      generated_text:
        "# Nigerian Fintech Business Plan\n\n## Executive Summary\n",
      tokens_used: 987,
      generation_id: "gen_ai_123456",
      context_applied: "nigerian_market",
      timestamp: "2025-08-25T20:45:30Z",
    },
  },
  {
    name: "Analyze Nigerian Market Data",
    method: "POST",
    path: "/api/v1/ai/analyze",
    description: "Analyze data with AI insights for Nigerian market",
    examples: {
      curl: `curl -X POST ${baseUrl}/api/v1/ai/analyze \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "data": "Lagos fintech adoption rate increased 45% in 2024. Mobile banking users grew from 2.1M to 3.8M.",
    "analysis_type": "market_trends",
    "focus": "nigerian_fintech"
  }'`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/ai/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    data: "Lagos fintech adoption rate increased 45% in 2024. Mobile banking users grew from 2.1M to 3.8M. Digital payments volume reached ₦12.5 trillion.",
    analysis_type: "market_trends",
    focus: "nigerian_fintech"
  })
});`,
      python: `import requests

response = requests.post(
    '${baseUrl}/api/v1/ai/analyze',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'data': 'Lagos fintech adoption rate increased 45% in 2024. Mobile banking users grew from 2.1M to 3.8M. Digital payments volume reached ₦12.5 trillion.',
        'analysis_type': 'market_trends',
        'focus': 'nigerian_fintech'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/ai/analyze');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'data' => 'Lagos fintech adoption rate increased 45% in 2024. Mobile banking users grew from 2.1M to 3.8M. Digital payments volume reached ₦12.5 trillion.',
    'analysis_type' => 'market_trends',
    'focus' => 'nigerian_fintech'
]));
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/ai/analyze"))
    .header("Authorization", "Bearer " + token)
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{"data":"Lagos fintech adoption rate increased 45% in 2024. Mobile banking users grew from 2.1M to 3.8M. Digital payments volume reached ₦12.5 trillion.","analysis_type":"market_trends","focus":"nigerian_fintech"}"
    ))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      analysis: {
        key_insights: [
          "Strong fintech growth trajectory in Lagos market",
          "81% increase in mobile banking adoption",
          "Significant digital payment volume growth",
        ],
        trends: [
          "Accelerating digital transformation",
          "Increasing consumer trust in mobile banking",
          "Growing payment digitization",
        ],
        recommendations: [
          "Focus on Lagos market expansion",
          "Invest in mobile-first solutions",
          "Target underbanked populations",
        ],
      },
      confidence_score: 0.92,
      analysis_id: "ana_ai_789012",
    },
  },
  {
    name: "Generate Marketing Content",
    method: "POST",
    path: "/api/v1/ai/generate",
    description: "Generate marketing content for Nigerian audience",
    examples: {
      curl: `curl -X POST ${baseUrl}/api/v1/ai/generate \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Write a social media post for a Nigerian e-commerce platform launching same-day delivery in Lagos",
    "type": "social_media",
    "tone": "exciting",
    "platform": "instagram"
  }'`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/ai/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: "Write a social media post for a Nigerian e-commerce platform launching same-day delivery in Lagos",
    type: "social_media",
    tone: "exciting",
    platform: "instagram"
  })
});`,
      python: `import requests

response = requests.post(
    '${baseUrl}/api/v1/ai/generate',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    json={
        'prompt': 'Write a social media post for a Nigerian e-commerce platform launching same-day delivery in Lagos',
        'type': 'social_media',
        'tone': 'exciting',
        'platform': 'instagram'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/ai/generate');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'prompt' => 'Write a social media post for a Nigerian e-commerce platform launching same-day delivery in Lagos',
    'type' => 'social_media',
    'tone' => 'exciting',
    'platform' => 'instagram'
]));
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/ai/generate"))
    .header("Authorization", "Bearer " + token)
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{"prompt":"Write a social media post for a Nigerian e-commerce platform launching same-day delivery in Lagos","type":"social_media","tone":"exciting","platform":"instagram"}"
    ))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      generated_text:
        "🚀 BREAKING: Same-day delivery is now LIVE in Lagos!, we've got you covered.",
      tokens_used: 45,
      generation_id: "gen_ai_345678",
      optimized_for: "instagram",
    },
  },
];

function AIServiceContent() {
  const searchParams = useSearchParams();
  const selectedEndpoint = searchParams.get("endpoint");

  const endpoint = aiEndpoints.find((e) => e.path === selectedEndpoint);

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
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
              AI Service
            </h1>
          </div>
          <Badge variant="secondary" className="text-xs sm:text-sm">
            Nigerian Context
          </Badge>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          AI content generation and data analysis service optimized for Nigerian
          use cases
        </p>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        <div className="p-3 sm:p-4 lg:p-6 w-full max-w-full">
          <div className="grid gap-3 xs:gap-4 sm:gap-6">
            <section>
              <h2 className="text-base xs:text-lg sm:text-xl md:text-xl font-semibold mb-2 xs:mb-3 sm:mb-4 flex items-center gap-1 xs:gap-2">
                <Code className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
                Available Endpoints
              </h2>

              <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                {aiEndpoints.map((endpoint, index) => (
                  <div
                    key={`${endpoint.path}-${index}`}
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
              <h2 className="text-lg lg:text-xl font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Features
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Content Generation
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Generate contextually relevant content for Nigerian
                    audiences with local language support and cultural
                    awareness.
                  </p>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Data Analysis
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Analyze transaction patterns, user behavior, and business
                    metrics with AI-powered insights.
                  </p>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Nigerian Context
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Optimized for Nigerian fintech, e-commerce, and digital
                    services with local market understanding.
                  </p>
                </div>

                <div className="border rounded-lg p-3 lg:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base lg:text-lg">
                    Real-time Processing
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Fast response times with efficient processing for production
                    applications.
                  </p>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                AI Models & Configuration
              </h2>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Supported Models</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <code className="bg-muted px-2 py-1 rounded">
                        gpt-3.5-turbo
                      </code>
                      <span className="text-muted-foreground">
                        Fast, cost-effective for most use cases
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="bg-muted px-2 py-1 rounded">gpt-4</code>
                      <span className="text-muted-foreground">
                        Advanced reasoning and complex tasks
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Configuration Options</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">
                        Temperature
                      </Badge>
                      <div>
                        <div className="font-medium">0.0 - 1.0</div>
                        <div className="text-muted-foreground">
                          Controls randomness in responses
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">
                        Max Tokens
                      </Badge>
                      <div>
                        <div className="font-medium">1 - 4096</div>
                        <div className="text-muted-foreground">
                          Maximum response length
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Use Cases</h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div>
                      <div className="font-medium">Customer Communication</div>
                      <div className="text-muted-foreground">
                        Generate personalized messages and responses
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Data Insights</div>
                      <div className="text-muted-foreground">
                        Analyze patterns and generate business insights
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Content Creation</div>
                      <div className="text-muted-foreground">
                        Marketing copy and documentation
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Translation</div>
                      <div className="text-muted-foreground">
                        Multi-language support for Nigerian markets
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-600" />
                    Best Practices
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use specific prompts for better results</li>
                    <li>• Set appropriate temperature for your use case</li>
                    <li>• Include Nigerian context for localized content</li>
                    <li>• Monitor token usage to optimize costs</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 lg:p-6 border-t">
        <PageNavigation {...getNavigation("/introduction/services/ai")} />
      </div>
    </div>
  );
}

export default function AIServicePage() {
  return (
    <SuspenseWrapper>
      <AIServiceContent />
    </SuspenseWrapper>
  );
}
