"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Play, Plus, Trash2, Copy } from "lucide-react";
import { BaseUrlIcon } from "./base-url-icon";
import { getBaseUrl } from "@/lib/env";

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
  const [method, setMethod] = useState(initialMethod);
  const [path] = useState(initialPath);
  const [headers, setHeaders] = useState<Header[]>([
    { key: "Content-Type", value: "application/json", enabled: true },
    { key: "Authorization", value: "Bearer your-token-here", enabled: true },
  ]);
  const [body, setBody] = useState("{\n  \n}");
  const [activeTab, setActiveTab] = useState<"headers" | "body">("headers");

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
    onSendRequest({
      method,
      url: fullUrl,
      headers: headers.filter((h) => h.enabled && h.key),
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
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          <Select value={method} onValueChange={setMethod}>
            <SelectTrigger className="w-full sm:w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
              <SelectItem value="PATCH">PATCH</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex-1 flex items-center gap-2">
            <BaseUrlIcon baseUrl={baseUrl} />
            <input
              type="text"
              value={path}
              readOnly
              className="flex-1 px-3 py-2 border rounded-md bg-muted text-sm cursor-not-allowed"
              placeholder="/api/v1/endpoint"
            />
          </div>

          <Button onClick={handleSend} className="px-4 sm:px-6">
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
            Headers ({headers.filter((h) => h.enabled && h.key).length})
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
                {headers.map((header, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                  >
                    <div className="flex items-center gap-2 sm:contents">
                      <input
                        type="checkbox"
                        checked={header.enabled}
                        onChange={(e) =>
                          updateHeader(index, "enabled", e.target.checked)
                        }
                        className="w-4 h-4"
                      />
                      <input
                        type="text"
                        value={header.key}
                        onChange={(e) =>
                          updateHeader(index, "key", e.target.value)
                        }
                        placeholder="Header name"
                        className="flex-1 sm:flex-1 px-3 py-2 border rounded-md bg-background text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2 sm:contents">
                      <input
                        type="text"
                        value={header.value}
                        onChange={(e) =>
                          updateHeader(index, "value", e.target.value)
                        }
                        placeholder="Header value"
                        className="flex-1 sm:flex-1 px-3 py-2 border rounded-md bg-background text-sm"
                      />
                      <Button
                        onClick={() => removeHeader(index)}
                        variant="ghost"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
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
