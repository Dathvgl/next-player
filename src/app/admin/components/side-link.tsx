"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LIcon from "~/components/lucide-icon";
import { Button } from "~/components/ui/button";
import { siteListAdmin } from "~/configs/site";
import { cn } from "~/lib/utils";

export default function SideLink() {
  const pathname = usePathname();
  const name = pathname.split("/")[2];

  return (
    <ul className="p-4 flex flex-col gap-2">
      {siteListAdmin.map((item, index) => (
        <li key={item.name}>
          <Button
            className={cn(
              "w-full justify-normal",
              (name == undefined && index == 0) || item.path.includes(name)
                ? "bg-accent text-accent-foreground"
                : ""
            )}
            asChild
            variant="ghost"
          >
            <Link className="block" href={item.path}>
              <LIcon icon={item.icon} className="mr-2 h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
