"use client";

import { ApiClientInterface } from "../../components/api-client-interface";
import { AccessAwarePageNavigation } from "@/app/(sandbox)/components/access-aware-page-navigation";

export default function SmsGetApiV1SmsStatusMessageIdGetMessageStatusPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <ApiClientInterface
          initialMethod="GET"
          initialPath="/api/v1/sms/status/{message_id}"
        />
      </div>
      <div className="p-3 sm:p-6 border-t">
        <AccessAwarePageNavigation currentPath="/introduction/services/sms/status" />
      </div>
    </div>
  );
}
