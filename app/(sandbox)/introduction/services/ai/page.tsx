"use client";

import { useSearchParams } from "next/navigation";
import { ApiClientInterface } from "../components/api-client-interface";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Zap, Code, BarChart3 } from "lucide-react";
import { PageNavigation } from "@/app/(sandbox)/components/page-navigation";
import { getNavigation } from "@/app/(sandbox)/lib/navigation";
import { SuspenseWrapper } from "../components/suspense-wrapper";

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
    <div className="h-full flex flex-col mt-4 sm:mt-0">
      <div className="p-2 xs:p-3 sm:p-6 border-b bg-card">
        <div className="flex flex-col xs:flex-row items-start xs:items-center gap-1 xs:gap-2 sm:gap-3 mb-1 xs:mb-2">
          <div className="flex items-center gap-1 xs:gap-2 sm:gap-3">
            <Zap className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-lg xs:text-xl sm:text-2xl font-bold leading-tight">
              AI Service
            </h1>
          </div>
          <Badge
            variant="secondary"
            className="text-[10px] xs:text-xs sm:text-sm"
          >
            Nigerian Context
          </Badge>
        </div>
        <p className="text-xs xs:text-sm sm:text-base text-muted-foreground leading-tight">
          AI content generation and data analysis service optimized for Nigerian
          use cases
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 xs:p-3 sm:p-6">
          <div className="grid gap-3 xs:gap-4 sm:gap-6">
            <section>
              <h2 className="text-sm xs:text-base sm:text-lg font-semibold mb-2 xs:mb-3 sm:mb-4 flex items-center gap-1 xs:gap-2">
                <Code className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
                Available Endpoints
              </h2>

              <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                {aiEndpoints.map((endpoint) => (
                  <div
                    key={endpoint.path}
                    className="border rounded-lg p-2 xs:p-3 sm:p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex flex-col xs:flex-row items-start justify-between mb-1 xs:mb-2 gap-1 xs:gap-2">
                      <div className="flex flex-col xs:flex-row items-start xs:items-center gap-1 xs:gap-2 sm:gap-3 w-full">
                        <Badge
                          variant={
                            endpoint.method === "GET" ? "secondary" : "default"
                          }
                          className="text-[10px] xs:text-xs"
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-[10px] xs:text-xs sm:text-sm bg-muted px-1 xs:px-2 py-0.5 xs:py-1 rounded break-all">
                          {endpoint.path}
                        </code>
                      </div>
                    </div>

                    <h3 className="font-medium mb-0.5 xs:mb-1 text-xs xs:text-sm sm:text-base leading-tight">
                      {endpoint.name}
                    </h3>
                    <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground mb-2 xs:mb-3 leading-tight">
                      {endpoint.description}
                    </p>

                    <details className="text-[10px] xs:text-xs sm:text-sm">
                      <summary className="cursor-pointer text-primary hover:underline">
                        View example request
                      </summary>
                      <pre className="mt-1 xs:mt-2 p-1 xs:p-2 sm:p-3 bg-muted rounded text-[8px] xs:text-xs overflow-x-auto">
                        {JSON.stringify(endpoint.example, null, 2)}
                      </pre>
                    </details>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-sm xs:text-base sm:text-lg font-semibold mb-2 xs:mb-3 sm:mb-4 flex items-center gap-1 xs:gap-2">
                <BarChart3 className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
                Features
              </h2>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
                <div className="border rounded-lg p-2 xs:p-3 sm:p-4">
                  <h3 className="font-medium mb-1 xs:mb-2 text-xs xs:text-sm sm:text-base leading-tight">
                    Content Generation
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground leading-tight">
                    Generate contextually relevant content for Nigerian
                    audiences with local language support and cultural
                    awareness.
                  </p>
                </div>

                <div className="border rounded-lg p-2 xs:p-3 sm:p-4">
                  <h3 className="font-medium mb-1 xs:mb-2 text-xs xs:text-sm sm:text-base leading-tight">
                    Data Analysis
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground leading-tight">
                    Analyze transaction patterns, user behavior, and business
                    metrics with AI-powered insights.
                  </p>
                </div>

                <div className="border rounded-lg p-2 xs:p-3 sm:p-4">
                  <h3 className="font-medium mb-1 xs:mb-2 text-xs xs:text-sm sm:text-base leading-tight">
                    Nigerian Context
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground leading-tight">
                    Optimized for Nigerian fintech, e-commerce, and digital
                    services with local market understanding.
                  </p>
                </div>

                <div className="border rounded-lg p-2 xs:p-3 sm:p-4">
                  <h3 className="font-medium mb-1 xs:mb-2 text-xs xs:text-sm sm:text-base leading-tight">
                    Real-time Processing
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground leading-tight">
                    Fast response times with efficient processing for production
                    applications.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </ScrollArea>

      <div className="p-2 xs:p-3 sm:p-6 border-t">
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
