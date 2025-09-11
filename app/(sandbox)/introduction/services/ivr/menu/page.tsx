"use client";

import { ApiClientInterface } from "../../components/api-client-interface";
import { PageNavigation } from "@/app/(sandbox)/components/page-navigation";
import { getNavigation } from "@/app/(sandbox)/lib/navigation";

export default function IvrGetApiV1IvrMenuGetMenuPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <ApiClientInterface
          initialMethod="GET"
          initialPath="/api/v1/ivr/menu"
        />
      </div>
      <div className="p-3 sm:p-6 border-t">
        <PageNavigation {...getNavigation("/introduction/services/ivr/menu")} />
      </div>
    </div>
  );
}
