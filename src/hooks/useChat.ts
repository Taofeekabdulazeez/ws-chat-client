/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from "@/store/useAuthStore";
import { Chat, Message, User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://localhost:8000";

export function useChat({ chatId }: { chatId: string }) {
  const { isLoading: isChatLoading, data: chat } = useQuery({
    queryFn: () => fetchChat(chatId!),
    queryKey: [`chats/${chatId}`],
  });

  return { chat, isChatLoading };
}

const fetchChat = async (chatId: string) => {
  const response = await axios.get(`${BASE_URL}/chats/${chatId}`);
  const chat = serialiizeChat(response.data.data);

  return chat;
};

function serialiizeChat(data: any) {
  const userId = useAuthStore.getState().authUser?.id as string;
  const chat: Chat = {
    id: data.id as string,
    createdAt: data.createdAt as Date,
    updatedAt: data.updatedAt as Date,
    messages: data.messages as Message[],
    recipient: data.users.find((user: any) => user.id !== userId) as User,
  };

  return chat;
}
