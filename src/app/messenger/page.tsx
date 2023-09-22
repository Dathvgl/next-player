import { Metadata } from "next";
import ChatMessenger from "./components/chat-messenger";
import ListMessenger from "./components/list-messenger";

export const metadata: Metadata = {
  title: "Chat online",
};

export default function Page() {
  return (
    <div className="flex divide-x h-[calc(100vh-65px)]">
      <ListMessenger />
      <ChatMessenger />
    </div>
  );
}
