"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { siteAdmin } from "~/configs/site";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`${siteAdmin.role}/permission`);
  }, []);

  return null;
}
