export type ChildReact = {
  children: React.ReactNode;
};

export type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";

export type WebLinkType =
  | "home"
  | "music"
  | "manga"
  | "message"
  | "ecommerce"
  | "code";

export type WebStat = {
  date: string;
  total: number;
  stats: {
    home: number;
    music: number;
    manga: number;
    message: number;
    ecommerce: number;
    code: number;
  };
};

export type RechartsToolTip<T> = {
  active: boolean;
  label: number;
  payload: {
    dataKey: string;
    name: string;
    value: number;
    fill?: string;
    payload: T;
  }[];
};

export type FetchList<T> = {
  totalData: number;
  totalPage: number;
  currentPage: number;
  canPrev: boolean;
  canNext: boolean;
  data: T[];
};
