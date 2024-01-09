import Link from "next/link";
import tinycolor from "tinycolor2";
import { siteList } from "~/configs/site";
import { capitalize, strToHex } from "~/lib/convert";
import { MotionDiv, MotionLi, MotionSpan } from "~/lib/motion";

export default function ListSimulation() {
  return (
    <div className="flex-1 max-md:w-full">
      <ul className="border divide-y rounded overflow-hidden grid grid-cols-2">
        {siteList.map((item) => {
          const fill = strToHex(item.alt);

          return (
            <Link key={item.name} href={item.path}>
              <MotionLi
                className="font-bold px-2 py-1 cursor-pointer relative [--text-theme: black] dark:[--text-theme: white]"
                initial="init"
                whileHover="hover"
                variants={{
                  init: { color: "var(--text-theme)" },
                  hover: {
                    color: tinycolor(fill).isDark() ? "white" : "black",
                  },
                }}
              >
                <MotionSpan
                  className="z-10 relative"
                  variants={{ hover: { marginLeft: 15 } }}
                >
                  {capitalize(item.alt)}
                </MotionSpan>
                <MotionDiv
                  className="absolute z-10 top-1/2 -translate-y-1/2"
                  variants={{
                    init: {
                      opacity: 0,
                      transition: {
                        ease: "easeOut",
                        duration: 0.2,
                        type: "tween",
                      },
                    },
                    hover: {
                      opacity: 1,
                      transition: {
                        duration: 0.4,
                        type: "tween",
                        ease: "easeIn",
                      },
                    },
                  }}
                >
                  /
                </MotionDiv>
                <MotionDiv
                  style={{ backgroundColor: fill }}
                  className="h-full absolute top-0 left-0 bg-gradient-to-r from-transparent to-white dark:to-black"
                  variants={{ hover: { width: "100%" } }}
                />
              </MotionLi>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
