"use client";

import { useChatStore } from "@/store/useChatStore";
import ChatSidebarHeader from "./chat/chat-sidebar-header";
import { ChatNavList } from "./chat/chat-nav-list";

interface SidebarProps {
  isCollapsed: boolean;
  onClick?: () => void;
  isMobile: boolean;
}

export function Sidebar({ isCollapsed, isMobile }: SidebarProps) {
  const users = useChatStore((state) => state.users);

  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full bg-muted/10 dark:bg-muted/20 gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      <ChatSidebarHeader
        isCollapsed={isCollapsed}
        chatLength={users?.length ?? 0}
      />
      <ChatNavList isCollapsed={isCollapsed} />
    </div>
  );
}
