"use client";

import { useSearchParams } from "next/navigation";
import { ApiClientInterface } from "../components/api-client-interface";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Zap, Code, BarChart3 } from "lucide-react";
import { PageNavigation } from "@/app/(sandbox)/components/page-navigation";
import { getNavigation } from "@/app/(sandbox)/lib/navigation";

const aiEndpoints = [
  {
    name: "Generate Content",
    method: "POST",
    path: "/api/v1/generate",
    description: "Generate AI content with Nigerian context",
    example: {
      prompt: "Generate a welcome message for Nigerian fintech users",
      max_tokens: 150,
      temperature: 0.7,
    },
  },
  {
    name: "Analyze Data",
    method: "POST",
    path: "/api/v1/analyze",
    description: "Analyze data with AI insights",
    example: {
      data: [
        { transaction_amount: 5000, user_age: 25 },
        { transaction_amount: 15000, user_age: 35 },
      ],
      analysis_type: "summary",
    },
  },
];

export default function AIServicePage() {
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
    <div className="h-full flex flex-col">
      <div className="p-3 sm:p-6 border-b bg-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-xl sm:text-2xl font-bold">AI Service</h1>
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

      <ScrollArea className="flex-1">
        <div className="p-3 sm:p-6">
          <div className="grid gap-6">
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Code className="h-5 w-5" />
                Available Endpoints
              </h2>

              <div className="space-y-4">
                {aiEndpoints.map((endpoint) => (
                  <div
                    key={endpoint.path}
                    className="border rounded-lg p-3 sm:p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-2 gap-2">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full">
                        <Badge
                          variant={
                            endpoint.method === "GET" ? "secondary" : "default"
                          }
                          className="text-xs"
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-xs sm:text-sm bg-muted px-2 py-1 rounded break-all">
                          {endpoint.path}
                        </code>
                      </div>
                    </div>

                    <h3 className="font-medium mb-1 text-sm sm:text-base">
                      {endpoint.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                      {endpoint.description}
                    </p>

                    <details className="text-xs sm:text-sm">
                      <summary className="cursor-pointer text-primary hover:underline">
                        View example request
                      </summary>
                      <pre className="mt-2 p-2 sm:p-3 bg-muted rounded text-xs overflow-x-auto">
                        {JSON.stringify(endpoint.example, null, 2)}
                      </pre>
                    </details>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Features
              </h2>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Content Generation
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Generate contextually relevant content for Nigerian
                    audiences with local language support and cultural
                    awareness.
                  </p>
                </div>

                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Data Analysis
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Analyze transaction patterns, user behavior, and business
                    metrics with AI-powered insights.
                  </p>
                </div>

                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Nigerian Context
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Optimized for Nigerian fintech, e-commerce, and digital
                    services with local market understanding.
                  </p>
                </div>

                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Real-time Processing
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Fast response times with efficient processing for production
                    applications.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </ScrollArea>

      <div className="p-3 sm:p-6 border-t">
        <PageNavigation {...getNavigation("/introduction/services/ai")} />
      </div>
    </div>
  );
}
