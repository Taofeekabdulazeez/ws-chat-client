import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { buttonVariants } from "../ui/button";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Chat } from "@/types";
import { ChatUserAvatar } from "./chat-user-avatar";

type ChatLinkItemMobileProps = {
  chat: Chat;
};

export function ChatLinkItemMobile({ chat }: ChatLinkItemMobileProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <NavLink
            to="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "xl" }),
              "h-11 w-11 md:h-16 md:w-16",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
            )}
          >
            <ChatUserAvatar avatar={chat?.recipient.avatar} />
            <span className="sr-only">{chat?.recipient.fullName}</span>
          </NavLink>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-4">
          {chat?.recipient.fullName}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
