"use client";

import { useState } from "react";
import { RequestComposer } from "./request-composer";
import { ResponseViewer } from "./response-viewer";

interface RequestData {
  method: string;
  url: string;
  headers: { key: string; value: string; enabled: boolean }[];
  body: string;
}

interface ResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: unknown;
  duration: number;
  size: number;
}

interface ApiClientInterfaceProps {
  initialMethod?: string;
  initialPath?: string;
}

export function ApiClientInterface({
  initialMethod,
  initialPath,
}: ApiClientInterfaceProps) {
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSendRequest = async (request: RequestData) => {
    setLoading(true);
    const startTime = Date.now();

    try {
      const headers: Record<string, string> = {};
      request.headers.forEach((header) => {
        if (header.enabled && header.key) {
          headers[header.key] = header.value;
        }
      });

      const fetchOptions: RequestInit = {
        method: request.method,
        headers,
      };

      if (request.method !== "GET" && request.body) {
        fetchOptions.body = request.body;
      }

      const response = await fetch(request.url, fetchOptions);
      const duration = Date.now() - startTime;

      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      const contentType = response.headers.get("content-type");
      let data;
      let responseText = "";

      if (contentType?.includes("application/json")) {
        responseText = await response.text();
        try {
          data = JSON.parse(responseText);
        } catch {
          data = responseText;
        }
      } else {
        data = await response.text();
        responseText = data;
      }

      const size = new Blob([responseText]).size;

      setResponse({
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        data,
        duration,
        size,
      });
    } catch (error) {
      const duration = Date.now() - startTime;
      setResponse({
        status: 0,
        statusText: "Network Error",
        headers: {},
        data: {
          error: "Failed to fetch",
          message: error instanceof Error ? error.message : "Unknown error",
        },
        duration,
        size: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r flex flex-col">
        <div className="p-2 sm:p-4 border-b bg-card">
          <h3 className="font-semibold text-sm sm:text-base">Request</h3>
        </div>
        <div className="flex-1 overflow-hidden">
          <RequestComposer
            onSendRequest={handleSendRequest}
            initialMethod={initialMethod}
            initialPath={initialPath}
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="p-2 sm:p-4 border-b bg-card">
          <h3 className="font-semibold text-sm sm:text-base">Response</h3>
        </div>
        <div className="flex-1 overflow-hidden">
          <ResponseViewer response={response} loading={loading} />
        </div>
      </div>
    </div>
  );
}
