import { ZingMP3ArtistObject } from "./artist";

export type ZingMP3AlbumOjbect = {
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
  artists: ZingMP3ArtistObject[];
  artistsNames: string;
};
