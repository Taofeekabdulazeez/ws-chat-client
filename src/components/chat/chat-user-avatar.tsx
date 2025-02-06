import { Avatar, AvatarImage } from "@/components/ui/avatar";

type ChatUserAvatarProps = {
  avatar: string;
};

export function ChatUserAvatar({ avatar }: ChatUserAvatarProps) {
  return (
    <Avatar className="flex justify-center items-center">
      <AvatarImage
        src={"/profile.png"}
        alt={avatar || ""}
        width={6}
        height={6}
        className="w-10 h-10 "
      />
    </Avatar>
  );
}
