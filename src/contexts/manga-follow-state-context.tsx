"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "~/components/ui/use-toast";
import { externalApi } from "~/lib/api";
import handleFetch from "~/lib/fetch";
import { ChildReact } from "~/types/type";
import { useAuth } from "./auth-context";

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
  putFollow: (chapter: string) => Promise<void>;
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
    if (!authContext?.user?.uid) return;
    const token = await authContext.idToken();

    const data = await handleFetch<StateFollow | null>(
      `${externalApi.user}/followManga/${id}?type=${type}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (data) setStateFollow(data);
    else setStateFollow(undefined);
  };

  const postFollow = async (chapter?: string) => {
    if (!authContext?.user?.uid) {
      toast({
        title: "Theo dõi truyện",
        description: "Cần đăng nhập để theo dõi",
      });

      return;
    }

    const token = await authContext.idToken();

    await handleFetch(
      `${externalApi.user}/followManga/${id}?type=${type}&chapter=${
        chapter ?? "empty"
      }`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      },
      true
    );

    await getFollow();
  };

  const putFollow = async (chapter: string) => {
    if (!authContext?.user?.uid) return;
    const token = await authContext.idToken();

    await handleFetch(
      `${externalApi.user}/followManga/${id}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          type,
          replace: stateFollow?.lastestChapterId == chapter,
          currentChapter: chapter,
        }),
      },
      true
    );
  };

  const deleteFollow = async () => {
    if (!authContext?.user?.uid) return;
    const token = await authContext.idToken();

    await handleFetch(
      `${externalApi.user}/followManga/${id}?type=${type}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      },
      true
    );

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
