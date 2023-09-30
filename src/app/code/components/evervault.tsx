"use client";

import { useEffect, useRef } from "react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

const chars = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`;

function randomChar() {
  return chars[Math.floor(Math.random() * (chars.length - 1))];
}

function randomString(length: number) {
  return Array.from(Array(length)).map(randomChar).join("");
}

export default function Evervault() {
  const containerRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);

  const generateRef = useRef<number>(5000);

  useEffect(() => {
    if (containerRef.current && characterRef.current) {
      containerRef.current.onmousemove = (event) => {
        handleOnMove(event);
      };

      containerRef.current.ontouchmove = (event) => {
        handleOnMove(event.touches[0]);
      };
    }
  }, []);

  function handleOnMove(event: MouseEvent | Touch) {
    if (!containerRef.current || !characterRef.current) return;

    const rect = containerRef.current.getBoundingClientRect(),
      x = event.clientX - rect.left,
      y = event.clientY - rect.top;

    characterRef.current.style.setProperty("--x", `${x}px`);
    characterRef.current.style.setProperty("--y", `${y}px`);

    characterRef.current.innerText = randomString(generateRef.current);
  }

  return (
    <div
      ref={containerRef}
      className="relative select-none w-full h-full group bg-black"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full overflow-hidden z-[3] w-2/5 h-2/5">
        <div>
          <Label className="text-white" htmlFor="generate">
            Generate:
          </Label>
          <Input
            id="generate"
            defaultValue={generateRef.current}
            onChange={(event) => {
              const num = Number.parseInt(event.target.value);
              if (!isNaN(num)) generateRef.current = num;
            }}
          />
        </div>
      </div>
      <div
        style={{
          background: `radial-gradient(circle at center, rgb(30 41 59) 40%,rgb(41 121 255) 50%,rgb(56 182 255),rgb(42 252 152))`,
          mixBlendMode: "darken",
        }}
        className="absolute w-full h-full top-0 left-0 z-[2]"
      />
      <div
        ref={characterRef}
        style={{
          WebkitMaskImage: `radial-gradient(250px circle at var(--x) var(--y),rgb(255 255 255) 20%,rgb(255 255 255 / 25%),transparent)`,
        }}
        className="absolute text-white break-words top-0 left-0 w-full h-full group-hover:opacity-100 opacity-0 transition-opacity duration-500 overflow-hidden"
      />
    </div>
  );
}
