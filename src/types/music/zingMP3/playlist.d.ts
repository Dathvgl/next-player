import { ZingMP3ArtistObjectMore } from "./artist";

export type ZingMP3PlaylistObject = {
  encodeId: string;
  title: string;
  thumbnail: string;
  isoffical: boolean;
  link: string;
  isIndie: boolean;
  releaseDate: string;
  sortDescription: string;
  releasedAt: number;
  genreIds: string[];
  PR: boolean;
  artists: ZingMP3ArtistObjectMore[];
  artistsNames: string;
  playItemMode: number;
  subType: number;
  uid: number;
  thumbnailM: string;
  isShuffle: boolean;
  isPrivate: boolean;
  userName: string;
  isAlbum: boolean;
  textType: string;
  isSingle: boolean;
  releaseDateText: string;
};

export type ZingMP3PlaylistObjectLess = {
  encodeId: string;
  thumbnail: string;
  thumbnailM: string;
  link: string;
  title: string;
  sortDescription: string;
  artists: ZingMP3ArtistObjectMore[];
  artistsNames: string;
};

export type ZingMP3PlaylistSection =
  ZingMp3SectionBase<ZingMP3PlaylistObject> & {
    itemType: string;
  };

export type ZingMP3PlaylistSectionLess =
  ZingMp3SectionBase<ZingMP3PlaylistObjectLess> & {
    itemType: string;
    options: { hideTitle: boolean };
  };
