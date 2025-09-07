"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { authPostApiV1AuthAdminUsersCreateUserMutation } from "@/client/@tanstack/react-query.gen";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/app/utils/get-api-error-message";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateUserModal({ isOpen, onClose }: CreateUserModalProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const createUser = useMutation({
    ...authPostApiV1AuthAdminUsersCreateUserMutation(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createUser.mutate(
      {
        body: {
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          username: formData.username,
          password: formData.password,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["authGetApiV1AuthAdminUsersListUsers"],
          });
          toast.success("User created successfully");
          onClose();
          setFormData({
            email: "",
            first_name: "",
            last_name: "",
            username: "",
            password: "",
          });
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
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[calc(100vw-3rem)] max-w-xs sm:max-w-md mx-auto max-h-[85vh]">
        <AlertDialogHeader>
          <AlertDialogTitle>Create New User</AlertDialogTitle>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-md text-xs sm:text-sm"
              required
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
              className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-md text-xs sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-md text-xs sm:text-sm"
              required
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
              className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-md text-xs sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-2 py-1 sm:px-3 sm:py-2 pr-8 border rounded-md text-xs sm:text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <AlertDialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={createUser.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#00A859] hover:bg-[#00A859]/90"
              disabled={createUser.isPending}
            >
              {createUser.isPending ? "Creating..." : "Create"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
