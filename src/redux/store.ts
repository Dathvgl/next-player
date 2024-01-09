import { configureStore } from "@reduxjs/toolkit";
import { mangaSlice } from "./slices/manga-slice";
import { musicSlice } from "./slices/music-slice";
import { roleApi } from "./apis/role-api";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    // Slice
    [mangaSlice.name]: mangaSlice.reducer,
    [musicSlice.name]: musicSlice.reducer,
    // Api
    [roleApi.reducerPath]: roleApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(roleApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
