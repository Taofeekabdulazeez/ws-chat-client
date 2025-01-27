"use client";

import { useChats } from "@/hooks/useChats";
import { ChatList } from "./chat-list";
import ChatSidebarHeader from "./chat-sidebar-header";

interface SidebarProps {
  isCollapsed: boolean;
  onClick?: () => void;
}

export function ChatSidebar({ isCollapsed }: SidebarProps) {
  const { chats } = useChats();

  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full bg-muted/10 dark:bg-muted/20 gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      <ChatSidebarHeader
        isCollapsed={isCollapsed}
        chatLength={chats?.length ?? 0}
      />
      <ChatList isCollapsed={isCollapsed} chats={chats ?? []} />
    </div>
  );
}
