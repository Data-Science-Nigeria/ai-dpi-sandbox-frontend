"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { ConfirmationModal } from "./confirmation-modal";
import { authPostApiV1AuthAdminUsersUserIdResetPasswordResetUserPasswordMutation } from "@/client/@tanstack/react-query.gen";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/app/utils/get-api-error-message";
import { PasswordInput } from "@/app/auth/components/password-input";

interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
  created_at: string;
}

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export function ResetPasswordModal({
  isOpen,
  onClose,
  user,
}: ResetPasswordModalProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const resetPassword = useMutation({
    ...authPostApiV1AuthAdminUsersUserIdResetPasswordResetUserPasswordMutation(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPassword = newPasswordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";

    // Validate passwords
    const newErrors: { [key: string]: string } = {};

    if (newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setShowConfirmModal(true);
  };

  const confirmReset = async () => {
    const newPassword = newPasswordRef.current?.value || "";

    resetPassword.mutate(
      {
        path: { user_id: user.id },
        body: {
          new_password: newPassword,
        },
      },
      {
        onSuccess: () => {
          toast.success("Password reset successfully");
          onClose();
          if (newPasswordRef.current) newPasswordRef.current.value = "";
          if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";
          setShowConfirmModal(false);
        },
        onError: (error) => {
          toast.error(getApiErrorMessage(error));
        },
      }
    );
  };

  const handleClose = () => {
    onClose();
    if (newPasswordRef.current) newPasswordRef.current.value = "";
    if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";
    setErrors({});
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={handleClose}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Reset Password for{" "}
              {user.first_name && user.last_name
                ? `${user.first_name} ${user.last_name}`
                : user.email}
            </AlertDialogTitle>
          </AlertDialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <PasswordInput
              ref={newPasswordRef}
              label="New Password"
              error={errors.newPassword}
            />

            <PasswordInput
              ref={confirmPasswordRef}
              label="Confirm Password"
              error={errors.confirmPassword}
            />

            <AlertDialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
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
        onConfirm={confirmReset}
        title="Reset Password"
        description={`Are you sure you want to reset password for ${user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.email}?`}
        loading={resetPassword.isPending}
      />
    </>
  );
}
