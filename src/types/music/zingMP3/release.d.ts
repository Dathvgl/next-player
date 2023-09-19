import { ZingMP3ArtistObject } from "./artist";
import { ZingMp3SectionBase } from "./zingMP3";

export type ZingMP3ReleaseDetail = {
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
  distributor: string;
  indicators: [];
  isIndie: boolean;
  streamingStatus: number;
  streamPrivileges: number[];
  downloadPrivileges: number[];
  allowAudioAds: boolean;
};

export type ZingMP3ReleaseObject = {
  all: ZingMP3ReleaseDetail[];
  vPop: ZingMP3ReleaseDetail[];
  others: ZingMP3ReleaseDetail[];
};

export type ZingMP3ReleaseSection = Omit<ZingMp3SectionBase, "items"> & {
  items: ZingMP3ReleaseObject;
};
