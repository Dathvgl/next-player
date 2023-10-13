import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
});

export const { zingMP3Init, zingMP3Play, zingMP3Volume, zingMP3Loop } =
  musicSlice.actions;
export default musicSlice.reducer;
