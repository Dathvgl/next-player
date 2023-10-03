"use client";

import { createContext, useContext, useState } from "react";
import { externalApi } from "~/lib/api";
import handleFetch from "~/lib/fetch";
import { ChildReact } from "~/types/type";

export interface MangaFollowContextProps {
  followed: number;
  altFollow: () => Promise<void>;
}

const MangaFollowContext = createContext<MangaFollowContextProps | null>(null);

export const MangaFollowContextProvider = ({
  id,
  type,
  followed,
  children,
}: ChildReact & { id: string; type: string; followed: number }) => {
  const [follow, setFollow] = useState(followed);

  const altFollow = async () => {
    const data = await handleFetch<{ watched: number } | null>(
      `${externalApi.manga}/detailFollow/${id}?type=${type}`,
      { cache: "no-store", next: { revalidate: 0 } }
    );

    if (data) setFollow(data.watched);
  };

  return (
    <MangaFollowContext.Provider value={{ followed: follow, altFollow }}>
      {children}
    </MangaFollowContext.Provider>
  );
};

export const useMangaFollow = () => {
  return useContext(MangaFollowContext);
};
