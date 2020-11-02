import create, { UseStore } from "zustand";
import { RefObject } from "react";
import { EnvironmentEvent } from "@spacesvr/core/types/events";

/**
 * actual state of the environment
 *
 * paused: whether user movements are consumed by controls or not
 * pausedWindow: when paused, which window to show (undefined = pause menu)
 * container: ref to parent container
 * events: functions to be called during environment lifecycle, to be cleaned up...
 */
export type EnvironmentStoreState = {
  paused: boolean;
  overlay: string | undefined;
  container: RefObject<HTMLDivElement> | null;
  events: EnvironmentEvent[];
};

type EnvironmentStoreReducers = {
  setPaused: (p: boolean, overlay?: string) => void;
  addEvent: (name: string, callback: (...args: any[]) => void) => void;
};

type EnvironmentStoreType = EnvironmentStoreState & EnvironmentStoreReducers;
export type EnvironmentStoreHook = UseStore<EnvironmentStoreType>;

const defaultState: EnvironmentStoreState = {
  paused: true,
  overlay: undefined,
  container: null,
  events: [],
};

function createEnvironmentStore(
  initialState?: Partial<EnvironmentStoreState>
): EnvironmentStoreHook {
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

let storeInstance: EnvironmentStoreHook;

export function getEnvironmentStore(
  initialStateFunction: () => Partial<EnvironmentStoreState> = () => ({})
): EnvironmentStoreHook {
  if (!process.browser) {
    return createEnvironmentStore(initialStateFunction());
  }

  if (!storeInstance) {
    storeInstance = createEnvironmentStore(initialStateFunction());
  }

  return storeInstance;
}
