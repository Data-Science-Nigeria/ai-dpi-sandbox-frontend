"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { PanelLeft, PanelRight } from "lucide-react";
import { menuItems } from "../introduction/data/data";
import { useConnectionStore } from "@/app/store/use-connection-store";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const { isConnected } = useConnectionStore();

  useEffect(() => {
    // Find the active menu item based on current pathname
    for (const item of menuItems) {
      if (item.items) {
        const activeSubItem = item.items.find(
          (subItem) => subItem.href === pathname
        );
        if (activeSubItem) {
          setSelectedItem(activeSubItem.id);
          setExpandedItems((prev) =>
            prev.includes(item.id) ? prev : [...prev, item.id]
          );
          break;
        }
      }
    }
  }, [pathname]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemSelect = (itemId: string) => {
    setSelectedItem(itemId);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-screen bg-white dark:bg-[#1C1E22] z-40 overflow-y-auto custom-scrollbar border-r border-gray-100 dark:border-[#1C1E22] 
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-56 sm:w-64" : "w-12 sm:w-16"}
        translate-x-0
      `}
      >
        {/* Header */}
        <div
          className={`flex items-center p-4 mt-20 ${isOpen ? "justify-between" : "justify-center"}`}
        >
          {isOpen && (
            <h1 className="text-[#00A859] font-bold text-xl ml-2">
              AI-DPI SANDBOX
            </h1>
          )}
          <button
            onClick={onToggle}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-[#AFBDD1]"
          >
            {isOpen ? (
              <PanelLeft className="w-5 h-5" />
            ) : (
              <PanelRight className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <nav
          className={`flex-1 p-4 mt-2 space-y-2 ${!isOpen ? "flex flex-col items-center" : ""}`}
        >
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.hasDropdown) {
                    toggleExpanded(item.id);
                  } else {
                    handleItemSelect(item.id);
                  }
                }}
                className={`
                  w-full flex items-center justify-between p-2 rounded-md
                  text-gray-700 dark:text-[#AFBDD1] hover:bg-gray-100 dark:hover:bg-gray-700
                  transition-colors duration-200
                  ${selectedItem === item.id ? "bg-[#00A859] text-white" : ""}
                `}
              >
                <div
                  className={`flex items-center ${isOpen ? "space-x-3" : "justify-center"}`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {isOpen && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </div>
                {isOpen &&
                  item.hasDropdown &&
                  (expandedItems.includes(item.id) ? (
                    <ChevronDownIcon className="w-4 h-4" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4" />
                  ))}
              </button>

              {/* Dropdown Items */}
              {isOpen &&
                item.hasDropdown &&
                expandedItems.includes(item.id) && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.items?.map((subItem) => {
                      const isServiceConnected = isConnected(subItem.id);
                      const isLocked = subItem.locked && !isServiceConnected;

                      return (
                        <button
                          key={subItem.id}
                          onClick={() => {
                            if (!isLocked) {
                              handleItemSelect(subItem.id);
                              window.location.href = subItem.href;
                            }
                          }}
                          disabled={isLocked}
                          className={`
                          w-full text-left p-2 rounded-md text-sm flex items-center justify-between
                          transition-colors duration-200
                          ${
                            isLocked
                              ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                              : selectedItem === subItem.id
                                ? "bg-[#00A859] text-white"
                                : "text-gray-600 dark:text-[#AFBDD1] hover:bg-gray-100 dark:hover:bg-gray-700"
                          }
                        `}
                        >
                          <span>{subItem.label}</span>
                          {isLocked && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <LockClosedIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                              </TooltipTrigger>
                              <TooltipContent>Connect to test</TooltipContent>
                            </Tooltip>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
