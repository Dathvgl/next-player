import { strToHex } from "~/lib/convert";
import { Button } from "./ui/button";
import Link from "next/link";
import tinycolor from "tinycolor2";

export default function Chip({ href, text }: { href?: string; text: string }) {
  const color = strToHex(text);

  const child = (
    <div className="relative group rounded-3xl overflow-hidden select-none cursor-pointer">
      <div className="absolute w-full h-full hidden group-hover:block group-hover:bg-black group-hover:bg-opacity-30" />
      <div
        style={{
          color: tinycolor(color).isDark() ? "white" : "black",
          backgroundColor: color,
        }}
        className="text-sm h-auto px-3 py-1 font-medium"
      >
        {text}
      </div>
    </div>
  );

  if (!href) return child;
  else return <Link href={href}>{child}</Link>;
}
