import { ZingMP3SongObject } from "./song";
import { ZingMp3SectionBase } from "./zingMP3";

export type ZingMP3RTChartSection = ZingMp3SectionBase<ZingMP3SongObject> & {
  promotes: ZingMP3SongObject[];
  chart: {
    times: { hour: string }[];
    minScore: number;
    maxScore: number;
    items: {
      [key: string]: {
        time: number;
        hour: string;
        counter: number;
      }[];
    };
    totalScore: number;
  };
};
