"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { linkApi } from "~/lib/api";
import handleFetch from "~/lib/fetch";
import { ChildReact } from "~/types/type";
import { useAuth } from "./auth-context";
import { toast } from "sonner";

interface StateFollow {
  _id: string;
  currentChapterId: string;
  lastestChapterId: string;
  createdAt: number;
}

export interface MangaFollowStateContextProps {
  stateFollow?: StateFollow;
  getFollow: () => Promise<void>;
  postFollow: (chapter?: string) => Promise<void>;
  putFollow: (chapter: string, list: string[]) => Promise<void>;
  deleteFollow: () => Promise<void>;
}

const MangaFollowStateContext =
  createContext<MangaFollowStateContextProps | null>(null);

export const MangaFollowStateContextProvider = ({
  id,
  type,
  children,
}: ChildReact & { id: string; type: string }) => {
  const authContext = useAuth();
  const [stateFollow, setStateFollow] = useState<StateFollow>();

  const getFollow = async () => {
    if (!authContext?.user?.uid) {
      setStateFollow(undefined);
      return;
    }

    const token = await authContext.idToken();

    const data = await handleFetch<StateFollow | null>({
      url: `${linkApi.user}/followManga/${id}?type=${type}`,
      init: { headers: { Authorization: `Bearer ${token}` } },
    });

    if (data) setStateFollow(data);
    else setStateFollow(undefined);
  };

  const postFollow = async (chapter?: string) => {
    if (!authContext?.user?.uid) {
      toast("Theo dõi truyện", {
        description: "Cần đăng nhập để theo dõi",
      });

      return;
    }

    const token = await authContext.idToken();

    await handleFetch({
      url: `${linkApi.user}/followManga/${id}?type=${type}&chapter=${
        chapter ?? "empty"
      }`,
      init: {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      },
    });

    await getFollow();
  };

  const putFollow = async (chapter: string, list: string[]) => {
    if (!authContext?.user?.uid || !stateFollow) return;
    const token = await authContext.idToken();

    await handleFetch({
      url: `${linkApi.user}/followManga/${id}`,
      init: {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          replace: list.includes(stateFollow.lastestChapterId)
            ? stateFollow.lastestChapterId == chapter
            : true,
          currentChapter: chapter,
        }),
      },
    });
  };

  const deleteFollow = async () => {
    if (!authContext?.user?.uid) return;
    const token = await authContext.idToken();

    await handleFetch({
      url: `${linkApi.user}/followManga/${id}?type=${type}`,
      init: {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      },
    });

    setStateFollow(undefined);
  };

  useEffect(() => {
    getFollow();
  }, [authContext?.user?.uid, id, type]);

  return (
    <MangaFollowStateContext.Provider
      value={{ stateFollow, getFollow, putFollow, postFollow, deleteFollow }}
    >
      {children}
    </MangaFollowStateContext.Provider>
  );
};

export const useMangaFollowState = () => {
  return useContext(MangaFollowStateContext);
};
