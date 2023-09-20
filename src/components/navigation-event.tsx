"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { WebStat, WebLinkType } from "~/types/type";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initStat: WebStat = {
    date: new Date().toDateString(),
    total: 0,
    stats: {
      home: 0,
      music: 0,
      manga: 0,
      message: 0,
    },
  };

  const [stat, setStat] = useLocalStorage<WebStat>("web-stats", initStat);

  useEffect(() => {
    function handleStat(str: string) {
      if (str == "/") {
        handleStatWrite("home");
      } else if (str.includes("/truyen-tranh")) {
        handleStatWrite("manga");
      } else if (str.includes("/messenger")) {
        handleStatWrite("message");
      }
    }

    handleStat(pathname);
  }, [pathname, searchParams]);

  function handleStatWrite(key: WebLinkType) {
    const today = stat.date == new Date().toDateString();

    if (today) {
      setStat({
        date: initStat.date,
        total: stat.total + 1,
        stats: { ...stat.stats, [key]: stat.stats[key] + 1 },
      });
    } else {
      setStat({
        date: initStat.date,
        total: 1,
        stats: { ...initStat.stats, [key]: 1 },
      });
    }
  }

  return null;
}
