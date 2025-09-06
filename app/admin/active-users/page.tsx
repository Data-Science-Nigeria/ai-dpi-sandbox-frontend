"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "../components/confirmation-modal";
import { UserTable } from "../components/user-table";
import { Pagination } from "../components/pagination";
import { PageHeader } from "../components/page-header";
import {
  authGetApiV1AuthAdminUsersListUsersOptions,
  authPostApiV1AuthAdminUsersUserIdDeactivateDeactivateUserMutation,
} from "@/client/@tanstack/react-query.gen";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/app/utils/get-api-error-message";

interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
  created_at: string;
  role?: string;
}

export default function ActiveUsers() {
  const queryClient = useQueryClient();
  const { data: allUsers = [], isLoading } = useQuery({
    ...authGetApiV1AuthAdminUsersListUsersOptions(),
  });

  const users = (allUsers as User[]).filter(
    (user) => user.is_active && (user.role === "user" || !user.role)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const deactivateUser = useMutation({
    ...authPostApiV1AuthAdminUsersUserIdDeactivateDeactivateUserMutation(),
  });

  const usersPerPage = 10;
  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = users.slice(startIndex, startIndex + usersPerPage);

  const handleDeactivate = (user: User) => {
    setSelectedUser(user);
    setShowDeactivateModal(true);
  };

  const confirmDeactivate = async () => {
    if (!selectedUser) return;

    deactivateUser.mutate(
      {
        path: { user_id: selectedUser.id },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["authGetApiV1AuthAdminUsersListUsers"],
          });
          toast.success("User deactivated successfully");
          setShowDeactivateModal(false);
          setSelectedUser(null);
        },
        onError: (error) => {
          toast.error(getApiErrorMessage(error));
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Active Users" />

      <div>
        <UserTable
          users={currentUsers}
          isLoading={isLoading}
          emptyMessage="No Active User found"
          actions={(user) => (
            <>
              <Button
                variant="outline"
                size="sm"
                disabled
                className="bg-green-100 text-green-800 border-green-300"
              >
                Active
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeactivate(user)}
                className="bg-red-100 text-red-800 border-red-300 hover:bg-red-200"
              >
                Deactivate
              </Button>
            </>
          )}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={users.length}
          itemsPerPage={usersPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <ConfirmationModal
        isOpen={showDeactivateModal}
        onClose={() => setShowDeactivateModal(false)}
        onConfirm={confirmDeactivate}
        title="Deactivate User"
        description={`Are you sure you want to deactivate ${selectedUser?.first_name && selectedUser?.last_name ? `${selectedUser.first_name} ${selectedUser.last_name}` : selectedUser?.email}?`}
        loading={deactivateUser.isPending}
      />
    </div>
  );
}
