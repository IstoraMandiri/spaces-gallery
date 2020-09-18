import { AudioAnalyser } from "three";
import create, { StoreApi, UseStore } from "zustand";

/**
 * Audio Analyser is added to the store so it can be acccessed by the scene
 *
 * audioAnalyser: the Three.AudioAnalyser associated with the current playing song
 */
export type AudioAnalyserStoreState = {
  audioAnalyser: THREE.AudioAnalyser | null;
};

type AudioAnalyserStoreReducers = {
  setAnalyser: (a: THREE.AudioAnalyser) => void;
};

type AudioAnalyserStoreType = AudioAnalyserStoreState &
  AudioAnalyserStoreReducers;
type AudioAnalyserStoreInstance = [
  UseStore<AudioAnalyserStoreType>,
  StoreApi<AudioAnalyserStoreType>
];
export type AudioAnalyserStoreHook = AudioAnalyserStoreInstance[0];
export type AudioAnalyserStoreAPI = AudioAnalyserStoreInstance[1];

const defaultState: AudioAnalyserStoreState = {
  audioAnalyser: null,
};

function createAudioAnalyserStore(
  initialState?: Partial<AudioAnalyserStoreState>
): AudioAnalyserStoreInstance {
  return create((set, get) => ({
    ...defaultState,
    ...initialState,
    set,
    setAnalyser: (a) => {
      set({ audioAnalyser: a });
    },
  }));
}

let storeInstance: AudioAnalyserStoreInstance;

export function getAudioAnalyserStore(
  initialStateFunction: () => Partial<AudioAnalyserStoreState> = () => ({})
): AudioAnalyserStoreInstance {
  if (!process.browser) {
    return createAudioAnalyserStore(initialStateFunction());
  }

  if (!storeInstance) {
    storeInstance = createAudioAnalyserStore(initialStateFunction());
  }

  return storeInstance;
}
