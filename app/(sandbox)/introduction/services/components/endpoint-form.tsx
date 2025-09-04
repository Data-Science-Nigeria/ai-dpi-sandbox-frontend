"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import { BaseUrlIcon } from "./base-url-icon";
import { getBaseUrl } from "@/lib/env";

interface EndpointFormProps {
  method: string;
  path: string;
  requestSchema?: Record<string, unknown>;
  onSendRequest: (request: {
    method: string;
    url: string;
    headers: Record<string, string>;
    body?: string;
  }) => void;
}

export function EndpointForm({
  method,
  path,
  requestSchema,
  onSendRequest,
}: EndpointFormProps) {
  const baseUrl = getBaseUrl();
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [headers] = useState({
    "Content-Type": "application/json",
    Authorization: "Bearer your-token-here",
  });

  const handleInputChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSend = () => {
    const fullUrl = `${baseUrl.replace(/\/$/, "")}${path}`;
    const body = method !== "GET" ? JSON.stringify(formData) : undefined;

    onSendRequest({
      method,
      url: fullUrl,
      headers,
      body,
    });
  };

  const renderFormField = (
    fieldName: string,
    fieldSchema: Record<string, unknown>
  ) => {
    const fieldType = fieldSchema.type || "string";

    switch (fieldType) {
      case "string":
        return (
          <input
            type="text"
            value={String(formData[fieldName] || "")}
            onChange={(e) => handleInputChange(fieldName, e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-background text-sm"
            placeholder={String(fieldSchema.description || fieldName)}
          />
        );
      case "number":
        return (
          <input
            type="number"
            value={String(formData[fieldName] || "")}
            onChange={(e) =>
              handleInputChange(fieldName, Number(e.target.value))
            }
            className="w-full px-3 py-2 border rounded-md bg-background text-sm"
            placeholder={String(fieldSchema.description || fieldName)}
          />
        );
      case "boolean":
        return (
          <select
            value={String(formData[fieldName] || "false")}
            onChange={(e) =>
              handleInputChange(fieldName, e.target.value === "true")
            }
            className="w-full px-3 py-2 border rounded-md bg-background text-sm"
          >
            <option value="false">false</option>
            <option value="true">true</option>
          </select>
        );
      case "array":
        return (
          <textarea
            value={
              formData[fieldName] ? JSON.stringify(formData[fieldName]) : "[]"
            }
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                handleInputChange(fieldName, parsed);
              } catch {
                // Invalid JSON, keep as string for now
              }
            }}
            className="w-full px-3 py-2 border rounded-md bg-background text-sm font-mono"
            rows={3}
            placeholder="[]"
          />
        );
      default:
        return (
          <textarea
            value={
              formData[fieldName] ? JSON.stringify(formData[fieldName]) : ""
            }
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                handleInputChange(fieldName, parsed);
              } catch {
                handleInputChange(fieldName, e.target.value);
              }
            }}
            className="w-full px-3 py-2 border rounded-md bg-background text-sm font-mono"
            rows={2}
            placeholder={String(fieldSchema.description || fieldName)}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-card">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "px-2 py-1 text-xs font-medium rounded",
              method === "GET"
                ? "bg-blue-100 text-blue-800"
                : method === "POST"
                  ? "bg-green-100 text-green-800"
                  : method === "PUT"
                    ? "bg-yellow-100 text-yellow-800"
                    : method === "DELETE"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
            )}
          >
            {method}
          </span>
          <BaseUrlIcon baseUrl={baseUrl} />
          <code className="text-sm bg-muted px-2 py-1 rounded flex-1">
            {path}
          </code>
          <Button onClick={handleSend} className="px-6">
            <Play className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>

      {requestSchema && method !== "GET" && (
        <div className="flex-1 overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="text-sm font-medium">Request Body</h3>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {Object.entries(requestSchema.properties || {}).map(
                ([fieldName, fieldSchema]: [
                  string,
                  Record<string, unknown>,
                ]) => (
                  <div key={fieldName} className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      {fieldName}
                      {Array.isArray(requestSchema.required) &&
                        requestSchema.required.includes(fieldName) && (
                          <span className="text-red-500 text-xs">*</span>
                        )}
                    </label>
                    {renderFormField(fieldName, fieldSchema)}
                  </div>
                )
              )}
            </div>
          </ScrollArea>
        </div>
      )}

      {method === "GET" && (
        <div className="p-4 text-center text-muted-foreground">
          <p>This is a GET request. No request body is needed.</p>
        </div>
      )}
    </div>
  );
}
