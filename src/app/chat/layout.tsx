"use client";

import { ReactNode, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  // console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      {/* // <div className="flex h-[calc(100dvh)] flex-col items-center justify-center p-4 md:px-24 py-16 gap-4"> */}{" "}
      {/* <div className="flex justify-between w-full items-center">
        <div className="flex gap-3 md:gap-6 items-center">
          <Link
            href="#"
            className="text-xl sm:text-2xl md:text-4xl font-bold text-gradient"
          >
            Chatify
          </Link>
        </div>
        <div className="flex gap-1 items-center">
          <Link
            href="https://github.com/jakobhoeg/shadcn-chat"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "size-7"
            )}
          >
            <GitHubLogoIcon className="size-7" />
          </Link>
          <ModeToggle />
        </div>
      </div> */}
      <div className="z-10 border rounded-lg w-full h-full text-sm flex">
        {/* Page content */}
        {children}
      </div>
      {/* Footer */}
      {/* Chat support component */}
    </div>
  );
}
