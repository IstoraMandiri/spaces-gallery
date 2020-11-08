import { ProviderProps } from "@react-three/cannon/dist/Provider";
import { ContainerProps } from "react-three-fiber/targets/shared/web/ResizeContainer";
import { EnvironmentEvent } from "./events";
import { PlayerRef } from "../utils/player";
import { MutableRefObject, ReactNode } from "react";

type EnvironmentProps = {
  children: ReactNode;
  canvasProps?: Partial<ContainerProps>;
  physicsProps?: Partial<ProviderProps>;
};

type EnvironmentState = {
  paused: boolean;
  player: PlayerRef;
  overlay: string | null;
  containerRef: MutableRefObject<HTMLDivElement | null>;
  container: HTMLDivElement | null;
  events: EnvironmentEvent[];
  setPlayer: (p: PlayerRef) => void;
  setPaused: (p: boolean, overlay?: string) => void;
  addEvent: (name: string, callback: (...args: any[]) => void) => void;
  portal?: Portal;
};
