import { useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatMessageList as ChatMessageListContainer } from "../ui/chat/chat-message-list";
import ChatMessage from "./chat-message";
import ChatTypingIndicator from "./chat-typing-indicator";
import { useMessagesSubscription } from "@/hooks/useMessagesSubscription";

export default function ChatMessageList() {
  const { messages } = useMessagesSubscription();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const scrollTobottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  return (
    <ChatMessageListContainer ref={messagesContainerRef}>
      <AnimatePresence>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} index={index} />
        ))}
        <ChatTypingIndicator
          index={messages?.length ?? 0}
          scroll={scrollTobottom}
        />
      </AnimatePresence>
    </ChatMessageListContainer>
  );
}
