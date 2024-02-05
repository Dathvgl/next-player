"use server";

import { linkApi } from "~/lib/api";
import handleFetch from "~/lib/fetch";
import {
  ZingMP3SongDetailResponse,
  ZingMP3SongResponse,
} from "~/types/music/zingMP3/song";
import { ZingMP3Home, ZingMP3Search } from "~/types/music/zingMP3/zingMP3";

export async function getZingMP3Home() {
  return await handleFetch<ZingMP3Home>({
    url: `${linkApi.musicZingMP3}/home`,
  });
}

export async function getZingMP3Search(name: string) {
  return await handleFetch<ZingMP3Search>({
    url: `${linkApi.musicZingMP3}/search/${name}`,
  });
}

export async function getZingMP3Detail(id: string) {
  return await handleFetch<ZingMP3SongResponse>({
    url: `${linkApi.musicZingMP3}/infoSong/${id}`,
  });
}

export async function getZingMP3Song(id: string) {
  return await handleFetch<ZingMP3SongDetailResponse>({
    url: `${linkApi.musicZingMP3}/song/${id}`,
  });
}
