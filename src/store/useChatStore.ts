/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { Chat, Message } from "@/types";

interface ChatStore {
  selectedChat: Chat;
  setSelectedChat: (chat: Chat) => void;
  sendMessage: (text: Partial<Message>) => Promise<any>;
  subscribeToMessages: () => any;
  unsubscribeFromMessages: () => any;
  subscribeUserActivity: () => void;
  unsubscribeFromUserActivity: () => void;
}

export const useChatStore = create<ChatStore>()((set) => ({
  selectedChat: null!,

  setSelectedChat: (chat) => set({ selectedChat: chat }),

  sendMessage: async (messageData) => {
    // const { recipient, id } = get().selectedChat;
    useAuthStore.getState().socket?.emit("new-message", messageData);
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;

    socket.on("chat-update", (newMessage) => {
      console.log("Delivered", newMessage);
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("chat-update");
  },

  subscribeUserActivity: () => {
    const socket = useAuthStore.getState().socket;
    console.log("exe");
    socket.on("user-activity", (data) => {
      console.log(data);
    });
  },

  unsubscribeFromUserActivity: () => {},
}));

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
