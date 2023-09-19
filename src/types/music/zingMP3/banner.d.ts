import { ZingMp3SectionBase } from "./zingMP3";

export type ZingMP3BannerObject = {
  type: number;
  link: string;
  banner: string;
  cover: string;
  target: string;
  title: string;
  description: string;
  ispr: number;
  encodeId: string;
};

export type ZingMP3BannerSection = ZingMp3SectionBase<ZingMP3BannerObject>;
