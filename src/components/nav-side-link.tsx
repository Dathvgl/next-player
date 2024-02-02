"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LIcon from "~/components/lucide-icon";
import { siteList, siteListAdmin } from "~/configs/site";
import { MotionDiv, MotionLi } from "~/lib/motion";
import { cn } from "~/lib/utils";

type NavSideLinkProps = {
  admin?: boolean;
};

export default function NavSideLink({ admin }: NavSideLinkProps) {
  const pathname = usePathname();
  const name = pathname.split("/")[admin ? 2 : 1] ?? "";
  const links = admin ? siteListAdmin : siteList;

  return (
    <ul>
      {links.map((item, index) => (
        <MotionLi
          key={item.path}
          initial={{ opacity: 0 }}
          whileHover="hover"
          whileInView={{
            opacity: 1,
            transition: { delay: 0.2 + index * 0.1 },
          }}
        >
          <Link
            className={cn(
              "w-full justify-normal",
              name.length == 0 && index == 0
                ? "bg-accent text-accent-foreground"
                : "",
              name.length != 0 && item.path.includes(name)
                ? "bg-accent text-accent-foreground"
                : ""
            )}
            href={item.path}
          >
            <MotionDiv
              className="flex items-center gap-2 absolute w-[280px]"
              variants={{ hover: { x: "10px" } }}
            >
              <LIcon icon={item.icon} size={18} />
              <span className="whitespace-nowrap">{item.name}</span>
            </MotionDiv>
          </Link>
        </MotionLi>
      ))}
    </ul>
  );
}
