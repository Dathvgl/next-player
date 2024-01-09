import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "~/components/ui/use-toast";
import { externalApi } from "~/lib/api";
import handleFetch from "~/lib/fetch";
import { ZingMP3SongDetailResponse } from "~/types/music/zingMP3/song";
import { ZingMP3Loop } from "~/types/music/zingMP3/zingMP3";

interface ZingMP3State {
  play: boolean;
  volume: number;
  loop: ZingMP3Loop;
  list: string[];
  current: {
    id: string;
    src: string;
  };
}

interface MusicState {
  zingMP3: ZingMP3State;
}

const initialState: MusicState = {
  zingMP3: {
    play: false,
    volume: 0.1,
    loop: "one",
    list: [],
    current: {
      id: "",
      src: "",
    },
  },
};

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    zingMP3Init(state, action: PayloadAction<{ id: string; src: string }>) {
      const { id, src } = action.payload;

      if (!state.zingMP3.list.includes(id)) {
        state.zingMP3.list.push(id);
      }

      state.zingMP3.current.id = id;
      state.zingMP3.current.src = src;
    },
    zingMP3Alt(state, action: PayloadAction<string>) {
      const list = state.zingMP3.list.filter((item) => item != action.payload);
      state.zingMP3.list = list;

      if (list.length == 0) {
        state.zingMP3.current = { id: "", src: "" };
      }
    },
    zingMP3Play(state, action: PayloadAction<boolean>) {
      state.zingMP3.play = action.payload;
    },
    zingMP3Volume(state, action: PayloadAction<number>) {
      state.zingMP3.volume = action.payload;
    },
    zingMP3Loop(state, action: PayloadAction<ZingMP3Loop>) {
      state.zingMP3.loop = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(zingMP3Init.pending, (state, action) => {});
    builder.addCase(zingMP3Init.fulfilled, (state, action) => {
      const { id, src } = action.payload;

      if (!state.zingMP3.list.includes(id)) {
        state.zingMP3.list.push(id);
      }

      state.zingMP3.current.id = id;
      state.zingMP3.current.src = src;
    });
    builder.addCase(zingMP3Init.rejected, (state, action) => {
      const { title, description } = action.payload as {
        title: string;
        description: string;
      };

      toast({ title: "Zing MP3 Error", description: description });
    });
  },
});

export const zingMP3Init = createAsyncThunk(
  "music/zingMP3Song",
  async (id: string, { rejectWithValue }) => {
    const data = await handleFetch<ZingMP3SongDetailResponse>(
      `${externalApi.musicZingMP3}/song/${id}`
    );

    if (!data || data.err != 0 || !id) {
      return rejectWithValue({
        title: "Zing MP3 Error",
        description: data?.msg ?? "Error fetch",
      });
    } else {
      const { "128": src } = data.data;
      return { id, src };
    }
  }
);

export const { zingMP3Alt, zingMP3Play, zingMP3Volume, zingMP3Loop } =
  musicSlice.actions;
export default musicSlice.reducer;
