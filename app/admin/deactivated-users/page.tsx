"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "../components/confirmation-modal";
import { UserTable } from "../components/user-table";
import { Pagination } from "../components/pagination";
import { PageHeader } from "../components/page-header";
import {
  authGetApiV1AuthAdminUsersListUsersOptions,
  authPostApiV1AuthAdminUsersUserIdActivateActivateUserMutation,
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

export default function DeactivatedUsers() {
  const queryClient = useQueryClient();
  const { data: allUsers = [], isLoading } = useQuery({
    ...authGetApiV1AuthAdminUsersListUsersOptions(),
    refetchInterval: 3000, // Auto-refresh every 3 seconds
  });

  const users = (allUsers as User[]).filter(
    (user: User) => !user.is_active && (user.role === "user" || !user.role)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const activateUser = useMutation({
    ...authPostApiV1AuthAdminUsersUserIdActivateActivateUserMutation(),
  });

  const usersPerPage = 10;
  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = users.slice(startIndex, startIndex + usersPerPage);

  const handleActivate = (user: User) => {
    setSelectedUser(user);
    setShowActivateModal(true);
  };

  const confirmActivate = async () => {
    if (!selectedUser) return;

    activateUser.mutate(
      {
        path: { user_id: selectedUser.id },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["authGetApiV1AuthAdminUsersListUsers"],
          });
          toast.success("User activated successfully");
          setShowActivateModal(false);
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
      <PageHeader title="Deactivated Users" />

      <div>
        <UserTable
          users={currentUsers}
          isLoading={isLoading}
          emptyMessage="No Deactivated User found"
          actions={(user) => (
            <>
              <Button
                variant="outline"
                size="sm"
                disabled
                className="bg-red-100 text-red-800 border-red-300"
              >
                Deactivated
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleActivate(user)}
                className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200"
              >
                Activate
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
        isOpen={showActivateModal}
        onClose={() => setShowActivateModal(false)}
        onConfirm={confirmActivate}
        title="Activate User"
        description={`Are you sure you want to activate ${selectedUser?.first_name && selectedUser?.last_name ? `${selectedUser.first_name} ${selectedUser.last_name}` : selectedUser?.email}?`}
        loading={activateUser.isPending}
      />
    </div>
  );
}
