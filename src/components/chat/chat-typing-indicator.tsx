import { useEffect, useState } from "react";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "../ui/chat/chat-bubble";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { motion } from "framer-motion";

type ChatTypingIndicatorProps = {
  index: number;
  scroll?: () => void;
};

export default function ChatTypingIndicator({
  index,
  scroll,
}: ChatTypingIndicatorProps) {
  const [isRecepientTyping, setIsRecepientTyping] = useState(false);
  const socket = useAuthStore((state) => state.socket);
  const recipient = useChatStore((state) => state.selectedChat?.recipient);

  useEffect(() => {
    let activityTimer: NodeJS.Timeout;
    scroll?.();
    socket.on("user-activity", (userId) => {
      if (userId !== recipient?.id) return;
      setIsRecepientTyping(true);

      clearTimeout(activityTimer);
      activityTimer = setTimeout(() => {
        setIsRecepientTyping(false);
      }, 3000);
    });

    return () => {
      socket.off("user-activity");
    };
  });

  if (!isRecepientTyping) return null;

  return (
    <motion.div
      key={index}
      layout
      initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
      transition={{
        opacity: { duration: 0.1 },
        layout: {
          type: "spring",
          bounce: 0.3,
          duration: index * 0.05 + 0.2,
        },
      }}
      style={{ originX: 0.5, originY: 0.5 }}
      className="flex flex-col gap-2 p-4"
    >
      <ChatBubble variant="received">
        <ChatBubbleAvatar
          className="animate-pulse"
          src={recipient.avatar}
          fallback={recipient.avatar}
        />
        <ChatBubbleMessage isLoading />
      </ChatBubble>
    </motion.div>
  );
}
