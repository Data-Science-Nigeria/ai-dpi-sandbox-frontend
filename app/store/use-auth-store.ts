import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Auth = {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  refresh_token?: string | null;
  user?: {
    id?: string;
    email?: string;
    is_verified?: boolean;
    created_at?: string;
  } | null;
};

const initialAuth: Auth = {
  access_token: "",
  user: null,
};

interface AuthState {
  auth: Auth;
  setAuth: (auth: Partial<Auth>, ttlInMs?: number) => void;
  setUser: (user: Auth["user"]) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        auth: initialAuth,

        setAuth: (auth, ttlInMs) => {
          const expiryTime =
            ttlInMs ||
            (auth.expires_in ? auth.expires_in * 1000 : 1000 * 60 * 60);
          const expiry = Date.now() + expiryTime;
          localStorage.setItem("auth_expiry", expiry.toString());
          set((state) => ({ auth: { ...state.auth, ...auth } }));
        },

        setUser: (user) => {
          set((state) => ({ auth: { ...state.auth, user } }));
        },

        isAuthenticated: (): boolean => {
          const state = get();
          return !!state.auth.access_token;
        },

        clearAuth: () => {
          localStorage.removeItem("auth_expiry");
          set({ auth: initialAuth });
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({ auth: state.auth }),

        onRehydrateStorage: () => (state) => {
          const expiry = localStorage.getItem("auth_expiry");
          const now = Date.now();

          if (expiry && now > Number(expiry)) {
            // Token has expired
            state?.clearAuth();
          }
        },
      }
    ),
    {
      name: "Auth Store",
      enabled: process.env.NODE_ENV === "development",
    }
  )
);
