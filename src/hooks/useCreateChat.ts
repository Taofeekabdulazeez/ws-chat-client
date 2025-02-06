import { Chat } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useCreateChat() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createChat } = useMutation({
    mutationFn: createChatApi,
    onSuccess: (data) => {
      queryClient
        .invalidateQueries({ queryKey: ["chats"] })
        .then(() => navigate(`/chat/${data.id}`));
    },
  });

  return { isCreating, createChat };
}

async function createChatApi(data: object) {
  const response = await axios.post(`http://localhost:8000/chats`, data);
  const { data: chat } = response.data;

  return chat as Chat;
}
