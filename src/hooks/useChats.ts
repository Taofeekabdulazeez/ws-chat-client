/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chat } from "@/types";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";

const BASE_URL = "http://localhost:8000";

export function useChats() {
  const authUser = useAuthStore((state) => state.authUser);
  const { isLoading: isChatsLoading, data: chats } = useQuery({
    queryKey: ["chats"],
    queryFn: () => fetchChats(authUser?.id as string),
  });

  return { chats, isChatsLoading };
}

export function useSendMessage() {}

const fetchChats = async (userId: string) => {
  const response = await axios.get(`${BASE_URL}/auth/user/${userId}/chats`);
  // const chats = serialiizeChats(userId, response.data.data);
  const chats = response.data.data;

  return chats as Chat[];
};

// function serialiizeChats(userId: string, data: Array<any>) {
//   const chats: Chat[] = data.map((chat) => {
//     const id = chat.id as string;
//     const createdAt = chat.createdAt as Date;
//     const updatedAt = chat.updatedAt as Date;
//     const messages = chat.messages as Message[];
//     const recipient = chat.users.find(
//       (user: any) => user.id !== userId
//     ) as User;

//     return { id, createdAt, updatedAt, messages, recipient };
//   });

//   return chats;
// }
