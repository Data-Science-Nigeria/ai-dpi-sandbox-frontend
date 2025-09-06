"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  PanelLeft,
  PanelRight,
  LayoutDashboard,
  Users,
  UserCheck,
  UserX,
  KeyRound,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const adminMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    id: "manage-users",
    label: "Manage Users",
    icon: Users,
    href: "/admin/manage-users",
  },
  {
    id: "active-users",
    label: "Active Users",
    icon: UserCheck,
    href: "/admin/active-users",
  },
  {
    id: "deactivated-users",
    label: "Deactivated Users",
    icon: UserX,
    href: "/admin/deactivated-users",
  },
  {
    id: "reset-password",
    label: "Reset User Password",
    icon: KeyRound,
    href: "/admin/reset-password",
  },
];

export default function AdminSidebar({ isOpen, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<string>("");

  useEffect(() => {
    const activeItem = adminMenuItems.find((item) => item.href === pathname);
    if (activeItem) {
      setSelectedItem(activeItem.id);
    }
  }, [pathname]);

  const handleItemSelect = (itemId: string, href: string) => {
    setSelectedItem(itemId);
    router.push(href);
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
              ADMIN
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
          {adminMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemSelect(item.id, item.href)}
              className={`
                w-full flex items-center p-2 rounded-md
                text-gray-700 dark:text-[#AFBDD1] hover:bg-gray-100 dark:hover:bg-gray-700
                transition-colors duration-200
                ${selectedItem === item.id ? "bg-[#00A859] text-white" : ""}
                ${!isOpen ? "justify-center" : "space-x-3"}
              `}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && (
                <span className="text-xs xs:text-sm font-medium truncate">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
