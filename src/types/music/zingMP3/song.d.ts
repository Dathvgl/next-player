import { ZingMP3AlbumOjbect } from "./album";
import { ZingMP3ArtistObject } from "./artist";
import {
  ZingMP3Response,
  ZingMP3SectionType,
  ZingMp3SectionBase,
} from "./zingMP3";

export type ZingMP3SongObject = {
  encodeId: string;
  title: string;
  alias: string;
  isOffical: boolean;
  username: string;
  artistsNames: string;
  artists: ZingMP3ArtistObject[];
  isWorldWide: boolean;
  thumbnailM: string;
  link: string;
  thumbnail: string;
  duration: number;
  zingChoice: boolean;
  isPrivate: boolean;
  preRelease: boolean;
  releaseDate: number;
  genreIds: string[];
  album: ZingMP3AlbumOjbect;
  distributor: string;
  indicators: [];
  radioId: number;
  isIndie: boolean;
  mvlink: string;
  streamingStatus: number;
  allowAudioAds: boolean;
  hasLyric: boolean;
  score: number;
};

export type ZingMP3SongSection = ZingMp3SectionBase<ZingMP3SongObject> & {
  options: { artistId: string };
};

export type ZingMP3SongResponse = ZingMP3Response<ZingMP3SongObject>;

export type ZingMP3SongDetailResponse = ZingMP3Response<{
  128: string;
  320: string;
}>;
