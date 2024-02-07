import { Metadata } from "next";
import ChatMessage from "./components/chat-message";
import MessageHandler from "./components/message-handler";
import MessageOffset from "./components/message-offset";

export const metadata: Metadata = {
  title: "Trò chuyện",
};

export default function Page() {
  return (
    <section className="flex divide-x h-[calc(100vh-var(--height-header-body))] max-md:flex-col">
      <MessageHandler />
      <MessageOffset />
      <ChatMessage />
    </section>
  );
}
