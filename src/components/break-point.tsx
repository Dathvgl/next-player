"use client";

import { useEffect, useState } from "react";
import { ChildReact } from "~/types/type";

type PointType = {
  xl: boolean; // 1280
  lg: boolean; // 1024
  md: boolean; // 768
  sm: boolean; // 640
  xs: boolean;
};

type PointInit = (keyof PointType)[] | number;

export function BreakPoint({
  base,
  reverse,
  children,
}: ChildReact & { base: PointInit; reverse?: boolean }) {
  const breakPoint = useBreakPoint(base);

  if (typeof breakPoint == "boolean") {
    if (!breakPoint) {
      if (!reverse) return null;
      else return children;
    } else {
      if (reverse) return null;
      else return children;
    }
  }

  for (const [key, value] of Object.entries(breakPoint)) {
    const array = base as (keyof PointType)[];
    if (!array.includes(key as keyof PointType)) continue;

    if (value) {
      if (reverse) return null;
      else return children;
    }
  }

  if (!reverse) return null;
  else return children;
}

export function useBreakPoint<T extends PointInit>(
  base: T
): T extends number ? boolean : PointType {
  const [point, setPoint] = useState<PointType | boolean>(
    typeof base == "number"
      ? false
      : {
          xl: false,
          lg: false,
          md: false,
          sm: false,
          xs: false,
        }
  );

  useEffect(() => {
    function handleResize() {
      const main = window.innerWidth;

      if (typeof base == "number" && typeof point == "boolean") {
        if (main >= base) {
        }
        return;
      }

      if (typeof base != "number" && typeof point != "boolean") {
        if (base.includes("xl")) {
          if (main >= 1280) {
            setPoint({ ...point, xl: true });
          } else setPoint({ ...point, xl: false });
        }

        if (base.includes("lg")) {
          if (main >= 1024) {
            setPoint({ ...point, lg: true });
          } else setPoint({ ...point, lg: false });
        }

        if (base.includes("md")) {
          if (main >= 768) {
            setPoint({ ...point, md: true });
          } else setPoint({ ...point, md: false });
        }

        if (base.includes("sm")) {
          if (main >= 640) {
            setPoint({ ...point, sm: true });
          } else setPoint({ ...point, sm: false });
        }

        if (base.includes("xs")) {
          if (main >= 480) {
            setPoint({ ...point, xs: true });
          } else setPoint({ ...point, xs: false });
        }
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return point as T extends number ? boolean : PointType;
}
