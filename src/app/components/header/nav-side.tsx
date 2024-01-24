"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import LIcon from "~/components/lucide-icon";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { siteList } from "~/configs/site";
import useGridBreak from "~/hooks/use-grid-break";
import { MotionDiv, MotionLi } from "~/lib/motion";

export default function NavSide() {
  const ref = useRef(null);
  const [state, setState] = useState(false);

  const gridBreak = useGridBreak(["xs", "lg", "xl"]);
  useOnClickOutside(ref, handleClickOutside);

  function handleClickOutside() {
    if (!gridBreak || gridBreak == "sm") {
      setState(true);
    }
  }

  function handleCallback() {
    if (!gridBreak || gridBreak == "sm") {
      setState(false);
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0" side="left">
        <nav id="root-menu" className="select-none">
          <ul>
            {siteList.map((item, index) => (
              <MotionLi
                key={item.path}
                initial={{ opacity: 0 }}
                whileHover="hover"
                whileInView={{
                  opacity: 1,
                  transition: { delay: 0.2 + index * 0.1 },
                }}
              >
                <Link className="cursor-pointer" href={item.path}>
                  <MotionDiv
                    className="flex items-center gap-2 absolute"
                    variants={{
                      hover: {
                        x: "-50%",
                        left: "50%",
                      },
                    }}
                  >
                    <LIcon icon={item.icon} size={22} />
                    <span className="whitespace-nowrap">{item.name}</span>
                  </MotionDiv>
                </Link>
              </MotionLi>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
