"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CustomIcons } from "~/components/custom-icons";
import LIcon from "~/components/lucide-icon";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { siteConfig, siteListAdmin } from "~/configs/site";
import { cn } from "~/lib/utils";

export default function SideLink() {
  const pathname = usePathname();
  const name = pathname.split("/")[2];

  return (
    <ScrollArea className="w-1/5 h-screen">
      <Link href="/" className="flex items-center space-x-2 h-16 border-b px-4">
        <LIcon icon={CustomIcons.logo} className="h-6 w-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
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
                {item.name}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
