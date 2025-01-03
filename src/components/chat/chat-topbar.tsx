import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { UserData } from "@/app/data";
import { Info, Phone, Video } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { ExpandableChatHeader } from "../ui/chat/expandable-chat";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";

interface ChatTopbarProps {}

export const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];

export default function ChatTopbar({}: ChatTopbarProps) {
  const selectedUser = useChatStore((state) => state.selectedUser);
  const onlineUsers = useAuthStore((state) => state.onlineUsers);
  const socket = useAuthStore((state) => state.socket);
  const ref = useRef<HTMLSpanElement>(null!);

  useEffect(() => {
    let activityTimer: NodeJS.Timeout;
    socket.on("user-activity", (userId) => {
      // if (!selectedUser || parseInt(userId) !== selectedUser.id) return;
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
        <Avatar className="flex justify-center items-center">
          <AvatarImage
            src={selectedUser.avatar}
            alt={selectedUser.name}
            width={6}
            height={6}
            className="w-10 h-10 "
          />
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{selectedUser.name}</span>
          <span className="text-xs">
            {onlineUsers.includes(String(selectedUser.id)) ? (
              <span ref={ref}>Online</span>
            ) : (
              `Active 2 mins ago`
            )}
          </span>
        </div>
      </div>

      <div className="flex gap-1">
        {TopbarIcons.map((icon, index) => (
          <Link
            key={index}
            href="#"
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
