"use client";

import { ApiClientInterface } from "../../components/api-client-interface";
import { PageNavigation } from "@/app/(sandbox)/components/page-navigation";
import { getNavigation } from "@/app/(sandbox)/lib/navigation";

export default function AiPostApiV1AiChatChatCompletionPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <ApiClientInterface
          initialMethod="POST"
          initialPath="/api/v1/ai/chat"
        />
      </div>
      <div className="p-3 sm:p-6 border-t">
        <PageNavigation {...getNavigation("/introduction/services/ai/chat")} />
      </div>
    </div>
  );
}
