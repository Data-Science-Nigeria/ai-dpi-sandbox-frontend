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
}

export default function AdminDashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { data: users = [], isLoading } = useQuery({
    ...authGetApiV1AuthAdminUsersListUsersOptions(),
  });

  const currentYear = new Date().getFullYear();
  const typedUsers = users as User[];
  const totalUsers = typedUsers.length;
  const recentUsers = typedUsers.slice(0, 5);

  // Calculate user growth from actual user data
  const chartData = React.useMemo(() => {
    if (!typedUsers.length) return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const monthlyData = new Array(12).fill(0);
    typedUsers.forEach((user) => {
      const createdDate = new Date(user.created_at);
      if (createdDate.getFullYear() === selectedYear) {
        monthlyData[createdDate.getMonth()]++;
      }
    });

    return monthlyData;
  }, [typedUsers, selectedYear]);

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Users Card */}
        <div className="bg-white dark:bg-[#1C1E22] rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <Users className="w-5 h-5 text-[#00A859]" />
          </div>

          <div className="space-y-4">
            <div className="text-3xl font-bold text-[#00A859]">
              {totalUsers.toLocaleString()}
            </div>

            <div className="flex gap-2">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="px-3 py-1 border rounded text-sm"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="px-3 py-1 border rounded text-sm"
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <option key={currentYear - i} value={currentYear - i}>
                    {currentYear - i}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Growth Chart */}
        <UserGrowthChart data={chartData} />
      </div>

      {/* Manage Users Preview */}
      <div className="bg-white dark:bg-[#1C1E22] rounded-lg border">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold">Manage Users Preview</h3>
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
                      <Badge variant="secondary">User</Badge>
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
