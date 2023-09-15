export interface ChildReact {
  children: React.ReactNode;
}

export type WebLinkType = "home" | "music" | "manga" | "message";

export interface WebStat {
  date: string;
  total: number;
  stats: {
    home: number;
    music: number;
    manga: number;
    message: number;
  };
}

export interface RechartsToolTip {
  active: boolean;
  label: number;
  payload: {
    dataKey: string;
    name: string;
    value: number;
    payload: {
      fill: string;
      name: string;
      value: number;
    };
  }[];
}

export interface FetchList<T> {
  totalData: number;
  totalPage: number;
  currentPage: number;
  canPrev: boolean;
  canNext: boolean;
  data: T[];
}
