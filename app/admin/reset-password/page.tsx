"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ResetPasswordModal } from "../components/reset-password-modal";
import { UserTable } from "../components/user-table";
import { Pagination } from "../components/pagination";
import { PageHeader } from "../components/page-header";
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

export default function ResetPassword() {
  const { data: users = [], isLoading } = useQuery({
    ...authGetApiV1AuthAdminUsersListUsersOptions(),
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Filter to show only users with 'user' role
  const userRoleUsers = (users as User[]).filter(
    (user) => user.role === "user" || !user.role
  );

  const usersPerPage = 10;
  const totalPages = Math.ceil(userRoleUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = userRoleUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const handleResetPassword = (user: User) => {
    setSelectedUser(user);
    setShowResetModal(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Reset User Password" />

      <div>
        <UserTable
          users={currentUsers}
          isLoading={isLoading}
          emptyMessage="No data found"
          actions={(user) => (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleResetPassword(user)}
            >
              Reset Password
            </Button>
          )}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={userRoleUsers.length}
          itemsPerPage={usersPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {selectedUser && (
        <ResetPasswordModal
          isOpen={showResetModal}
          onClose={() => setShowResetModal(false)}
          user={selectedUser}
        />
      )}
    </div>
  );
}
