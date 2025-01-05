import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import clsx from "clsx";
import { buttonVariants } from "../ui/button";
import { Message } from "@/app/data";
import { useChatStore } from "@/store/useChatStore";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useRef } from "react";

type Chat = {
  userId: string;
  name: string;
  messages: Message[];
  isAuthUser: boolean;
  avatar: string;
  isOnline: boolean;
  variant: "secondary" | "ghost";
};

type ChatLinkProps = {
  chat: Chat;
  index: number;
  isCollapsed: boolean;
};

export default function ChatLink({ chat, isCollapsed, index }: ChatLinkProps) {
  const users = useChatStore((state) => state.users);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);
  const selectedUser = useChatStore((state) => state.selectedUser);
  const socket = useAuthStore((state) => state.socket);

  const ref = useRef<HTMLSpanElement>(null!);

  useEffect(() => {
    let activityTimer: NodeJS.Timeout;
    // if (selectedUser?.id !== chat.userId) return;
    socket.on("user-activity", (userId) => {
      console.log("user typing", userId);
      if (!ref.current) return;
      if (userId !== chat.userId) return;
      ref.current.textContent = "Typing...";

      clearTimeout(activityTimer);
      activityTimer = setTimeout(() => {
        ref.current.textContent = "";
      }, 2000);
    });

    return () => {
      socket.off("user-activity");
    };
  });

  if (chat.isAuthUser) return null;
  return isCollapsed ? (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: chat.variant, size: "icon" }),
              "h-11 w-11 md:h-16 md:w-16",
              chat.variant === "secondary" &&
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
            )}
          >
            <Avatar className="flex justify-center items-center">
              <AvatarImage
                src={chat.avatar}
                alt={chat.avatar}
                width={6}
                height={6}
                className="w-10 h-10 "
              />
            </Avatar>{" "}
            <span className="sr-only">{chat.name}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-4">
          {chat.name}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Link
      href="#"
      onClick={() => setSelectedUser(users[index])}
      className={cn(
        buttonVariants({ variant: chat.variant, size: "xl" }),
        "relative before:content-[''] before:absolute before:bottom-4 before:left-4 before:z-20 before:h-3 before:w-3 before:inline-block before:rounded-full",
        chat.isOnline ? "before:bg-green-500" : "before:bg-secondary",
        chat.variant === "secondary" &&
          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink",
        "justify-start gap-4"
      )}
    >
      <Avatar className={clsx("flex justify-center items-center")}>
        <AvatarImage
          src={chat.avatar}
          alt={chat.avatar}
          width={6}
          height={6}
          className="w-10 h-10"
        />
      </Avatar>
      <div className="flex flex-col max-w-28">
        <span>{chat.name}</span>
        <span ref={ref} className="text-green-500 text-xs truncate"></span>
        {chat.messages.length > 0 && (
          <span className="text-zinc-300 text-xs truncate ">
            {chat.messages[chat.messages.length - 1].name.split(" ")[0]}:{" "}
            {chat.messages[chat.messages.length - 1].isLoading
              ? "Typing..."
              : chat.messages[chat.messages.length - 1].message}
          </span>
        )}
      </div>
    </Link>
  );
}
