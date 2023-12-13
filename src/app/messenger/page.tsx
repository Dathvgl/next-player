import { Metadata } from "next";
import ChatMessenger from "./components/chat-messenger";
import ListMessenger from "./components/list-messenger";

export const metadata: Metadata = {
  title: "Chat online",
};

export default function Page() {
  return (
    <section className="flex divide-x h-[calc(100vh-var(--height-header-body))] max-md:flex-col">
      <ListMessenger />
      <ChatMessenger />
    </section>
  );
}
