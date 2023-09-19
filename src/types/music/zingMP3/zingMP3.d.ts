import { ZingMP3ArtistObjectMore } from "./artist";
import { ZingMP3BannerSection } from "./banner";
import { ZingMP3PlaylistObject, ZingMP3PlaylistSectionLess } from "./playlist";
import { ZingMP3ReleaseSection } from "./release";
import { ZingMP3SongObject } from "./song";
import { ZingMP3VideoObject } from "./video";

export type ZingMP3SectionType =
  | "song"
  | "playlist"
  | "video"
  | "artist"
  | "banner"
  | "releases";

export type ZingMp3SectionBase<T> = {
  sectionType: ZingMP3SectionType;
  viewType: string;
  title: string;
  link: string;
  sectionId: string;
  items: T[];
};

export type ZingMP3Response<T> = {
  err: number;
  msg: string;
  data: T;
  timestamp: number;
};

export type ZingMP3Home = ZingMP3Response<{
  items: (
    | ZingMP3BannerSection
    | ZingMP3ReleaseSection
    | ZingMP3PlaylistSectionLess
  )[];
  hasMore: boolean;
  total: number;
}>;

export type ZingMP3Search = ZingMP3Response<{
  top?: ZingMP3SongObject;
  artists?: ZingMP3ArtistObjectMore[];
  songs?: ZingMP3SongObject[];
  videos?: ZingMP3VideoObject[];
  playlists?: ZingMP3PlaylistObject[];
  counter: {
    song: number;
    artist: number;
    playlist: number;
    video: number;
  };
  sectionId: string;
}>;
