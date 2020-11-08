import create, { UseStore } from "zustand";
import { MutableRefObject } from "react";

/**
 * Audio Analyser is added to the store so it can be acccessed by the scene
 *
 * audioAnalyser: the Three.AudioAnalyser associated with the current playing song
 */
export type MusicStoreState = {
  audioAnalyser?: THREE.AudioAnalyser | undefined;
  audioRef?: MutableRefObject<HTMLAudioElement | undefined> | undefined;
  song?: Song;
  eventIndex: number;
};

type MusicStoreReducers = {
  setAnalyser: (a: THREE.AudioAnalyser) => void;
  setEventIndex: (n: number) => void;
  setAudioRef: (r: MutableRefObject<HTMLAudioElement | undefined>) => void;
};

type MusicStoreType = MusicStoreState & MusicStoreReducers;
export type MusicStoreHook = UseStore<MusicStoreType>;

const defaultState: MusicStoreState = {
  eventIndex: 0,
};

function createMusicStore(
  initialState?: Partial<MusicStoreState>
): MusicStoreHook {
  return create((set, get) => ({
    ...defaultState,
    ...initialState,
    set,
    setAnalyser: (a) => {
      set({ audioAnalyser: a });
    },
    setEventIndex: (n) => {
      set({ eventIndex: n });
    },
    setAudioRef: (r) => {
      set({ audioRef: r });
    },
  }));
}

let storeInstance: MusicStoreHook;

export function getMusicStore(
  initialStateFunction: () => Partial<MusicStoreState> = () => ({})
): MusicStoreHook {
  if (!process.browser) {
    return createMusicStore(initialStateFunction());
  }

  if (!storeInstance) {
    storeInstance = createMusicStore(initialStateFunction());
  }

  return storeInstance;
}
