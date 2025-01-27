import { useEffect, useRef } from "react";
import { Info, Phone, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { ExpandableChatHeader } from "../ui/chat/expandable-chat";
import { useAuthStore } from "@/store/useAuthStore";
import { getLastSeenMessage } from "@/lib/utils";
import { useSelectedChat } from "@/hooks/useSelectedChat";
import { ChatUserAvatar } from "./chat-user-avatar";

export const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];

export default function ChatTopbar() {
  const { recipient } = useSelectedChat();
  const onlineUsers = useAuthStore((state) => state.onlineUsers);
  const socket = useAuthStore((state) => state.socket);
  const ref = useRef<HTMLSpanElement>(null!);

  useEffect(() => {
    let activityTimer: NodeJS.Timeout;
    socket.on("user-activity", (userId) => {
      if (userId !== recipient?.id) return;
      ref.current.textContent = "Typing...";

      clearTimeout(activityTimer);
      activityTimer = setTimeout(() => {
        ref.current.textContent = "Online";
      }, 2000);
    });

    return () => {
      socket.off("user-activity");
    };
  });

  return (
    <ExpandableChatHeader>
      <div className="flex items-center gap-2">
        <ChatUserAvatar avatar={recipient.avatar} />
        <div className="flex flex-col">
          <span className="font-medium">{recipient.fullName}</span>
          <span className="text-xs">
            {onlineUsers.includes(String(recipient.id)) ? (
              <span ref={ref}>Online</span>
            ) : (
              <span>{`${getLastSeenMessage(
                new Date(recipient.lastLogin)
              )}`}</span>
            )}
          </span>
        </div>
      </div>

      <div className="flex gap-1">
        {TopbarIcons.map((icon, index) => (
          <Link
            key={index}
            to="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9"
            )}
          >
            <icon.icon size={20} className="text-muted-foreground" />
          </Link>
        ))}
      </div>
    </ExpandableChatHeader>
  );
}
