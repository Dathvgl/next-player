"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { CustomIcons } from "~/components/custom-icons";
import CustomInput from "~/components/custom-input";
import LIcon from "~/components/lucide-icon";
import { dropLinks, siteConfig } from "~/config/site";
import useGridBreak from "~/hooks/grid-break";
import { MotionDiv, MotionLi } from "~/lib/motion";

export default function NavSide() {
  const ref = useRef(null);
  const [state, setState] = useState(false);

  const gridBreak = useGridBreak(["xs", "lg", "xl"]);
  useOnClickOutside(ref, handleClickOutside);

  function handleClickOutside() {
    if (gridBreak == "sm") {
      setState(true);
    }
  }

  function handleCallback() {
    if (gridBreak == "sm") {
      setState(false);
    }
  }

  return (
    <>
      <div
        id="root-menu-click-outside"
        className="md:hidden absolute w-screen h-screen bg-black/50 z-[15]"
      />
      <aside id="root-menu-outside" ref={ref}>
        <div className="h-16 flex items-center px-4 py-2 gap-4">
          <CustomInput
            type="radio"
            name="root-menu-header"
            value="close"
            state={state}
            callback={handleCallback}
          >
            <LIcon className="w-5 h-5" icon={X} button />
          </CustomInput>
          <Link href="/" className="flex items-center space-x-2">
            <LIcon icon={CustomIcons.logo} className="h-6 w-6" />
            <span className="inline-block font-bold">{siteConfig.name}</span>
          </Link>
        </div>
        <nav className="select-none">
          <ul>
            {dropLinks.map((item, index) => (
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
                    <LIcon icon={item.icon} size={25} />
                    <span className="whitespace-nowrap">{item.name}</span>
                  </MotionDiv>
                </Link>
              </MotionLi>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
