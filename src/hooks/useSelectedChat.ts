// import { useCachedQueryData } from "@/hooks/useCachedQueryData";
import { Chat } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useSelectedChat() {
  const { chatId } = useParams<{ chatId: string }>();
  // const selectedChat = useCachedQueryData<Chat>([`chats/${chatId}`]);
  const { data: selectedChat } = useQuery<Chat>(
    { queryKey: [`chats/${chatId}`], enabled: false }
    // { ensureQueryData: true }
  );

  return selectedChat as Chat;
}
