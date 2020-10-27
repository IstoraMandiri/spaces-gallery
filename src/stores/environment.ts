import create, { StoreApi, UseStore } from "zustand";
import { RefObject } from "react";
import { EnvironmentEvent } from "core/types/events";

/**
 * actual state of the environment
 *
 * paused: whether user movements are consumed by controls or not
 * pausedWindow: when paused, which window to show (undefined = pause menu)
 * container: ref to parent container
 * loading: loading progress of current scene => [0, 1]
 * events: functions to be called during environment lifecycle, to be cleaned up...
 */
export type EnvironmentStoreState = {
  paused: boolean;
  overlay: string | undefined;
  container: RefObject<HTMLDivElement> | null;
  loading: number;
  events: EnvironmentEvent[];
};

type EnvironmentStoreReducers = {
  setPaused: (p: boolean, overlay?: string) => void;
  setLoading: (l: number) => void;
  addEvent: (name: string, callback: (...args: any[]) => void) => void;
};

type EnvironmentStoreType = EnvironmentStoreState & EnvironmentStoreReducers;
type EnvironmentStoreInstance = [
  UseStore<EnvironmentStoreType>,
  StoreApi<EnvironmentStoreType>
];
export type EnvironmentStoreHook = EnvironmentStoreInstance[0];
export type EnvironmentStoreAPI = EnvironmentStoreInstance[1];

const defaultState: EnvironmentStoreState = {
  paused: true,
  overlay: undefined,
  container: null,
  loading: 0,
  events: [],
};

function createEnvironmentStore(
  initialState?: Partial<EnvironmentStoreState>
): EnvironmentStoreInstance {
  return create((set, get) => ({
    ...defaultState,
    ...initialState,
    set,
    setPaused: (p, o) => {
      set({ paused: p });

      if (!p) {
        // if unpausing, set paused overlay to undefined by default
        set({ overlay: o || undefined });
      }

      if (p && o) {
        // if pausing, only set closed overlay if passed ins
        set({ overlay: o });
      }

      // invoke all events labeled "paused"
      get().events.map((ev: EnvironmentEvent) => {
        if (ev.name === "paused") {
          ev.callback.apply(null, [p, o]);
        }
      });
    },
    setLoading: (l) => {
      set((state) => ({
        loading: Math.min(Math.max(l, state.loading), 1),
      }));
    },
    addEvent: (name: string, callback: (...args: any[]) => void) => {
      const event: EnvironmentEvent = {
        name,
        callback,
      };

      set((state) => ({
        events: [...state.events, event],
      }));
    },
  }));
}

let storeInstance: EnvironmentStoreInstance;

export function getEnvironmentStore(
  initialStateFunction: () => Partial<EnvironmentStoreState> = () => ({})
): EnvironmentStoreInstance {
  if (!process.browser) {
    return createEnvironmentStore(initialStateFunction());
  }

  if (!storeInstance) {
    storeInstance = createEnvironmentStore(initialStateFunction());
  }

  return storeInstance;
}
