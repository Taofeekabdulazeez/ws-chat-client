import ChatBottombar from "@/components/chat/chat-bottombar";
import ChatMessageList from "@/components/chat/chat-message-list";
import ChatTopbar from "@/components/chat/chat-topbar";
import NoSelectedChat from "@/components/chat/no-selected-chat";
import { useSelectedChat } from "@/hooks/useSelectedChat";

export default function ChatPage() {
  const selectedChat = useSelectedChat();

  if (!selectedChat) return <NoSelectedChat />;

  return (
    <div className="flex flex-col justify-between w-full h-full scroll-smooth">
      <ChatTopbar />
      <div className="w-full overflow-y-auto h-full flex flex-col">
        <ChatMessageList />
        <ChatBottombar />
      </div>
    </div>
  );
}
