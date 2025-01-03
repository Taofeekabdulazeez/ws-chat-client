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

type User = { id: number; name: string; avatar: string; isTyping: boolean };

interface ChatStore {
  messages: Message[];
  users: User[];
  selectedUser: User;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  isSelectedUserTying: boolean;

  getUsers: () => Promise<any>;
  getMessages: () => Promise<any>;
  sendMessage: (text: string) => Promise<any>;
  subscribeToMessages: () => any;
  unsubscribeFromMessages: () => any;
  setSelectedUser: (user: User) => any;
  setSelectedUserTyping: (x: boolean) => any;
  subscribeUserActivity: () => void;
  unsubscribeFromUserActivity: () => void;
}

export const useChatStore = create<ChatStore>()((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null!,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSelectedUserTying: false,
  setSelectedUserTyping: (x: boolean) =>
    set({
      isSelectedUserTying: x,
      selectedUser: { ...get().selectedUser, isTyping: x },
    }),

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
      const senderId = Number(useAuthStore.getState().authUser?.id);
      const receiverId = get().selectedUser.id;

      const res = await axios.get(
        `${BASE_URL}/messages/${senderId}/chat/${receiverId}`
      );

      const { data: messages } = res.data;
      set({ messages });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (text) => {
    const { selectedUser, messages } = get();
    const messageData = {
      text,
      senderId: useAuthStore.getState().authUser?.id,
      receiverId: selectedUser.id,
    };
    useAuthStore.getState().socket?.emit("new-message", messageData);
    // set({ messages: [...messages, messageData] });
    // try {
    //   const res = await axios.post(`${BASE_URL}/messages`, messageData);
    //   const { data: message } = res.data;
    // } catch (error) {
    //   console.log(error);
    // }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("chat-update", (newMessage) => {
      // const isMessageSentFromSelectedUser =
      //   newMessage.senderId === selectedUser.id;
      // if (!isMessageSentFromSelectedUser) return;

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
      set({ isSelectedUserTying: true });
      // set({ selectedUser: { ...get().selectedUser, isTyping: true } });
    });
  },

  unsubscribeFromUserActivity: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("user-activity", () => set({ isSelectedUserTying: false }));
    // socket.off("user-activity", () => {
    //   set({ selectedUser: { ...get().selectedUser, isTyping: false } });
    // });
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
