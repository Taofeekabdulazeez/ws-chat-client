import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import axios from "axios";

const BASE_URL = "http://localhost:8000";

function wait(secs: number = 3000) {
  return new Promise((resolve) => setTimeout(resolve, secs));
}

type User = { id: number; name: string; avatar: string };

interface AuthStore {
  isUpdatingProfile: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  authUser: User | null;
  socket: Socket;
  updateProfile: (profileData: any) => Promise<any>;
  connectSocket: () => any;
  disconnectSocket: () => any;
  checkAuth: () => Promise<any>;
  signup: (data: any) => Promise<any>;
  login: (data: any) => Promise<any>;
  logout: (data: any) => Promise<any>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null!,

  checkAuth: async () => {
    try {
      await wait(3000);
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      await wait();
      get().connectSocket();
    } catch (error) {
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    const response = await axios.post(`${BASE_URL}/auth/login`, data);
    const { data: user } = response.data;
    console.log(user);
    try {
      set({ authUser: user });
      await get().connectSocket();
    } catch (error) {
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      set({ authUser: null });
      get().disconnectSocket();
    } catch (error) {}
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      set({ authUser: data });
    } catch (error) {
      console.log("error in update profile:", error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser.id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("get-online-users", (userIds) => set({ onlineUsers: userIds }));
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
