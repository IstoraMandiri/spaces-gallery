import { ProviderProps } from "@react-three/cannon/dist/Provider";
import { ContainerProps } from "react-three-fiber/targets/shared/web/ResizeContainer";
import { EnvironmentEvent } from "./events";

type EnvironmentProps = {
  children: React.ReactNode;
  canvasProps?: Partial<ContainerProps>;
  physicsProps?: Partial<ProviderProps>;
};

type EnvironmentState = {
  paused: boolean;
  overlay: string | null;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  container: HTMLDivElement | null;
  events: EnvironmentEvent[];
  setPaused: (p: boolean, overlay?: string) => void;
  addEvent: (name: string, callback: (...args: any[]) => void) => void;
};
