"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { site } from "~/configs/site";
import { WebLink, WebStat } from "~/types/type";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initStat: WebStat = {
    date: new Date().toDateString(),
    total: 0,
    stats: Object.keys(site).reduce(
      (prev, curr) => ({ ...prev, [curr]: 0 }),
      {}
    ) as Record<WebLink, number>,
  };

  const [stat, setStat] = useLocalStorage<WebStat>("web-stats", initStat);

  useEffect(() => {
    function handleStat(str: string) {
      if (str == "/") {
        handleStatWrite("home");
      } else if (str.includes(site.story)) {
        handleStatWrite("story");
      } else if (str.includes(site.message)) {
        handleStatWrite("message");
      } else if (str.includes(site.music)) {
        handleStatWrite("music");
      } else if (str.includes(site.ecommerce)) {
        handleStatWrite("ecommerce");
      } else if (str.includes(site.code)) {
        handleStatWrite("code");
      }
    }

    handleStat(pathname);
  }, [pathname, searchParams]);

  function handleStatWrite(key: WebLink) {
    const today = stat.date == new Date().toDateString();

    setStat({
      date: initStat.date,
      total: today ? stat.total + 1 : 1,
      stats: today
        ? { ...stat.stats, [key]: stat.stats[key] + 1 }
        : { ...initStat.stats, [key]: 1 },
    });
  }

  return null;
}
