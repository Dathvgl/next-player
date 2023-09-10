export interface ChildReact {
  children: React.ReactNode;
}

export interface FetchList<T> {
  totalData: number;
  totalPage: number;
  currentPage: number;
  canPrev: boolean;
  canNext: boolean;
  data: T[];
}
