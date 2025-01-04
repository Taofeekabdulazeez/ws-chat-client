import React, { useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatMessageList as ChatMessageListContainer } from "../ui/chat/chat-message-list";
import { useChatStore } from "@/store/useChatStore";
import ChatMessage from "./chat-message";
import { useLayoutStore } from "@/store/useLayoutStore";
import ChatTypingIndicator from "./chat-typing-indicator";

interface ChatListProps {}

export default function ChatMessageList({}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  // const isMobile = useLayoutStore((state) => state.isMobile);
  const {
    messages,
    getMessages,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  useEffect(() => {
    getMessages();
    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

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
