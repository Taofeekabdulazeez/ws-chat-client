import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useSendMessage() {
  const [isSending] = useState(false);
  const queryClient = useQueryClient();
  const refreshMessages = () => {
    queryClient.invalidateQueries({ queryKey: ["chats"] });
  };

  return { refreshMessages, isSending };
}
