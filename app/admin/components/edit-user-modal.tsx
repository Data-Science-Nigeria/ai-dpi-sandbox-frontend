"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { ConfirmationModal } from "./confirmation-modal";
import { authPutApiV1AuthAdminUsersUserIdUpdateUserMutation } from "@/client/@tanstack/react-query.gen";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/app/utils/get-api-error-message";

interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
  created_at: string;
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onUpdate: () => void;
}

export function EditUserModal({
  isOpen,
  onClose,
  user,
  onUpdate,
}: EditUserModalProps) {
  const [formData, setFormData] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    email: user.email,
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Reset form data when modal opens or user changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email,
      });
    }
  }, [isOpen, user]);

  const updateUser = useMutation({
    ...authPutApiV1AuthAdminUsersUserIdUpdateUserMutation(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const confirmUpdate = async () => {
    updateUser.mutate(
      {
        path: { user_id: user.id },
        body: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
        },
      },
      {
        onSuccess: () => {
          onUpdate();
          toast.success("User updated successfully");
          onClose();
          setShowConfirmModal(false);
        },
        onError: (error) => {
          toast.error(getApiErrorMessage(error));
        },
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent className="w-[280px] sm:w-[calc(100vw-8rem)] sm:max-w-md mx-auto max-h-[80vh] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit User</AlertDialogTitle>
          </AlertDialogHeader>

          <form onSubmit={handleSubmit} className="space-y-1.5 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full px-1.5 py-0.5 sm:px-3 sm:py-2 border rounded-md text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full px-1.5 py-0.5 sm:px-3 sm:py-2 border rounded-md text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-1.5 py-0.5 sm:px-3 sm:py-2 border rounded-md text-xs sm:text-sm"
                required
              />
            </div>

            <AlertDialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#00A859] hover:bg-[#00A859]/90"
              >
                Save
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmUpdate}
        title="Update User"
        description={`Are you sure you want to update ${user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.email}?`}
        loading={updateUser.isPending}
      />
    </>
  );
}
