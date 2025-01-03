"use client";

import Link from "next/link";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Message, userData } from "@/app/data";
import { useChatStore } from "@/store/useChatStore";
import { useEffect, useMemo } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import clsx from "clsx";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import ChatLink from "./chat-link";

interface Chat {
  userId: number;
  name: string;
  messages: Message[];
  isAuthUser: boolean;
  avatar: string;
  isOnline: boolean;
  variant: "secondary" | "ghost";
}

type ChatNavListProps = {
  isCollapsed: boolean;
};

export function ChatNavList({ isCollapsed }: ChatNavListProps) {
  const { onlineUsers, authUser } = useAuthStore();
  const { setSelectedUser, users, getUsers, selectedUser } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  console.log(users);
  console.log(onlineUsers);

  const chats: Chat[] = useMemo(
    () =>
      users.map((user) => ({
        userId: user.id,
        isAuthUser: user.id == authUser?.id,
        name: user.name,
        messages: [],
        avatar: user.avatar,
        isOnline: onlineUsers.includes(String(user.id)),
        variant: selectedUser?.name === user.name ? "secondary" : "ghost",
      })),
    [selectedUser, onlineUsers, users, authUser]
  );

  return (
    <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
      {chats.map((chat, index) => (
        <ChatLink
          key={index}
          index={index}
          chat={chat}
          isCollapsed={isCollapsed}
        />
      ))}
      {/* {chats.map((chat, index) => {
        if (chat.isAuthUser) return;
        return isCollapsed ? (
          <TooltipProvider key={index}>
            <Tooltip key={index} delayDuration={0}>
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
            key={index}
            href="#"
            onClick={() => {
              setSelectedUser(users[index]);
            }}
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
      })} */}
    </nav>
  );
}
