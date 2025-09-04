"use client";

import { Link } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BaseUrlIconProps {
  baseUrl: string;
}

export function BaseUrlIcon({ baseUrl }: BaseUrlIconProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center justify-center w-10 h-10 border rounded-md bg-muted hover:bg-muted/80">
            <Link className="h-4 w-4 text-muted-foreground" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>BaseURL: {baseUrl}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
