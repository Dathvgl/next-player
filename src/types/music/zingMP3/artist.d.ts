import { ZingMP3PlaylistObject, ZingMP3PlaylistSection } from "./playlist";
import { ZingMP3SongObject, ZingMP3SongSection } from "./song";
import { ZingMP3VideoSection } from "./video";
import { ZingMP3Response, ZingMp3SectionBase } from "./zingMP3";

export type ZingMP3ArtistObject = {
  id: string;
  name: string;
  link: string;
  spotlight: boolean;
  alias: string;
  playlistId: string;
  thumbnail: string;
  thumbnailM: string;
  isOA: boolean;
  isOABrand: boolean;
};

export type ZingMP3ArtistObjectMore = ZingMP3ArtistObject & {
  totalFollow: number;
};

export type ZingMP3ArtistObjectLess = Omit<
  ZingMP3ArtistObject,
  "thumbnailM" | "isOA" | "isOABrand"
> & {
  cover: string;
};

export type ZingMP3ArtistSection = ZingMp3SectionBase<ZingMP3ArtistObjectMore>;

export type ZingMP3ArtistSections =
  | ZingMP3ArtistSection
  | ZingMP3SongSection
  | ZingMP3PlaylistSection
  | ZingMP3VideoSection;

export type ZingMP3ArtistHighObject = ZingMP3ArtistObject & {
  cover: string;
  biography: string;
  sortBiography: string;
  national: string;
  birthday: string;
  realname: string;
  totalFollow: number;
  follow: number;
  awards: string[];
  oalink: string;
  oaid: number;
  sections: ZingMP3ArtistSections[];
  sectionId: string;
  tabs: number[];
  hasOA: boolean;
};

export type ZingMP3ArtistResponse = ZingMP3Response<ZingMP3ArtistHighObject>;
