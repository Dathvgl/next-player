import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { getZingMP3Detail, getZingMP3Song } from "~/services/music-service";
import { ZingMP3SongObject } from "~/types/music/zingMP3/song";
import { ZingMP3Loop } from "~/types/music/zingMP3/zingMP3";

type ZingMP3State = {
  play: boolean;
  volume: number;
  loop: ZingMP3Loop;
  list: string[];
  current: {
    id: string;
    src: string;
    info?: ZingMP3SongObject;
  };
};

type MusicState = {
  zingMP3: ZingMP3State;
};

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
      const { id, src, info } = action.payload;

      if (!state.zingMP3.list.includes(id)) {
        state.zingMP3.list.push(id);
      }

      state.zingMP3.current.id = id;
      state.zingMP3.current.src = src;
      state.zingMP3.current.info = info;
    });
    builder.addCase(zingMP3Init.rejected, (state, action) => {
      const { title, description } = action.payload as {
        title: string;
        description: string;
      };

      state.zingMP3.current.id = "";
      state.zingMP3.current.src = "";
      state.zingMP3.current.info = undefined;

      toast("Zing MP3 Error", { description: description });
    });
  },
});

export const zingMP3Init = createAsyncThunk(
  "music/zingMP3Song",
  async (id: string, { rejectWithValue }) => {
    const song = await getZingMP3Song(id);
    const detail = await getZingMP3Detail(id);

    if (!song || song.err != 0 || !id || !detail || detail.err != 0) {
      return rejectWithValue({
        title: "Zing MP3 Error",
        description: song?.msg ?? "Error fetch",
      });
    } else {
      const { "128": src } = song.data;
      return { id, src, info: detail.data };
    }
  }
);

export const { zingMP3Alt, zingMP3Play, zingMP3Volume, zingMP3Loop } =
  musicSlice.actions;
export default musicSlice.reducer;
