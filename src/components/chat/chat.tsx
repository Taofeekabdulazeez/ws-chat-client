"use client";

import ChatTopbar from "./chat-topbar";
import NoSelectedChat from "./no-selected-chat";
import ChatBottombar from "./chat-bottombar";
import ChatMessageList from "./chat-message-list";
import { useSelectedChat } from "@/hooks/useSelectedChat";

export function Chat() {
  const selectedChat = useSelectedChat();

  if (!selectedChat) return <NoSelectedChat />;

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
