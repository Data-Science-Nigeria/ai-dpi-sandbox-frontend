"use client";

import { Wifi } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuthStore } from "@/app/store/use-auth-store";

export function ConnectionIcon() {
  const { auth } = useAuthStore();
  const token = auth.access_token;

  if (!token) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400">
          <Wifi className="h-4 w-4" />
        </div>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p className="font-mono text-xs break-all">Bearer {token}</p>
      </TooltipContent>
    </Tooltip>
  );
}
