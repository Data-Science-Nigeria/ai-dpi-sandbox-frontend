"use client";

import { ApiClientInterface } from "../../components/api-client-interface";
import { PageNavigation } from "@/app/(sandbox)/components/page-navigation";
import { getNavigation } from "@/app/(sandbox)/lib/navigation";

export default function TwoWaySmsPostApiV1TwoWaySmsSendSendSmsPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <ApiClientInterface
          initialMethod="POST"
          initialPath="/api/v1/two-way-sms/send"
        />
      </div>
      <div className="p-3 sm:p-6 border-t">
        <PageNavigation
          {...getNavigation("/introduction/services/two-way-sms/send")}
        />
      </div>
    </div>
  );
}
