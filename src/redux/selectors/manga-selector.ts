import { RootState } from "../store";

export function mangaZoomSelector(state: RootState) {
  return state.manga.zoom;
}

export function mangaFilterSelector(state: RootState) {
  return state.manga.filter;
}

export function mangaFilterSortSelector(state: RootState) {
  return state.manga.filter.sort;
}

export function mangaFilterOrderSelector(state: RootState) {
  return state.manga.filter.order;
}

export function mangaFilterIncludeSelector(state: RootState) {
  return state.manga.filter.includes;
}

export function mangaFilterExcludeSelector(state: RootState) {
  return state.manga.filter.excludes;
}
