"use client";

import { useState, useEffect } from "react";

export default function useGridBreak(
  except: ("xs" | "sm" | "md" | "lg" | "xl")[] = []
) {
  const [gridBreak, setGridBreak] = useState<
    "xs" | "sm" | "md" | "lg" | "xl"
  >();

  useEffect(() => {
    function handleResize() {
      const main = window.innerWidth;

      if (main >= 1280 && !except.includes("xl")) {
        setGridBreak("xl");
      } else if (main >= 1024 && !except.includes("lg")) {
        setGridBreak("lg");
      } else if (main >= 768 && !except.includes("md")) {
        setGridBreak("md");
      } else if (main >= 640 && !except.includes("sm")) {
        setGridBreak("sm");
      } else if (!except.includes("xs")) {
        setGridBreak("xs");
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [except]);

  return gridBreak;
}
