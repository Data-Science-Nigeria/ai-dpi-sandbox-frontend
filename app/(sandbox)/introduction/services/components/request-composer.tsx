"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Play, Plus, Trash2, Copy } from "lucide-react";
import { BaseUrlIcon } from "./base-url-icon";
import { ConnectionIcon } from "./connection-icon";
import { getBaseUrl } from "@/lib/env";
import { useAuthStore } from "@/app/store/use-auth-store";

interface Header {
  key: string;
  value: string;
  enabled: boolean;
}

interface RequestComposerProps {
  onSendRequest: (request: {
    method: string;
    url: string;
    headers: Header[];
    body: string;
  }) => void;
  initialMethod?: string;
  initialPath?: string;
}

export function RequestComposer({
  onSendRequest,
  initialMethod = "GET",
  initialPath = "",
}: RequestComposerProps) {
  const baseUrl = getBaseUrl();
  const method = initialMethod;
  const path = initialPath;
  const { auth } = useAuthStore();
  const [headers, setHeaders] = useState<Header[]>([
    { key: "Content-Type", value: "application/json", enabled: true },
  ]);
  const [body, setBody] = useState("{\n  \n}");
  const [activeTab, setActiveTab] = useState<"headers" | "body">("headers");

  // Get all headers including the automatic authorization header
  const getAllHeaders = (): Header[] => {
    const authHeader: Header[] = auth.access_token
      ? [
          {
            key: "Authorization",
            value: `Bearer ${auth.access_token}`,
            enabled: true,
          },
        ]
      : [];
    return [...authHeader, ...headers];
  };

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "", enabled: true }]);
  };

  const updateHeader = (
    index: number,
    field: "key" | "value" | "enabled",
    value: string | boolean
  ) => {
    const newHeaders = [...headers];
    newHeaders[index] = { ...newHeaders[index], [field]: value };
    setHeaders(newHeaders);
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    const fullUrl = `${baseUrl.replace(/\/$/, "")}${path}`;
    const allHeaders = getAllHeaders();
    onSendRequest({
      method,
      url: fullUrl,
      headers: allHeaders.filter((h) => h.enabled && h.key),
      body: method !== "GET" ? body : "",
    });
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(body);
      setBody(JSON.stringify(parsed, null, 2));
    } catch {
      // Invalid JSON, keep as is
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 sm:p-4 border-b bg-card">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
            <span
              className={cn(
                "px-3 py-2 text-xs sm:text-sm font-medium rounded border whitespace-nowrap",
                method === "GET"
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : method === "POST"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : method === "PUT"
                      ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                      : method === "DELETE"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : "bg-gray-50 text-gray-700 border-gray-200"
              )}
            >
              {method}
            </span>

            <div className="flex-1 flex items-center gap-2 min-w-0">
              <BaseUrlIcon baseUrl={baseUrl} />
              <input
                type="text"
                value={path}
                readOnly
                className="flex-1 px-3 py-2 border rounded-md bg-muted text-xs sm:text-sm cursor-not-allowed min-w-0"
                placeholder="/api/v1/endpoint"
              />
            </div>
          </div>

          <Button
            onClick={handleSend}
            className="w-full xxs:w-auto xxs:self-end px-4 sm:px-6"
          >
            <Play className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>

      <div className="border-b bg-card">
        <div className="flex">
          <button
            onClick={() => setActiveTab("headers")}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === "headers"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Headers ({getAllHeaders().filter((h) => h.enabled && h.key).length})
          </button>
          {method !== "GET" && (
            <button
              onClick={() => setActiveTab("body")}
              className={cn(
                "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                activeTab === "body"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              Body
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === "headers" && (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <Button onClick={addHeader} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Header
              </Button>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-2 sm:p-4 space-y-2">
                {getAllHeaders().map((header, index) => {
                  const isAuthHeader = header.key === "Authorization";
                  const actualIndex = isAuthHeader
                    ? -1
                    : index - (auth.access_token ? 1 : 0);

                  return (
                    <div
                      key={isAuthHeader ? "auth-header" : index}
                      className="grid grid-cols-1 xs:grid-cols-[auto_1fr_1fr_auto] gap-2 items-center"
                    >
                      <input
                        type="checkbox"
                        checked={header.enabled}
                        onChange={(e) => {
                          if (!isAuthHeader) {
                            updateHeader(
                              actualIndex,
                              "enabled",
                              e.target.checked
                            );
                          }
                        }}
                        disabled={isAuthHeader}
                        className="w-4 h-4 justify-self-start"
                      />
                      <input
                        type="text"
                        value={header.key}
                        onChange={(e) => {
                          if (!isAuthHeader) {
                            updateHeader(actualIndex, "key", e.target.value);
                          }
                        }}
                        placeholder="Header name"
                        readOnly={isAuthHeader}
                        className={cn(
                          "px-3 py-2 border rounded-md text-xs sm:text-sm min-w-0",
                          isAuthHeader
                            ? "bg-muted cursor-not-allowed"
                            : "bg-background"
                        )}
                      />
                      <input
                        type="text"
                        value={
                          isAuthHeader
                            ? "Bearer {{access_token}}"
                            : header.value
                        }
                        onChange={(e) => {
                          if (!isAuthHeader) {
                            updateHeader(actualIndex, "value", e.target.value);
                          }
                        }}
                        placeholder="Header value"
                        readOnly={isAuthHeader}
                        className={cn(
                          "px-3 py-2 border rounded-md text-xs sm:text-sm min-w-0",
                          isAuthHeader
                            ? "bg-muted cursor-not-allowed"
                            : "bg-background"
                        )}
                      />
                      <div className="flex justify-end">
                        {!isAuthHeader && (
                          <Button
                            onClick={() => removeHeader(actualIndex)}
                            variant="ghost"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                        {isAuthHeader && (
                          <div className="w-10 h-10 flex items-center justify-center">
                            <ConnectionIcon />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        )}

        {activeTab === "body" && method !== "GET" && (
          <div className="h-full flex flex-col">
            <div className="p-2 sm:p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <span className="text-sm font-medium">Request Body</span>
              <Button onClick={formatJson} variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Format JSON
              </Button>
            </div>

            <div className="flex-1 p-2 sm:p-4">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full h-full p-3 border rounded-md bg-background text-sm font-mono resize-none"
                placeholder="Enter request body (JSON)"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
