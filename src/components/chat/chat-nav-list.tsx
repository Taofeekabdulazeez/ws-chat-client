"use client";

import { Message, userData } from "@/app/data";
import { useChatStore } from "@/store/useChatStore";
import { useEffect, useMemo } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import ChatLink from "./chat-link";

interface Chat {
  userId: string;
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
  const { users, getUsers, selectedUser } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const chats: Chat[] = useMemo(
    () =>
      users.map((user) => ({
        userId: user.id,
        isAuthUser: user.id == authUser?.id,
        name: user.fullName,
        messages: [],
        avatar: user.avatar,
        isOnline: onlineUsers.includes(user.id),
        variant:
          selectedUser?.fullName === user.fullName ? "secondary" : "ghost",
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
    </nav>
  );
}
