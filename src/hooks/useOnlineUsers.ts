import { socket } from "@/socket";
import { useEffect, useState } from "react";

export function useOnlineUsers() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    socket.emit("get-online-users");
  }, []);

  useEffect(() => {
    socket.on("online-users", (data) => {
      console.log(data);
      setOnlineUsers(data);
    });

    return () => {
      socket.off("online-users");
    };
  }, []);

  return { onlineUsers };
}
