import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home-page";
import ChatPage from "./pages/chat-page";
import ChatLayout from "./components/chat/chat-layout";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path: "/chat",
    element: <ChatLayout />,
    children: [{ path: ":chatId", element: <ChatPage /> }],
  },
]);
