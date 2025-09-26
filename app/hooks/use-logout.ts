import { authenticationPostApiV1AuthLogoutLogoutUserMutation } from "@/client/@tanstack/react-query.gen";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/app/store/use-auth-store";
import { useAlert } from "./use-alert";
import { client } from "@/client/client.gen";

export const useLogout = () => {
  const { logout: logoutAlert } = useAlert();
  const { clearAuth } = useAuthStore();

  const logout = useMutation({
    ...authenticationPostApiV1AuthLogoutLogoutUserMutation(),
  });

  const handleLogout = async () => {
    const { auth } = useAuthStore.getState();

    try {
      // Set authorization header for logout API call
      if (auth.access_token) {
        client.setConfig({
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });
      }

      // Call logout API
      await logout.mutateAsync({});
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Clear auth after API call (or on error)
      clearAuth();

      // Clear client config
      client.setConfig({
        headers: {},
      });
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
