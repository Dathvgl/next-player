"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { usePathname } from "next/navigation";
import SiteHeader from "~/app/components/header/site-header";
import { siteAdmin } from "~/configs/site";
import { ChildReact } from "~/types/type";

export default function LayoutHandler({ children }: ChildReact) {
  const pathname = usePathname();

  if (pathname.includes(siteAdmin.home)) {
    return <main>{children}</main>;
  }

  return (
    <main className="[&>div>div>div]:!block">
      <ScrollArea className="relative h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
      </ScrollArea>
    </main>
  );
}
