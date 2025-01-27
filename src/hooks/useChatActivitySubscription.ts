import { useAuthStore } from "@/store/useAuthStore";
import { Chat } from "@/types";
import { useRef, useEffect } from "react";

export function useChatActivitySubscription(chat: Chat) {
  const socket = useAuthStore((state) => state.socket);
  const typingIndicatorRef = useRef<HTMLSpanElement>(null!);
  const lastMessageRef = useRef<HTMLSpanElement>(null!);
  useEffect(() => {
    let activityTimer: NodeJS.Timeout;
    // if (selectedUser?.id !== chat.userId) return;
    socket.on("user-activity", (userId) => {
      console.log("user typing", userId);
      if (!typingIndicatorRef.current) return;
      if (userId !== chat?.recipient.id) return;
      typingIndicatorRef.current.textContent = "Typing...";
      lastMessageRef.current.style.display = "none";

      clearTimeout(activityTimer);
      activityTimer = setTimeout(() => {
        typingIndicatorRef.current.textContent = "";
        lastMessageRef.current.style.display = "block";
      }, 2000);
    });

    return () => {
      socket.off("user-activity");
    };
  });

  return { typingIndicatorRef, lastMessageRef };
}
