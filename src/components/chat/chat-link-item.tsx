import { Chat } from "@/types";
import { ChatUserAvatar } from "./chat-user-avatar";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { format, isToday } from "date-fns";
import { useAuthStore } from "@/store/useAuthStore";
import { useMessageNotificationSubscription } from "@/hooks/useMessageNotificationSubscription";
import { useChatActivitySubscription } from "@/hooks/useChatActivitySubscription";
import { useMemo } from "react";
import { CheckCheck } from "lucide-react";
import clsx from "clsx";

type ChatLinkItemProps = {
  chat: Chat;
};

export function ChatLinkItem({ chat }: ChatLinkItemProps) {
  const onlineUsers = useAuthStore((state) => state.onlineUsers);
  const { typingIndicatorRef, lastMessageRef } =
    useChatActivitySubscription(chat);
  const { messages } = useMessageNotificationSubscription(chat);
  console.log(messages);
  const authUser = useAuthStore((state) => state.authUser);
  const lastChatMessage = messages[chat?.messages.length - 1];
  const numberOfUnreadMessages = useMemo(
    () => messages.filter((message) => !message.isRead).length,
    [messages]
  );

  return (
    <NavLink
      to={chat?.id as string}
      className={cn(
        buttonVariants({ variant: "ghost", size: "xl" }),
        "relative before:content-[''] before:absolute before:bottom-4 before:left-4 before:z-20 before:h-3 before:w-3 before:inline-block before:rounded-full",
        onlineUsers.includes(chat!.recipient.id)
          ? "before:bg-green-500"
          : "before:bg-secondary",
        // variant === "secondary" &&
        "[&.active]:bg-muted [&.active]:dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink",
        "justify-start gap-4"
      )}
    >
      <ChatUserAvatar avatar={chat?.recipient.avatar} />
      <div className="flex flex-col max-w-28">
        <span>{chat?.recipient.fullName}</span>
        <span
          ref={typingIndicatorRef}
          className="text-xs truncate text-green-500"
        ></span>
        <span
          ref={lastMessageRef}
          className="text-muted-foreground text-xs truncate"
        >
          <span>
            {lastChatMessage?.senderId === authUser?.id ? (
              <CheckCheck
                size={14}
                className={clsx("inline-block mr-0.5", {
                  "stroke-blue-500 dark:stroke-blue-300":
                    lastChatMessage.isRead,
                })}
              />
            ) : null}
          </span>
          {lastChatMessage?.text}
        </span>
        {
          <span className="absolute right-4 bottom-9 text-xs text-green-500 lowercase">
            {formatLastMessageDate(new Date(lastChatMessage!.timestamp))}
          </span>
        }
        {numberOfUnreadMessages && (
          <span className="h-4 w-4 absolute right-8 bottom-4 bg-green-500 flex items-center justify-center rounded-full text-green-100 text-xs">
            {numberOfUnreadMessages}
          </span>
        )}
      </div>
    </NavLink>
  );
}

function formatLastMessageDate(date: Date) {
  const output = isToday(date)
    ? format(date, "h:mma")
    : date.toLocaleDateString();

  return output;
}
