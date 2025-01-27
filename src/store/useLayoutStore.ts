import { create } from "zustand";

interface LayoutStore {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile }),
  isCollapsed: false,
}));
