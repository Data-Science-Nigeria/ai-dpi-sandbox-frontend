"use client";

import { ApiClientInterface } from "../../components/api-client-interface";
import { PageNavigation } from "@/app/(sandbox)/components/page-navigation";
import { getNavigation } from "@/app/(sandbox)/lib/navigation";

export default function GetStaticMapApiV1StaticGetPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <ApiClientInterface
          initialMethod="GET"
          initialPath="/api/v1/maps/static/"
        />
      </div>
      <div className="p-3 sm:p-6 border-t">
        <PageNavigation
          {...getNavigation("/introduction/services/maps/static")}
        />
      </div>
    </div>
  );
}
