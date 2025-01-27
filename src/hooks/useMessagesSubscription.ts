import { useCallback, useEffect } from "react";
import { useSelectedChat } from "./useSelectedChat";
import { useAuthStore } from "@/store/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { Message } from "@/types";

export function useMessagesSubscription() {
  const socket = useAuthStore.getState().socket;
  const selectedChat = useSelectedChat();
  const queryClient = useQueryClient();

  const handleMessagesUpdate = useCallback(
    (newMessage: Message) => {
      console.log("New message", newMessage);
      queryClient.invalidateQueries({
        queryKey: [`chats/${selectedChat.id}`],
      });
    },
    [queryClient, selectedChat.id]
  );

  useEffect(() => {
    socket.on("chat-update", (newMessage) => handleMessagesUpdate(newMessage));

    return () => {
      socket.off("chat-update");
    };
  }, [handleMessagesUpdate, selectedChat, socket]);

  return { messages: selectedChat.messages };
}
