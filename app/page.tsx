"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "./components/footer";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "./store/use-auth-store";

export default function Home() {
  const { isAuthenticated } = useAuthStore();
  const isLoggedIn = isAuthenticated();

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
            <Link href={isLoggedIn ? "/introduction" : "/auth/signin"}>
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
