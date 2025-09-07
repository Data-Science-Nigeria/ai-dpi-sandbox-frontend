"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Copy, Download, Clock, Zap } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

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
  const [viewMode, setViewMode] = useState<"pretty" | "raw">("pretty");

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

  const formatResponseData = (data: unknown) => {
    return JSON.stringify(data, null, viewMode === "pretty" ? 2 : 0);
  };

  const getLanguageForHighlighter = () => {
    return "json";
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
        <div className="space-y-3">
          <div className="flex flex-col xxs:flex-row xxs:flex-wrap items-start gap-2 xxs:gap-3 xs:gap-4">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                Status:
              </span>
              <span
                className={cn(
                  "font-mono font-medium text-xs sm:text-sm break-all",
                  getStatusColor(response.status)
                )}
              >
                {response.status} {response.statusText}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                {response.duration}ms
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                Size:
              </span>
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                {formatBytes(response.size)}
              </span>
            </div>
          </div>

          <div className="flex flex-col xxs:flex-row gap-2">
            <Button
              onClick={() =>
                copyToClipboard(JSON.stringify(response.data, null, 2))
              }
              variant="outline"
              size="sm"
              className="flex-1 xxs:flex-none"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button
              onClick={downloadResponse}
              variant="outline"
              size="sm"
              className="flex-1 xxs:flex-none"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>

      <div className="border-b bg-card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("body")}
              className={cn(
                "px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
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
                "px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                activeTab === "headers"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              Headers ({Object.keys(response.headers).length})
            </button>
          </div>

          {activeTab === "body" && (
            <div className="flex items-center gap-2 px-2 sm:px-4 py-2 border-t sm:border-t-0">
              <Select
                value={viewMode}
                onValueChange={(value: "pretty" | "raw") => setViewMode(value)}
              >
                <SelectTrigger className="w-16 sm:w-20 h-7 sm:h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pretty">Pretty</SelectItem>
                  <SelectItem value="raw">Raw</SelectItem>
                </SelectContent>
              </Select>

              <div className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded">
                JSON
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === "body" && (
          <ScrollArea className="h-full">
            <div className="p-2 sm:p-4">
              {viewMode === "pretty" ? (
                <SyntaxHighlighter
                  language={getLanguageForHighlighter()}
                  style={tomorrow}
                  customStyle={{
                    margin: 0,
                    padding: 0,
                    background: "transparent",
                    fontSize: "0.75rem",
                  }}
                  wrapLongLines
                >
                  {formatResponseData(response.data)}
                </SyntaxHighlighter>
              ) : (
                <pre className="text-xs sm:text-sm font-mono whitespace-pre-wrap break-words">
                  {formatResponseData(response.data)}
                </pre>
              )}
            </div>
          </ScrollArea>
        )}

        {activeTab === "headers" && (
          <ScrollArea className="h-full">
            <div className="p-2 sm:p-4">
              <div className="space-y-2">
                {Object.entries(response.headers).map(([key, value]) => (
                  <div
                    key={key}
                    className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_2fr] gap-1 sm:gap-4"
                  >
                    <div className="font-medium text-xs sm:text-sm text-muted-foreground break-all">
                      {key}:
                    </div>
                    <div className="text-xs sm:text-sm font-mono break-all">
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
