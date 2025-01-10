import { create } from "zustand";

type Group = {
  id: string;
  name: string;
  description: string;
};

interface GroupChatStore {
  selectedGroup: Group;
}

const useGroupChatStore = create<GroupChatStore>((set, get) => ({
  selectedGroup: null!,
}));
