export type ChildReact = {
  children?: React.ReactNode;
};

export type TypeParam = Record<string, string | string[] | undefined>;

export type ParamReact = {
  params: Record<string, string>;
  searchParams: TypeParam;
};

export type WebLink =
  | "home"
  | "music"
  | "story"
  | "message"
  | "ecommerce"
  | "code";

export type WebLinkAdmin = "home" | "role" | "user" | "story" | "ecommerce";

export type WebStat = {
  date: string;
  total: number;
  stats: {
    home: number;
    music: number;
    story: number;
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

export type FetchQuery = {
  page: number;
  limit?: number;
};
