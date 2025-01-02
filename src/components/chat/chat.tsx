import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React from "react";
import NoSelectedChat from "./no-selected-chat";
import { useChatStore } from "@/store/useChatStore";

interface ChatProps {
  isMobile: boolean;
}

export function Chat({ isMobile }: ChatProps) {
  const selectedUser = useChatStore((state) => state.selectedUser);

  if (!selectedUser) return <NoSelectedChat />;

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar />

      <ChatList isMobile={isMobile} />
    </div>
  );
}
