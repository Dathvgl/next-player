import { configureStore } from "@reduxjs/toolkit";
import { mangaSlice } from "./slices/manga-slice";
import { musicSlice } from "./slices/music-slice";
import { userSlice } from "./slices/user-slice";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    // Slice
    [userSlice.name]: userSlice.reducer,
    [mangaSlice.name]: mangaSlice.reducer,
    [musicSlice.name]: musicSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
