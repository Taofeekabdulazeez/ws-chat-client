import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader, SquarePen } from "lucide-react";
import { SearchUser } from "../search-user";
import { ChatUserAvatar } from "./chat-user-avatar";
import { searchUsers } from "@/services/users.";
import { useState } from "react";
import { useCreateChat } from "@/hooks/useCreateChat";
import { useAuthStore } from "@/store/useAuthStore";

type User = {
  id: string;
  fullName: string;
  email: string;
  avatar: string;
};

export function NewChatDialog() {
  const [open, setOpen] = useState(false);
  const closeDialog = () => setOpen(false);
  const authUser = useAuthStore((state) => state.authUser);
  const [selectedUser, setSelectedUser] = useState("");
  const { isCreating, createChat } = useCreateChat();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <SquarePen size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-3 md:min-w-[500px]">
        <SearchUser<User>
          fetcher={searchUsers}
          preload
          filterFn={(user, query) =>
            user.fullName.toLowerCase().includes(query.toLowerCase())
          }
          renderOption={(user) => (
            <div className="flex items-center gap-4 cursor-pointer p-1">
              <ChatUserAvatar avatar={user.avatar} />
              <div className="flex flex-col">
                <div className="font-medium">{user.fullName}</div>
                <div className="text-xs text-muted-foreground">
                  {user.email}
                </div>
              </div>
            </div>
          )}
          getOptionValue={(user) => user.id}
          getDisplayValue={(user) => (
            <div className="flex items-center gap-2 text-left">
              <ChatUserAvatar avatar={user.avatar} />
              <div className="flex flex-col leading-tight">
                <div className="font-medium">{user.fullName}</div>
                <div className="text-xxs text-muted-foreground">
                  {user.email}
                </div>
              </div>
            </div>
          )}
          notFound={
            <div className="py-6 text-center text-sm">No users found</div>
          }
          label="User"
          placeholder="Search users..."
          value={selectedUser}
          onChange={setSelectedUser}
        />
        <DialogFooter>
          {selectedUser && (
            <Button
              disabled={isCreating}
              onClick={() =>
                createChat(
                  { users: [authUser?.id, selectedUser] },
                  { onSuccess: closeDialog }
                )
              }
              className="flex items-center justify-center w-full"
            >
              {isCreating ? <Loader className="animate-spin" /> : "Chat"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
