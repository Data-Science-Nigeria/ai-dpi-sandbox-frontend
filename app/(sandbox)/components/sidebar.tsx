"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { PanelLeft, PanelRight, FileText, Code } from "lucide-react";
import { menuItems } from "../introduction/data/data";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [expandedEndpoints, setExpandedEndpoints] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>("");

  useEffect(() => {
    // Find the active menu item based on current pathname
    for (const item of menuItems) {
      if (item.items) {
        for (const subItem of item.items) {
          // Check if current path matches service overview
          if (subItem.href === pathname) {
            setSelectedItem(subItem.id);
            setExpandedItems((prev) =>
              prev.includes(item.id) ? prev : [...prev, item.id]
            );
            return;
          }

          if (subItem.endpoints) {
            const activeEndpoint = subItem.endpoints.find(
              (endpoint) => endpoint.href === pathname
            );
            if (activeEndpoint) {
              setSelectedItem(
                `${subItem.id}-${activeEndpoint.name.toLowerCase().replace(/\s+/g, "-")}`
              );
              setExpandedItems((prev) =>
                prev.includes(item.id) ? prev : [...prev, item.id]
              );
              setExpandedEndpoints((prev) =>
                prev.includes(subItem.id) ? prev : [...prev, subItem.id]
              );
              return;
            }
          }
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

  const toggleEndpoints = (itemId: string) => {
    setExpandedEndpoints((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "text-green-600 dark:text-green-400";
      case "POST":
        return "text-blue-600 dark:text-blue-400";
      case "PUT":
        return "text-orange-600 dark:text-orange-400";
      case "DELETE":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  };

  const handleItemSelect = (itemId: string) => {
    setSelectedItem(itemId);
    // Auto-close sidebar on small screens (640px and below)
    if (window.innerWidth <= 640) {
      onToggle();
    }
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
        transition-all duration-300 ease-in-out sidebar-container
        ${isOpen ? "w-full xs:w-56 sm:w-64" : "w-12 xs:w-12 sm:w-16"}
        translate-x-0
      `}
      >
        {/* Header */}
        <div
          className={`flex items-center p-2 xs:p-4 mt-20 ${isOpen ? "justify-between" : "justify-center"}`}
        >
          {isOpen && (
            <h1 className="text-[#00A859] font-bold text-lg xs:text-xl ml-1 xs:ml-2 truncate">
              AI-DPI SANDBOX
            </h1>
          )}
          <button
            onClick={onToggle}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-[#AFBDD1] flex-shrink-0"
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
          className={`flex-1 p-2 xs:p-4 mt-2 space-y-2 ${!isOpen ? "flex flex-col items-center" : ""}`}
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
                    <span className="text-xs xs:text-sm font-medium truncate">
                      {item.label}
                    </span>
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
                  <div className="ml-4 xs:ml-8 mt-2 space-y-1">
                    {item.items?.map((subItem) => {
                      return (
                        <div key={subItem.id}>
                          <button
                            onClick={() => {
                              if (
                                subItem.endpoints &&
                                subItem.endpoints.length > 0
                              ) {
                                toggleEndpoints(subItem.id);
                              } else {
                                handleItemSelect(subItem.id);
                                router.push(subItem.href);
                              }
                            }}
                            className={`
                            w-full text-left p-2 rounded-md text-xs xs:text-sm flex items-center justify-between
                            transition-colors duration-200
                            ${
                              selectedItem === subItem.id
                                ? "bg-[#00A859] text-white"
                                : "text-gray-600 dark:text-[#AFBDD1] hover:bg-gray-100 dark:hover:bg-gray-700"
                            }
                          `}
                          >
                            <span className="truncate pr-2">
                              {subItem.label}
                            </span>
                            <div className="flex items-center gap-1">
                              {subItem.endpoints &&
                                subItem.endpoints.length > 0 &&
                                (expandedEndpoints.includes(subItem.id) ? (
                                  <ChevronDownIcon className="w-3 h-3" />
                                ) : (
                                  <ChevronRightIcon className="w-3 h-3" />
                                ))}
                            </div>
                          </button>

                          {/* Endpoints dropdown */}
                          {subItem.endpoints &&
                            subItem.endpoints.length > 0 &&
                            expandedEndpoints.includes(subItem.id) && (
                              <div className="ml-4 mt-1 space-y-1">
                                <button
                                  onClick={() => {
                                    handleItemSelect(subItem.id);
                                    router.push(subItem.href);
                                  }}
                                  className={`
                                  w-full text-left p-1.5 rounded-md text-xs flex items-center
                                  transition-colors duration-200
                                  ${
                                    selectedItem === subItem.id
                                      ? "bg-[#00A859]/20 text-[#00A859]"
                                      : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                  }
                                `}
                                >
                                  <FileText className="w-3 h-3 mr-2" />
                                  Overview
                                </button>

                                {subItem.endpoints.map((endpoint, idx) => {
                                  const endpointId = `${subItem.id}-${endpoint.name.toLowerCase().replace(/\s+/g, "-")}`;
                                  return (
                                    <button
                                      key={idx}
                                      onClick={() => {
                                        handleItemSelect(endpointId);
                                        router.push(endpoint.href);
                                      }}
                                      className={`
                                        w-full text-left p-1.5 rounded-md text-xs flex items-center transition-colors duration-200
                                        ${
                                          selectedItem === endpointId
                                            ? "bg-[#00A859] text-white"
                                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }
                                      `}
                                    >
                                      <Code className="w-3 h-3 mr-2" />
                                      <span
                                        className={`font-mono mr-2 ${
                                          selectedItem === endpointId
                                            ? "text-white"
                                            : getMethodColor(endpoint.method)
                                        }`}
                                      >
                                        {endpoint.method}
                                      </span>
                                      <span
                                        className={`truncate ${
                                          selectedItem === endpointId
                                            ? "text-white"
                                            : "text-gray-600 dark:text-gray-300"
                                        }`}
                                      >
                                        {endpoint.name}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                        </div>
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
