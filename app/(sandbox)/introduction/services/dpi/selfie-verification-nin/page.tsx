"use client";

import { ApiClientInterface } from "../../components/api-client-interface";
import { AccessAwarePageNavigation } from "@/app/(sandbox)/components/access-aware-page-navigation";

export default function DpiApiPostApiV1SelfieVerificationNinSelfieVerificationNinPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <ApiClientInterface
          initialMethod="POST"
          initialPath="/api/v1/dpi/selfie/verification/nin"
        />
      </div>
      <div className="p-3 sm:p-6 border-t">
        <AccessAwarePageNavigation currentPath="/introduction/services/dpi/selfie-verification-nin" />
      </div>
    </div>
  );
}
