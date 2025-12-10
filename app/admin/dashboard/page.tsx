"use client";

import { useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { CreateUserModal } from "../components/create-user-modal";
import { UserGrowthChart } from "../components/user-growth-chart";
import { TotalUsersCard } from "../components/total-users-card";
import { UserTable } from "../components/user-table";
import { PageHeader } from "../components/page-header";
import { adminGetApiV1AdminUsersListUsersOptions } from "@/client/@tanstack/react-query.gen";
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
    ...adminGetApiV1AdminUsersListUsersOptions(),
    refetchInterval: 3000, // Auto-refresh every 3 seconds
  });

  const typedUsers = users as User[];
  const userRoleUsers = typedUsers.filter(
    (user) => user.role === "user" || !user.role
  );

  // Get available years
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
      <PageHeader
        title="Admin Dashboard"
        action={
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#00A859] hover:bg-[#00A859]/90"
          >
            <User className="w-4 h-4 sm:mr-2 text-white" />
            <span className="hidden sm:inline text-white">Create User</span>
          </Button>
        }
      />

      {/* Top Row - Total Users and Growth Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TotalUsersCard
          totalUsers={totalUsers}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          availableMonths={availableMonths}
          availableYears={availableYears}
          onMonthChange={setSelectedMonth}
          onYearChange={(year) => {
            setSelectedYear(year);
            setSelectedMonth(null);
          }}
        />

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
        <UserTable users={recentUsers} isLoading={isLoading} />
      </div>

      <CreateUserModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
}
