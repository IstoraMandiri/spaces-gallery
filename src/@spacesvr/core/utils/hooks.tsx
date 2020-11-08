import React, { useCallback, useContext, useRef, useState } from "react";
import { EnvironmentEvent } from "../types/events";
import { EnvironmentState } from "../types/environment";
import { PlayerRef } from "./player";

export const environmentStateContext = React.createContext<EnvironmentState>(
  {} as EnvironmentState
);

export function useEnvironment(): EnvironmentState {
  return useContext(environmentStateContext);
}

export function useEnvironmentState(): EnvironmentState {
  const [paused, setPausedState] = useState(true);
  const [overlay, setOverlayState] = useState(null);
  const container = useRef<HTMLDivElement>(null);
  const events = useRef<EnvironmentEvent[]>([]);
  const player = useRef<PlayerRef>({} as PlayerRef);

  const setPaused = useCallback(
    (p, o) => {
      setPausedState(p);

      if (!p) {
        // if unpausing, set paused overlay to undefined by default
        setOverlayState(o || null);
      }

      if (p && o) {
        // if pausing, only set closed overlay if passed ins
        setOverlayState(o);
      }

      events.current.map((ev: EnvironmentEvent) => {
        if (ev.name === "paused") {
          ev.callback.apply(null, [p, o]);
        }
      });
    },
    [events]
  );

  const setPlayer = (p: PlayerRef) => {
    player.current = p;
  };

  const addEvent = useCallback(
    (name: string, callback: (...args: any[]) => void) => {
      const event: EnvironmentEvent = {
        name,
        callback,
      };

      events.current.push(event);
    },
    []
  );

  const context: EnvironmentState = {
    paused,
    overlay,
    player: player.current,
    containerRef: container,
    container: container.current,
    events: events.current,
    setPaused,
    setPlayer,
    addEvent,
  };

  return context;
}
