import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "../common/mode-toggle";
import { NewChatDialog } from "./new-chat-dialog";

type ChatSidebarHeaderProps = {
  isCollapsed: boolean;
  chatLength: number;
};

export default function ChatSidebarHeader({
  isCollapsed,
  chatLength,
}: ChatSidebarHeaderProps) {
  if (isCollapsed) return null;
  return (
    <div className="flex justify-between p-2 items-center">
      <div className="flex gap-2 items-center text-2xl">
        <p className="font-medium">Chats</p>
        <span className="text-zinc-300">({chatLength})</span>
      </div>

      <div>
        <Link
          to="#"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-9 w-9"
          )}
        >
          <MoreHorizontal size={20} />
        </Link>
        <NewChatDialog />

        <ModeToggle />
      </div>
    </div>
  );
}
