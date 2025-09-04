import { useEffect } from "react";
import { useAuthStore } from "@/app/store/use-auth-store";
import { authGetApiV1AuthMeGetCurrentUserProfile } from "@/client/sdk.gen";
import { client } from "@/client/client.gen";

export const useAuthInit = () => {
  const { auth, setUser, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      if (isAuthenticated() && auth.access_token && !auth.user) {
        try {
          // Set the authorization header
          client.setConfig({
            headers: {
              Authorization: `Bearer ${auth.access_token}`,
            },
          });

          // Fetch user profile
          const { data: userProfile } =
            await authGetApiV1AuthMeGetCurrentUserProfile();
          setUser(userProfile as any);
        } catch (error) {
          console.error("Failed to fetch user profile on init:", error);
        }
      }
    };

    initializeAuth();
  }, [auth.access_token, auth.user, isAuthenticated, setUser]);
};
