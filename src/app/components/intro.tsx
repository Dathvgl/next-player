"use client";

import { useState } from "react";
import { useBreakPoint } from "~/components/break-point";
import { MotionDiv } from "~/lib/motion";
import { cn } from "~/lib/utils";

export default function Intro() {
  const [isOpen, setIsOpen] = useState(false);
  const { md, lg } = useBreakPoint(["md", "lg"]);

  return (
    <MotionDiv
      className="select-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center relative"
      initial="init"
      animate={isOpen ? "click" : "init"}
      exit="init"
      onClick={() => setIsOpen(!isOpen)}
      variants={{
        init: { width: "100px", height: "100px", borderRadius: 50 },
        click: {
          width: md ? "75%" : lg ? "50%" : "100%",
          height: "200px",
        },
      }}
    >
      <MotionDiv
        className="absolute top-[50%] -translate-y-[50%] left-[10%] w-[30%]"
        animate={isOpen ? "click" : "init"}
        variants={{
          init: {
            opacity: 0,
            transition: { delay: -1 },
          },
          click: {
            opacity: 1,
            transition: { delay: 0.2 },
          },
        }}
      >
        <p
          className={cn(
            "font-dancing-script font-bold text-black text-justify",
            lg ? "text-2xl" : ""
          )}
        >
          TA CÓ MỘT WEBSITE MÔ PHỎNG VÔ HẠN LẦN
        </p>
      </MotionDiv>
      <MotionDiv
        className="absolute top-[50%] -translate-y-[50%] right-[10%] w-[30%]"
        animate={isOpen ? "click" : "init"}
        variants={{
          init: {
            opacity: 0,
            transition: { delay: -1 },
          },
          click: {
            opacity: 1,
            transition: { delay: 0.2 },
          },
        }}
      >
        <p className="font-bold text-black text-md text-justify italic">
          {lg ? (
            <>
              &quot;Clone website? Xem những video build website hàng tiếng?
              Không ta sẽ xây trang web mô phỏng vô số website khác!&quot;
            </>
          ) : (
            <>
              &quot;Clone website? Trang web mô phỏng vô số website khác!&quot;
            </>
          )}
        </p>
      </MotionDiv>
      <div className="w-10 h-10 rounded-full bg-green-300" />
    </MotionDiv>
  );
}
