import { useCachedQueryData } from "@/hooks/useCachedQueryData";
import { Chat } from "@/types";

export function useCachedChats() {
  const cachedChats = useCachedQueryData<Chat[]>([`chats`]);

  return cachedChats;
}
