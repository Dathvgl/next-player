import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MangaOrder, MangaSort } from "~/types/manga";

const orders: MangaOrder[] = ["asc", "desc"];
const sorts: MangaSort[] = ["lastest", "chapter", "name"];

type FilterInit = {
  keyword: string | null;
  order: string | null;
  sort: string | null;
  includes: string[];
  excludes: string[];
};

type FilterState = {
  keyword: string;
  order: MangaOrder;
  sort: MangaSort;
  includes: string[];
  excludes: string[];
};

type MangaState = {
  zoom: number;
  filter: FilterState;
};

const initialState: MangaState = {
  zoom: 50,
  filter: {
    keyword: "",
    order: "desc",
    sort: "lastest",
    includes: [],
    excludes: [],
  },
};

export const mangaSlice = createSlice({
  name: "manga",
  initialState,
  reducers: {
    mangaZoom(state, action: PayloadAction<"plus" | "minus" | number>) {
      if (typeof action.payload == "number") {
        state.zoom == action.payload;
      }

      if (typeof action.payload == "string") {
        if (action.payload == "plus") {
          if (state.zoom + 5 <= 100) {
            state.zoom += 5;
          }
        } else {
          if (state.zoom - 5 > 0) {
            state.zoom -= 5;
          }
        }
      }
    },
    mangaFilterInit(state, action: PayloadAction<FilterInit>) {
      const { keyword, order, sort, includes, excludes } = action.payload;

      if (keyword) {
        state.filter.keyword = keyword;
      } else state.filter.keyword = "";

      if (order) {
        if (orders.includes(order as MangaOrder)) {
          state.filter.order = order as MangaOrder;
        }
      } else state.filter.order = "desc";

      if (sort) {
        if (sorts.includes(sort as MangaSort)) {
          state.filter.sort = sort as MangaSort;
        }
      } else state.filter.sort = "lastest";

      state.filter.includes = includes;
      state.filter.excludes = excludes;
    },
    mangaFilterKeyword(state, action: PayloadAction<string>) {
      state.filter.keyword = action.payload;
    },
    mangaFilterSort(state, action: PayloadAction<MangaSort>) {
      state.filter.sort = action.payload;
    },
    mangaFilterOrder(state, action: PayloadAction<MangaOrder>) {
      state.filter.order = action.payload;
    },
    mangaFilterInclude(state, action: PayloadAction<string>) {
      state.filter.includes = [...state.filter.includes, action.payload];
    },
    mangaFilterExclude(state, action: PayloadAction<string>) {
      state.filter.includes = state.filter.includes.filter(
        (item) => item != action.payload
      );

      state.filter.excludes = [...state.filter.excludes, action.payload];
    },
    mangaFilterNoclude(state, action: PayloadAction<string>) {
      state.filter.excludes = state.filter.excludes.filter(
        (item) => item != action.payload
      );
    },
  },
});

export const {
  mangaZoom,
  mangaFilterInit,
  mangaFilterKeyword,
  mangaFilterSort,
  mangaFilterOrder,
  mangaFilterInclude,
  mangaFilterExclude,
  mangaFilterNoclude,
} = mangaSlice.actions;
export default mangaSlice.reducer;
