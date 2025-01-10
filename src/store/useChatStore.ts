import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";

const BASE_URL = "http://localhost:8000";

type Message = {
  id: number;
  senderId: number;
  receiverId: number;
  text: string;
  timestamp: Date;
};

type User = {
  id: string;
  email: string;
  fullName: string;
  avatar: string;
  lastLogin: Date;
};

interface ChatStore {
  messages: Message[];
  users: User[];
  selectedUser: User;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;

  getUsers: () => Promise<any>;
  getMessages: () => Promise<any>;
  sendMessage: (text: string) => Promise<any>;
  subscribeToMessages: () => any;
  unsubscribeFromMessages: () => any;
  setSelectedUser: (user: User) => any;
  subscribeUserActivity: () => void;
  unsubscribeFromUserActivity: () => void;
}

export const useChatStore = create<ChatStore>()((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null!,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axios.get(`${BASE_URL}/auth/users`);
      const { data: users } = res.data;
      set({ users });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async () => {
    set({ isMessagesLoading: true });
    try {
      const senderId = useAuthStore.getState().authUser?.id;
      const receiverId = get().selectedUser.id;

      const res = await axios.get(
        `${BASE_URL}/messages/${senderId}/chat/${receiverId}`
      );

      console.log({ senderId, receiverId });

      const { data: messages } = res.data;
      console.log(messages);
      set({ messages });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (text) => {
    const selectedUser = get().selectedUser;
    const messageData = {
      text,
      senderId: useAuthStore.getState().authUser?.id,
      receiverId: selectedUser.id,
    };
    useAuthStore.getState().socket?.emit("new-message", messageData);
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("chat-update", (newMessage) => {
      set({
        messages: [...get().messages, newMessage],
      });
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

  unsubscribeFromUserActivity: () => {
    const socket = useAuthStore.getState().socket;
    // socket.off("user-activity", () => set({ isSelectedUserTying: false }));
    // socket.off("user-activity", () => {
    //   set({ selectedUser: { ...get().selectedUser, isTyping: false } });
    // });
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
