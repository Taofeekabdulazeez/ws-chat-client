import ChatTopbar from "./chat-topbar";
import React from "react";
import NoSelectedChat from "./no-selected-chat";
import { useChatStore } from "@/store/useChatStore";
import ChatBottombar from "./chat-bottombar";
import ChatMessageList from "./chat-message-list";

interface ChatProps {}

export function Chat({}: ChatProps) {
  const selectedUser = useChatStore((state) => state.selectedUser);

  if (!selectedUser) return <NoSelectedChat />;

  return (
    <div className="flex flex-col justify-between w-full h-full scroll-smooth">
      <ChatTopbar />
      <div className="w-full overflow-y-auto h-full flex flex-col">
        <ChatMessageList />
        <ChatBottombar />
      </div>
    </div>
  );
}
