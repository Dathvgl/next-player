"use client";

import {
  Dispatch,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";
import { ChildReact } from "~/types/type";

interface ZingMP3State {
  id?: string;
  src?: string;
  played?: boolean;
  loop?: string;
  volume?: number;
  error?: string;
}

interface ZingMP3Action {
  type: "init" | "played" | "volumed" | "empty";
  payload: ZingMP3State;
}

interface ZingMP3ContextProps {
  music: ZingMP3State;
  init: (id: string, src: string) => void;
  played: (state: boolean) => void;
  volumed: (volume: number) => void;
  empty: () => void;
}

const ZingMP3Context = createContext<ZingMP3State | null>(null);
const ZingMP3DispatchContext = createContext<Dispatch<ZingMP3Action> | null>(
  null
);

const musicReducer = (state: ZingMP3State, action: ZingMP3Action) => {
  const { type, payload } = action;
  switch (type) {
    case "init":
      return {
        ...state,
        id: payload.id,
        src: payload.src,
        played: false,
        error: undefined,
      };
    case "played":
      return { ...state, played: payload.played };
    case "volumed":
      return { ...state, volume: payload.volume };
    case "empty":
      return { volume: state.volume };
    default:
      return state;
  }
};

export const ZingMP3ContextProvider = ({ children }: ChildReact) => {
  // const [music, setMusic] = useState<ZingMP3State>({ volume: 0.1 });
  const [reducer, dispatch] = useReducer(musicReducer, { volume: 0.1 });

  // const init = (id: string, src: string) => {
  //   setMusic({ ...music, id, src, played: false, error: undefined });
  // };

  // const played = (state: boolean) => {
  //   setMusic({ ...music, played: state });
  // };

  // const volumed = (volume: number) => {
  //   setMusic({ ...music, volume: volume });
  // };

  // const empty = () => {
  //   setMusic({ volume: music.volume });
  // };

  // return (
  //   <ZingMP3Context.Provider value={{ music, init, played, volumed, empty }}>
  //     {children}
  //   </ZingMP3Context.Provider>
  // );

  return (
    <ZingMP3Context.Provider value={reducer}>
      <ZingMP3DispatchContext.Provider value={dispatch}>
        {children}
      </ZingMP3DispatchContext.Provider>
    </ZingMP3Context.Provider>
  );
};

export const useZingMP3 = () => {
  return useContext(ZingMP3Context);
};

export const useZingMP3Dispatch = () => {
  return useContext(ZingMP3DispatchContext);
};
