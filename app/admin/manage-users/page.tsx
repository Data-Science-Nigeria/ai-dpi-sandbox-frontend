"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { ConfirmationModal } from "../components/confirmation-modal";
import { EditUserModal } from "../components/edit-user-modal";
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
      <h1 className="text-2xl font-bold">Manage Users</h1>

      <div className="bg-white dark:bg-[#1C1E22] rounded-lg border">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading users...</div>
        ) : userRoleUsers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No user found</div>
        ) : (
          <>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {currentUsers.map((user: User) => (
                    <tr key={user.id}>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center p-4 border-t">
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(startIndex + usersPerPage, userRoleUsers.length)} of{" "}
                  {userRoleUsers.length} users
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
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
