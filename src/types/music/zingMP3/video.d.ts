import { ZingMP3ArtistObject, ZingMP3ArtistObjectLess } from "./artist";
import { ZingMp3SectionBase } from "./zingMP3";

export type ZingMP3VideoObject = {
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
  streamingStatus: number;
  artist: ZingMP3ArtistObjectLess;
};

export type ZingMP3VideoSection = ZingMp3SectionBase<ZingMP3VideoObject>;
