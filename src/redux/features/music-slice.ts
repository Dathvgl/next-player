import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ZingMP3State {
  id: string;
  src: string;
  play: boolean;
  volume: number;
  loop: string;
}

interface MusicState {
  zingMP3: ZingMP3State;
}

const initialState: MusicState = {
  zingMP3: {
    id: "",
    src: "",
    play: false,
    volume: 0.1,
    loop: "",
  },
};

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    zingMP3Init(state, action: PayloadAction<{ id: string; src: string }>) {
      const { id, src } = action.payload;
      state.zingMP3.id = id;
      state.zingMP3.src = src;
    },
    zingMP3Play(state, action: PayloadAction<boolean>) {
      state.zingMP3.play = action.payload;
    },
    zingMP3Volume(state, action: PayloadAction<number>) {
      state.zingMP3.volume = action.payload;
    },
  },
});

export const { zingMP3Init, zingMP3Play, zingMP3Volume } = musicSlice.actions;
export default musicSlice.reducer;
