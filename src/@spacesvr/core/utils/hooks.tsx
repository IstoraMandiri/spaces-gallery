import { useCallback, useContext, useRef, useState } from "react";
import { EnvironmentEvent } from "../types/events";
import { EnvironmentState } from "../types/environment";
import { stateContext } from "../environments/StandardEnvironments";

export function useEnvironment(): EnvironmentState {
  return useContext(stateContext);
}

export function useEnvironmentState(): EnvironmentState {
  const [paused, setPausedState] = useState(true);
  const [overlay, setOverlayState] = useState(null);
  const container = useRef<HTMLDivElement>(null);
  const events = useRef<EnvironmentEvent[]>([]);

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
    containerRef: container,
    container: container.current,
    events: events.current,
    setPaused,
    addEvent,
  };

  return context;
}
