"use client";

import { useParams, usePathname } from "next/navigation";
import { site } from "~/configs/site";
import { ChildReact } from "~/types/type";

export default function Layout({ children }: ChildReact) {
  const params = useParams();
  const pathname = usePathname();
  const route = `${site.story}/${params?.type}`;

  if (pathname != route) {
    return <div className="flex-1">{children}</div>;
  }

  return <div id="root-container">{children}</div>;
}
