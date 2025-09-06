"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfirmationModal } from "../components/confirmation-modal";
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
      <h1 className="text-2xl font-bold">Deactivated Users</h1>

      <div className="bg-white dark:bg-[#1C1E22] rounded-lg border">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No Deactivated User found
          </div>
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
                  {Math.min(startIndex + usersPerPage, users.length)} of{" "}
                  {users.length} users
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
