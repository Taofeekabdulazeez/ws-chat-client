import ChatListItem from "./chat-list-item";
import { Chat } from "@/types";

type ChatNavListProps = {
  isCollapsed: boolean;
  chats: Chat[];
};

export function ChatList({ isCollapsed, chats }: ChatNavListProps) {
  return (
    <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
      {chats.map(({ id }) => (
        <ChatListItem key={id} id={id} isCollapsed={isCollapsed} />
      ))}
    </nav>
  );
}
