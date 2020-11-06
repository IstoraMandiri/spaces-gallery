import React from "react";
import styled from "@emotion/styled";
import Crosshair from "../../ui/Crosshair";
import LoadingScreen from "../../../overlays/LoadingScreen";
import { ContainerProps } from "react-three-fiber/targets/shared/web/ResizeContainer";
import { EnvironmentState, EnvironmentProps } from "../../types/environment";
import { ProviderProps } from "@react-three/cannon/dist/Provider";
import { Physics } from "@react-three/cannon";
import { Canvas } from "react-three-fiber";
import Player from "../../players/Player";
import { Vector3 } from "three";
import InfinitePlane from "../../../components/InfinitePlane";
import RealisticEffects from "../../effects/RealisticEffects";
import { useEnvironmentState } from "../../utils/hooks";
import DesktopPause from "../../../overlays/DesktopPause";
import { isMobile } from "react-device-detect";
import MobilePause from "../../../overlays/MobilePause";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;

  canvas {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    outline: 0;
  }
`;

const defaultCanvasProps: Partial<ContainerProps> = {
  shadowMap: true,
  gl: { alpha: false },
  camera: { position: [0, 2, 0], near: 0.01, far: 100 },
};

const defaultPhysicsProps: Partial<ProviderProps> = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  gravity: [0, -30, 0],
  defaultContactMaterial: {
    friction: 0,
  },
};

type StandardEnvironmentProps = {
  player?: {
    pos?: Vector3;
    rot?: number;
  };
  disableEffects?: boolean;
};

export const stateContext = React.createContext<EnvironmentState>(
  {} as EnvironmentState
);

/**
 *
 * The most common environemnt
 *
 * Player Type: First Person
 * Physics: Enabled with default y=0 floor plane
 * Loading Screen: Spaces Edition
 * Pause Menu: Spaces Edition
 *
 */
const StandardEnvironment = (
  props: EnvironmentProps & StandardEnvironmentProps
) => {
  const { children, canvasProps, physicsProps, player, disableEffects } = props;

  const state = useEnvironmentState();

  return (
    <Container ref={state.containerRef}>
      <Canvas {...defaultCanvasProps} {...canvasProps}>
        <Physics {...defaultPhysicsProps} {...physicsProps}>
          <stateContext.Provider value={state}>
            <InfinitePlane height={-0.001} />
            <Player initPos={player?.pos} initRot={player?.rot} />
            {!disableEffects && <RealisticEffects />}
            {children}
          </stateContext.Provider>
        </Physics>
      </Canvas>
      <LoadingScreen />
      {!isMobile && <DesktopPause />}
      {isMobile && <MobilePause />}
      <Crosshair />
    </Container>
  );
};

export default StandardEnvironment;
