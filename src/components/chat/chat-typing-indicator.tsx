import { useEffect, useState } from "react";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "../ui/chat/chat-bubble";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";

type ChatTypingIndicatorProps = {
  scroll?: () => void;
};

export default function ChatTypingIndicator({
  scroll,
}: ChatTypingIndicatorProps) {
  const [isRecepientTyping, setIsRecepientTyping] = useState(false);
  const socket = useAuthStore((state) => state.socket);
  const selectedUser = useChatStore((state) => state.selectedUser);

  useEffect(() => {
    let activityTimer: NodeJS.Timeout;
    scroll?.();
    socket.on("user-activity", (userId) => {
      // if (!selectedUser || parseInt(userId) !== selectedUser.id) return;
      setIsRecepientTyping(true);

      clearTimeout(activityTimer);
      activityTimer = setTimeout(() => {
        // ref.current.textContent = "Online";
        setIsRecepientTyping(false);
      }, 2000);
    });

    return () => {
      socket.off("user-activity");
    };
  });

  if (!isRecepientTyping) return null;

  return (
    <ChatBubble variant="received">
      <ChatBubbleAvatar
        src={selectedUser.avatar}
        fallback={selectedUser.avatar}
      />
      <ChatBubbleMessage isLoading />
    </ChatBubble>
  );
}
