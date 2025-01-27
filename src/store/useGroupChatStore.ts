import { create } from "zustand";

type Group = {
  id: string;
  name: string;
  description: string;
};

interface GroupChatStore {
  selectedGroup: Group;
}

export const useGroupChatStore = create<GroupChatStore>(() => ({
  selectedGroup: null!,
}));
