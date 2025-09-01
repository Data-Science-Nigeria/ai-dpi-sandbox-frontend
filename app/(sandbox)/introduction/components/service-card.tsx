"use client";

import { useConnectionStore } from "@/app/store/use-connection-store";
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
  const { isConnected, toggleConnection } = useConnectionStore();
  const connected = isConnected(name.toLowerCase());

  const handleConnect = () => {
    toggleConnection(name.toLowerCase());
  };

  const handleTest = () => {
    window.location.href = href;
  };

  return (
    <div className="bg-white dark:bg-[#1C1E22] rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 ease-in-out">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
        {name.toUpperCase()}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {description}
      </p>
      <div className="flex items-center justify-between">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleConnect}
              className={`font-medium transition-colors duration-200 ${
                connected
                  ? "text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                  : "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              }`}
            >
              {connected ? "CONNECTED" : "CONNECT"}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            {connected ? "Click to disconnect" : "Click to connect"}
          </TooltipContent>
        </Tooltip>
        {connected && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleTest}
                className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
              >
                TEST
              </button>
            </TooltipTrigger>
            <TooltipContent>Go to service page</TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
