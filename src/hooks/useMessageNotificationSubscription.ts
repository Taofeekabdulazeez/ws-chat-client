import { useAuthStore } from "@/store/useAuthStore";
import { Chat, Message } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

export function useMessageNotificationSubscription(chat: Chat) {
  const socket = useAuthStore.getState().socket;
  const queryClient = useQueryClient();

  const handleMessagesUpdate = useCallback(
    (newMessage: Message) => {
      // if (newMessage.chatId !== chatId)
      console.log("New message Notification", newMessage);
      queryClient.invalidateQueries({
        queryKey: [`chats/${chat.id}`],
      });
    },
    [queryClient, chat.id]
  );

  useEffect(() => {
    socket.on(`chat-update/${chat.id}`, (newMessage) => {
      console.log("New notification message", newMessage);
      console.log("Chat ID", chat.id);
      queryClient.setQueryData([`chats/${chat.id}`], (oldChat: Chat) => {
        console.log("Old chat", oldChat);
        const newChat = {
          ...oldChat,
          messages: [...oldChat!.messages, newMessage],
        };
        return newChat;
      });
      // queryClient.invalidateQueries({
      //   queryKey: [`chats`, `chats/${newMessage.chatId}`],
      // });
    });

    return () => {
      socket.off(`chat-update/${chat.id}`);
    };
  }, [handleMessagesUpdate, socket, queryClient, chat]);

  return { messages: chat.messages };
}
