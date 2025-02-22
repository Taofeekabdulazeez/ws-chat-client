import { useCachedQueryData } from "@/hooks/useCachedQueryData";
import { useChatStore } from "@/store/useChatStore";
import { Chat } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useSelectedChat() {
  const { chatId } = useParams<{ chatId: string }>();
  // const selectedChat = useChatStore((state) => state.selectedChat);
  // const selectedChat = useCachedQueryData<Chat>([`chats/${chatId}`]);
  const { data: selectedChat } = useQuery<Chat>({
    queryKey: [`chats/${chatId}`],
    enabled: false,
  });

  return selectedChat as Chat;
}
