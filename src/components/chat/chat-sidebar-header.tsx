import Link from "next/link";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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
          href="#"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-9 w-9"
          )}
        >
          <MoreHorizontal size={20} />
        </Link>

        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-9 w-9"
          )}
        >
          <SquarePen size={20} />
        </Link>
      </div>
    </div>
  );
}
