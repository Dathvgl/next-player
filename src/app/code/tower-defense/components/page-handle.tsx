"use client";

import { useEffect } from "react";
import { init } from "./main";

export default function PageHandle() {
  useEffect(() => {
    init();
  }, []);

  return null;
}
