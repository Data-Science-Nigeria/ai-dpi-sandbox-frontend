"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { ConfirmationModal } from "../components/confirmation-modal";
import { EditUserModal } from "../components/edit-user-modal";
import { UserTable } from "../components/user-table";
import { Pagination } from "../components/pagination";
import { PageHeader } from "../components/page-header";
import {
  authGetApiV1AuthAdminUsersListUsersOptions,
  authDeleteApiV1AuthAdminUsersUserIdDeleteUserMutation,
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

export default function ManageUsers() {
  const queryClient = useQueryClient();
  const { data: users = [], isLoading } = useQuery({
    ...authGetApiV1AuthAdminUsersListUsersOptions(),
    refetchInterval: 3000, // Auto-refresh every 3 seconds
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const deleteUser = useMutation({
    ...authDeleteApiV1AuthAdminUsersUserIdDeleteUserMutation(),
  });

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

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;

    deleteUser.mutate(
      {
        path: { user_id: selectedUser.id },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["authGetApiV1AuthAdminUsersListUsers"],
          });
          toast.success("User deleted successfully");
          setShowDeleteModal(false);
          setSelectedUser(null);
        },
        onError: (error) => {
          toast.error(getApiErrorMessage(error));
        },
      }
    );
  };

  const handleUpdateUser = () => {
    queryClient.invalidateQueries({
      queryKey: ["authGetApiV1AuthAdminUsersListUsers"],
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Manage Users" />

      <div>
        <UserTable
          users={currentUsers}
          isLoading={isLoading}
          emptyMessage="No user found"
          actions={(user) => (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(user)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(user)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
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

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete User"
        description={`Are you sure you want to delete ${selectedUser?.first_name && selectedUser?.last_name ? `${selectedUser.first_name} ${selectedUser.last_name}` : selectedUser?.email}?`}
        loading={deleteUser.isPending}
      />

      {selectedUser && (
        <EditUserModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          user={selectedUser}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
}
