"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Copy, Download, Clock, Zap } from "lucide-react";

interface ResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: unknown;
  duration: number;
  size: number;
}

interface ResponseViewerProps {
  response: ResponseData | null;
  loading: boolean;
}

export function ResponseViewer({ response, loading }: ResponseViewerProps) {
  const [activeTab, setActiveTab] = useState<"body" | "headers">("body");

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300)
      return "text-green-600 dark:text-green-400";
    if (status >= 300 && status < 400)
      return "text-yellow-600 dark:text-yellow-400";
    if (status >= 400 && status < 500)
      return "text-orange-600 dark:text-orange-400";
    if (status >= 500) return "text-red-600 dark:text-red-400";
    return "text-muted-foreground";
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadResponse = () => {
    if (!response) return;

    const blob = new Blob([JSON.stringify(response.data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "response.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
          Sending request...
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Send a request to see the response</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 sm:p-4 border-b bg-card">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">
                Status:
              </span>
              <span
                className={cn(
                  "font-mono font-medium text-xs sm:text-sm",
                  getStatusColor(response.status)
                )}
              >
                {response.status} {response.statusText}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              <span className="text-xs sm:text-sm text-muted-foreground">
                {response.duration}ms
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">
                Size:
              </span>
              <span className="text-xs sm:text-sm font-medium">
                {formatBytes(response.size)}
              </span>
            </div>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              onClick={() =>
                copyToClipboard(JSON.stringify(response.data, null, 2))
              }
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button
              onClick={downloadResponse}
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>

      <div className="border-b bg-card">
        <div className="flex">
          <button
            onClick={() => setActiveTab("body")}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === "body"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Response Body
          </button>
          <button
            onClick={() => setActiveTab("headers")}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === "headers"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Headers ({Object.keys(response.headers).length})
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === "body" && (
          <ScrollArea className="h-full">
            <pre className="p-2 sm:p-4 text-xs sm:text-sm font-mono whitespace-pre-wrap break-words">
              {JSON.stringify(response.data, null, 2)}
            </pre>
          </ScrollArea>
        )}

        {activeTab === "headers" && (
          <ScrollArea className="h-full">
            <div className="p-2 sm:p-4">
              <div className="space-y-2">
                {Object.entries(response.headers).map(([key, value]) => (
                  <div key={key} className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-1/3 font-medium text-xs sm:text-sm text-muted-foreground pr-0 sm:pr-4 mb-1 sm:mb-0">
                      {key}:
                    </div>
                    <div className="flex-1 text-xs sm:text-sm font-mono break-all">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
