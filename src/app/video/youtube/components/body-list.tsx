"use client";

import { useEffect } from "react";
import { youtubeSearch } from "./fetch";

export default function BodyList() {
  useEffect(() => {
    async function init() {
      const data = await youtubeSearch();
      console.log(data);
    }

    init();
  }, []);

  return <div>body-list</div>;
}
