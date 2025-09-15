"use client";

import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface ServiceCardProps {
  name: string;
  description: string;
  href: string;
}

export default function ServiceCard({
  name,
  description,
  href,
}: ServiceCardProps) {
  const router = useRouter();

  const handleDocs = () => {
    router.push(href);
  };

  return (
    <div className="bg-white dark:bg-[#1C1E22] rounded-lg border border-gray-200 dark:border-gray-700 p-3 xs:p-4 sm:p-6 hover:shadow-lg transition-all duration-300 ease-in-out">
      <h3 className="text-lg xs:text-xl font-bold text-gray-900 dark:text-white mb-2 xs:mb-3 break-words">
        {name.toUpperCase()}
      </h3>
      <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-3 xs:mb-4 break-words">
        {description}
      </p>
      {name !== "IVR" && name !== "Two-Way SMS" && name !== "MAPS" && (
        <div className="flex items-center justify-start gap-2 service-buttons">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleDocs}
                className="text-[#00A859] dark:text-[#00A859] font-medium hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200 text-xs xs:text-sm"
              >
                DOCS
              </button>
            </TooltipTrigger>
            <TooltipContent>Go to service overview</TooltipContent>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
