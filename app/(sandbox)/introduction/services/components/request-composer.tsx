"use client";

import { useState, useEffect } from "react";
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
  const { auth } = useAuthStore();

  // Extract path parameters
  const pathParams = (initialPath.match(/\{([^}]+)\}/g) || []).map((param) =>
    param.slice(1, -1)
  );
  const [pathValues, setPathValues] = useState<Record<string, string>>({});
  const [contentType, setContentType] = useState("application/json");
  const [headers, setHeaders] = useState<Header[]>([]);
  const [body, setBody] = useState("{\n  \n}");
  const [formData, setFormData] = useState<
    { key: string; value: string | File; type: "text" | "file" }[]
  >([{ key: "", value: "", type: "text" }]);
  const [activeTab, setActiveTab] = useState<"params" | "headers" | "body">(
    "headers"
  );

  // Set initial tab based on path params
  useEffect(() => {
    if (pathParams.length > 0) {
      setActiveTab("params");
    }
  }, [pathParams.length]);

  // Update headers when content type changes
  useEffect(() => {
    const baseHeaders: Header[] = [];
    if (method !== "GET" && contentType !== "multipart/form-data") {
      baseHeaders.push({
        key: "Content-Type",
        value: contentType,
        enabled: true,
      });
    }
    setHeaders(baseHeaders);
  }, [contentType, method]);

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
    // Replace path parameters
    let processedPath = initialPath;
    pathParams.forEach((param) => {
      if (pathValues[param]) {
        processedPath = processedPath.replace(`{${param}}`, pathValues[param]);
      }
    });

    const fullUrl = `${baseUrl.replace(/\/$/, "")}${processedPath}`;
    const allHeaders = getAllHeaders();

    let requestBody = "";
    if (method !== "GET") {
      if (contentType === "multipart/form-data") {
        const formDataObj = new FormData();
        formData.forEach((field) => {
          if (field.key && field.value) {
            if (field.type === "file" && field.value instanceof File) {
              formDataObj.append(field.key, field.value);
            } else if (field.type === "text") {
              formDataObj.append(field.key, field.value as string);
            }
          }
        });
        requestBody = formDataObj as unknown as string;
      } else if (contentType === "application/x-www-form-urlencoded") {
        const params = new URLSearchParams();
        formData.forEach((field) => {
          if (field.key && field.value && field.type === "text") {
            params.append(field.key, field.value as string);
          }
        });
        requestBody = params.toString();
      } else {
        requestBody = body;
      }
    }

    onSendRequest({
      method,
      url: fullUrl,
      headers: allHeaders.filter((h) => h.enabled && h.key),
      body: requestBody,
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
                value={initialPath}
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
          {pathParams.length > 0 && (
            <button
              onClick={() => setActiveTab("params")}
              className={cn(
                "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                activeTab === "params"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              Params ({pathParams.length})
            </button>
          )}
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
        {activeTab === "params" && pathParams.length > 0 && (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <h4 className="text-sm font-medium mb-2">Path Parameters</h4>
              <p className="text-xs text-muted-foreground">
                Fill in the path parameters for this endpoint
              </p>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-3">
                {pathParams.map((param) => (
                  <div key={param} className="space-y-1">
                    <label className="text-sm font-medium">{param} *</label>
                    <input
                      type="text"
                      value={pathValues[param] || ""}
                      onChange={(e) =>
                        setPathValues((prev) => ({
                          ...prev,
                          [param]: e.target.value,
                        }))
                      }
                      placeholder={`Enter ${param}`}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

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
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Request Body</span>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="application/json">JSON</SelectItem>
                    <SelectItem value="application/x-www-form-urlencoded">
                      Form URL Encoded
                    </SelectItem>
                    <SelectItem value="multipart/form-data">
                      Form Data
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {contentType === "application/json" && (
                <Button onClick={formatJson} variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Format JSON
                </Button>
              )}
            </div>

            <div className="flex-1 overflow-hidden">
              {contentType === "application/json" ? (
                <div className="h-full p-2 sm:p-4">
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full h-full p-3 border rounded-md bg-background text-sm font-mono resize-none"
                    placeholder="Enter request body (JSON)"
                  />
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b">
                    <div className="flex gap-2">
                      <Button
                        onClick={() =>
                          setFormData([
                            ...formData,
                            { key: "", value: "", type: "text" },
                          ])
                        }
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Text Field
                      </Button>
                      <Button
                        onClick={() =>
                          setFormData([
                            ...formData,
                            { key: "", value: "", type: "file" },
                          ])
                        }
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add File Field
                      </Button>
                    </div>
                  </div>
                  <ScrollArea className="flex-1">
                    <div className="p-4 space-y-2">
                      {formData.map((field, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 xs:grid-cols-[1fr_1fr_auto] gap-2 items-center"
                        >
                          <input
                            type="text"
                            value={field.key}
                            onChange={(e) => {
                              const newFormData = [...formData];
                              newFormData[index].key = e.target.value;
                              setFormData(newFormData);
                            }}
                            placeholder="Field name"
                            className="px-3 py-2 border rounded-md text-sm"
                          />
                          {field.type === "file" ? (
                            <input
                              type="file"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const newFormData = [...formData];
                                  newFormData[index].value = file;
                                  setFormData(newFormData);
                                }
                              }}
                              className="px-3 py-2 border rounded-md text-sm"
                            />
                          ) : (
                            <input
                              type="text"
                              value={(field.value as string) || ""}
                              onChange={(e) => {
                                const newFormData = [...formData];
                                newFormData[index].value = e.target.value;
                                setFormData(newFormData);
                              }}
                              placeholder="Field value"
                              className="px-3 py-2 border rounded-md text-sm"
                            />
                          )}
                          <Button
                            onClick={() =>
                              setFormData(
                                formData.filter((_, i) => i !== index)
                              )
                            }
                            variant="ghost"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
