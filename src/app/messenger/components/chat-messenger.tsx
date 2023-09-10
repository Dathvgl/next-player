"use client";

import { AnimatePresence } from "framer-motion";
import { ScrollArea } from "~/components/ui/scroll-area";
import { MotionLi } from "~/lib/motion";

const data = [
  {
    uid: "",
    message: "hahaha",
    receive: true,
  },
  {
    uid: "",
    message: "heheheheh",
    receive: false,
  },
  {
    uid: "",
    message: "lalalalal",
    receive: false,
  },
];

export default function ChatMessenger() {
  return (
    <div className="flex-1 h-full flex flex-col [&>div>div>div]:h-full">
      <ScrollArea className="flex-1">
        <AnimatePresence initial={false}>
          <ul className="flex flex-col gap-4 p-4 justify-end h-full">
            {data.map((item, index) => (
              <MotionLi
                key={index}
                className={`flex w-full ${
                  item.receive ? "justify-start" : "justify-end"
                }`}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              >
                <div
                  className={`px-3 py-2 rounded text-white ${
                    item.receive ? "bg-[#3e4042]" : "bg-[#0084ff]"
                  }`}
                >
                  <div>{item.uid}</div>
                  <div>{item.message}</div>
                </div>
              </MotionLi>
            ))}
          </ul>
        </AnimatePresence>
      </ScrollArea>
      <section className="p-2 flex">
        <div>kaka</div>
        <input className="flex-1" type="text" />
      </section>
    </div>
  );
}
