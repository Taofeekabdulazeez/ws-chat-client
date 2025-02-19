import { motion } from "framer-motion";
import {
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
  ChatBubble,
  ChatBubbleAction,
  ChatBubbleActionWrapper,
} from "../ui/chat/chat-bubble";
import { formatMessageTime } from "@/lib/utils";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { CheckCheck, Forward, Heart } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useSelectedChat } from "@/hooks/useSelectedChat";
import { Message } from "@/types";
import clsx from "clsx";

type ChatMessageProps = {
  index: number;
  message: Message;
};

const getMessageVariant = (messageName: string, selectedUserName: string) =>
  messageName !== selectedUserName ? "sent" : "received";

const actionIcons = [
  { icon: DotsVerticalIcon, type: "More" },
  { icon: Forward, type: "Like" },
  { icon: Heart, type: "Share" },
];

export default function ChatMessage({ index, message }: ChatMessageProps) {
  const authUser = useAuthStore((state) => state.authUser);
  const selectedChat = useSelectedChat();
  const messageOwner =
    message.senderId === selectedChat.recipient.id
      ? selectedChat.recipient
      : authUser;
  const variant = getMessageVariant(
    message.senderId === selectedChat.recipient.id
      ? selectedChat.recipient.fullName
      : authUser!.fullName,
    selectedChat.recipient.fullName
  );

  return (
    <motion.div
      key={index}
      layout
      initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
      transition={{
        opacity: { duration: 0.1 },
        layout: {
          type: "spring",
          bounce: 0.3,
          duration: index * 0.05 + 0.2,
        },
      }}
      style={{ originX: 0.5, originY: 0.5 }}
      className="flex flex-col gap-2 p-4"
    >
      {/* Usage of ChatBubble component */}
      <ChatBubble variant={variant}>
        <ChatBubbleAvatar src={messageOwner?.avatar} />
        <ChatBubbleMessage isLoading={false}>
          {message.text}
          <span className="flex items-center gap-2">
            {message.timestamp && (
              <ChatBubbleTimestamp
                className="mt-2"
                timestamp={formatMessageTime(new Date(message.timestamp))}
              />
            )}
            {authUser?.id === message.senderId && (
              <CheckCheck
                className={clsx("mt-2", { "stroke-blue-400": message.isRead })}
                size={18}
              />
            )}
          </span>
        </ChatBubbleMessage>
        <ChatBubbleActionWrapper>
          {actionIcons.map(({ icon: Icon, type }) => (
            <ChatBubbleAction
              className="size-7"
              key={type}
              icon={<Icon className="size-4" />}
              onClick={() =>
                console.log("Action " + type + " clicked for message " + index)
              }
            />
          ))}
        </ChatBubbleActionWrapper>
      </ChatBubble>
    </motion.div>
  );
}
