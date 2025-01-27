import { useChat } from "@/hooks/useChat";
import { ChatLinkItemMobile } from "./chat-link-item-mobile";
import { ChatLinkItem } from "./chat-link-item";

type ChatLinkProps = {
  id: string;
  isCollapsed: boolean;
};

export default function ChatListItem({ id, isCollapsed }: ChatLinkProps) {
  const { isChatLoading, chat } = useChat({ chatId: id });

  if (isChatLoading && !chat) return <div>Loading...</div>;

  if (!isChatLoading && !chat) return <div>No chat</div>;

  return isCollapsed ? (
    <ChatLinkItemMobile chat={chat!} />
  ) : (
    <ChatLinkItem chat={chat!} />
  );
}
