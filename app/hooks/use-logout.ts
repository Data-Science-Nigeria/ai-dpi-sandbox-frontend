import { useRouter } from "next/navigation";
import { authPostApiV1AuthLogoutLogoutMutation } from "@/client/@tanstack/react-query.gen";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/get-api-error-message";
import { useAuthStore } from "@/app/store/use-auth-store";
import { useAlert } from "./use-alert";
import { client } from "@/client/client.gen";

export const useLogout = () => {
  const { logout: logoutAlert } = useAlert();
  const router = useRouter();
  const { clearAuth } = useAuthStore();

  const logout = useMutation({
    ...authPostApiV1AuthLogoutLogoutMutation(),
  });

  const handleLogout = async () => {
    const { auth } = useAuthStore.getState();

    try {
      // Set authorization header before logout
      if (auth.access_token) {
        client.setConfig({
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });
      }

      await logout.mutateAsync({});
      clearAuth();
      router.push("/auth/signin");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      clearAuth();
      router.push("/auth/signin");
    }
  };

  const confirmLogout = () => {
    logoutAlert({
      title: "Logout",
      description: "Are you sure you want to logout?",
      actionText: "Logout",
      onAction: handleLogout,
      showLoading: logout.isPending,
    });
  };

  return {
    handleLogout: confirmLogout,
  };
};
