"use client";

import { useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus } from "lucide-react";
import { CreateUserModal } from "../components/create-user-modal";
import { UserGrowthChart } from "../components/user-growth-chart";
import { authGetApiV1AuthAdminUsersListUsersOptions } from "@/client/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
  created_at: string;
  role?: string;
}

export default function AdminDashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const { data: users = [], isLoading } = useQuery({
    ...authGetApiV1AuthAdminUsersListUsersOptions(),
  });

  const typedUsers = users as User[];
  const userRoleUsers = typedUsers.filter(
    (user) => user.role === "user" || !user.role
  );

  // Get available years from actual user data
  const availableYears = React.useMemo(() => {
    const years = new Set<number>();
    userRoleUsers.forEach((user) => {
      const createdDate = new Date(user.created_at);
      years.add(createdDate.getFullYear());
    });
    return Array.from(years).sort((a, b) => b - a); // Most recent first
  }, [userRoleUsers]);

  // Get available months for selected year
  const availableMonths = React.useMemo(() => {
    if (!selectedYear) return [];
    const months = new Set<number>();
    userRoleUsers.forEach((user) => {
      const createdDate = new Date(user.created_at);
      if (createdDate.getFullYear() === selectedYear) {
        months.add(createdDate.getMonth() + 1);
      }
    });
    return Array.from(months).sort((a, b) => b - a); // Most recent first
  }, [userRoleUsers, selectedYear]);

  // Set default values when data loads
  React.useEffect(() => {
    if (availableYears.length > 0 && selectedYear === null) {
      setSelectedYear(availableYears[0]); // Most recent year
    }
  }, [availableYears, selectedYear]);

  React.useEffect(() => {
    if (availableMonths.length > 0 && selectedMonth === null) {
      setSelectedMonth(availableMonths[0]); // Most recent month
    }
  }, [availableMonths, selectedMonth]);

  // Filter users by selected month and year for Total Users count
  const filteredUsers = userRoleUsers.filter((user) => {
    if (!selectedMonth || !selectedYear) return false;
    const createdDate = new Date(user.created_at);
    return (
      createdDate.getMonth() + 1 === selectedMonth &&
      createdDate.getFullYear() === selectedYear
    );
  });

  const totalUsers = filteredUsers.length;
  const recentUsers = userRoleUsers.slice(0, 5); // Show only users with 'user' role

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#00A859] hover:bg-[#00A859]/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create User
        </Button>
      </div>

      {/* Top Row - Total Users and Growth Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div className="bg-white dark:bg-[#1C1E22] rounded-lg border p-4 h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#00A859]" />
              <h3 className="text-lg font-semibold">Total Users</h3>
            </div>
            <div className="flex gap-1 relative z-10">
              <select
                value={selectedMonth || ""}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="px-2 py-1 border rounded text-xs w-18 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white relative z-20"
              >
                {availableMonths.map((month) => (
                  <option key={month} value={month}>
                    {new Date(0, month - 1).toLocaleString("default", {
                      month: "short",
                    })}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear || ""}
                onChange={(e) => {
                  setSelectedYear(Number(e.target.value));
                  setSelectedMonth(null); // Reset month when year changes
                }}
                className="px-2 py-1 border rounded text-xs w-18 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white relative z-20"
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-end justify-center flex-1 pb-4">
            <div className="text-7xl font-bold text-[#00A859] mt-8">
              {totalUsers.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="lg:col-span-2">
          <UserGrowthChart userRoleUsers={userRoleUsers} />
        </div>
      </div>

      {/* Manage Users Preview */}
      <div className="bg-white dark:bg-[#1C1E22] rounded-lg border">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold">Manage Users</h3>
          <a
            href="/admin/manage-users"
            className="text-[#00A859] hover:underline text-sm"
          >
            See more &gt;
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date Added
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Loading users...
                  </td>
                </tr>
              ) : (
                recentUsers.map((user, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.first_name && user.last_name
                        ? `${user.first_name} ${user.last_name}`
                        : user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="secondary">{user.role || "User"}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateUserModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
}
