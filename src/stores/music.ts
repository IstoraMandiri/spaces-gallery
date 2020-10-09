import { AudioAnalyser } from "three";
import create, { StoreApi, UseStore } from "zustand";
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
type MusicStoreInstance = [UseStore<MusicStoreType>, StoreApi<MusicStoreType>];
export type MusicStoreHook = MusicStoreInstance[0];
export type MusicStoreAPI = MusicStoreInstance[1];

const defaultState: MusicStoreState = {
  eventIndex: 0,
};

function createMusicStore(
  initialState?: Partial<MusicStoreState>
): MusicStoreInstance {
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

let storeInstance: MusicStoreInstance;

export function getMusicStore(
  initialStateFunction: () => Partial<MusicStoreState> = () => ({})
): MusicStoreInstance {
  if (!process.browser) {
    return createMusicStore(initialStateFunction());
  }

  if (!storeInstance) {
    storeInstance = createMusicStore(initialStateFunction());
  }

  return storeInstance;
}
