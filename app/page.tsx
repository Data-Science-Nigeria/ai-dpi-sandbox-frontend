"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "./components/footer";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "./store/use-auth-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { isAuthenticated, isAdmin, auth } = useAuthStore();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const isLoggedIn = isAuthenticated();
    const userIsAdmin = isAdmin();

    if (isLoggedIn && auth.user) {
      if (userIsAdmin) {
        router.push("/admin/dashboard");
      } else {
        router.push("/introduction");
      }
    }
  }, [isHydrated, isAuthenticated, isAdmin, auth.user, router]);

  const isLoggedIn = isAuthenticated();
  const userIsAdmin = isAdmin();

  const getDashboardUrl = () => {
    if (!isLoggedIn) return "/auth/signin";
    return userIsAdmin ? "/admin/dashboard" : "/introduction";
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-[#121418] text-black dark:text-white">
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-8">
          <Image
            src="/dsn-logo.svg"
            alt="Dsn Logo"
            width={200}
            height={50}
            priority
          />

          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-center">
            Welcome to the Sandbox Platform
          </h1>

          <div className="flex justify-center">
            <Link href={getDashboardUrl()}>
              <Button className="px-8 py-3 bg-[#00A859] text-white hover:bg-[#008A4A] transition-colors">
                {isLoggedIn ? "Return to Dashboard" : "Login"}
              </Button>
            </Link>
            {/* <Link href="/auth/signup">
              <Button className="px-8 py-3 bg-[#00A859] text-white hover:bg-[#008A4A] transition-colors">
                Signup
              </Button>
            </Link> */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
