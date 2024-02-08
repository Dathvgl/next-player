"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteAdmin } from "~/configs/site";
import { cn } from "~/lib/utils";

export default function Navigate() {
  const pathname = usePathname();

  return (
    <section className="flex items-center">
      {[
        {
          name: "Quyền",
          href: `${siteAdmin.role}/permission`,
        },
        {
          name: "Hạn",
          href: `${siteAdmin.role}/term`,
        },
      ].map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
            pathname?.startsWith(item.href) || (index === 0 && pathname === "/")
              ? "bg-muted font-medium text-primary"
              : "text-muted-foreground"
          )}
        >
          {item.name}
        </Link>
      ))}
    </section>
  );
}
