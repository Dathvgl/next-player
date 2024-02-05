import { RootState } from "../store";

// Zing MP3
export function musicZingMP3CurrentSelector(state: RootState) {
  return state.music.zingMP3.current;
}

export function musicZingMP3IdSelector(state: RootState) {
  return state.music.zingMP3.current.id;
}

export function musicZingMP3SrcSelector(state: RootState) {
  return state.music.zingMP3.current.src;
}

export function musicZingMP3InfoSelector(state: RootState) {
  return state.music.zingMP3.current.info;
}

export function musicZingMP3ListSelector(state: RootState) {
  return state.music.zingMP3.list;
}

export function musicZingMP3VolumeSelector(state: RootState) {
  return state.music.zingMP3.volume;
}

export function musicZingMP3LoopSelector(state: RootState) {
  return state.music.zingMP3.loop;
}

export function musicZingMP3PlaySelector(state: RootState) {
  return state.music.zingMP3.play;
}
