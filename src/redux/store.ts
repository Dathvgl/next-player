import { configureStore } from "@reduxjs/toolkit";
import { mangaSlice } from "./features/manga-slice";
import { musicSlice } from "./features/music-slice";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    [mangaSlice.name]: mangaSlice.reducer,
    [musicSlice.name]: musicSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
