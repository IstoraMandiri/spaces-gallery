import { ReactNode, useState } from "react";
import styled from "@emotion/styled";
import ShirtsLoading from "@spacesvr/overlays/PortalLoadingScreen";
import { ContainerProps } from "react-three-fiber/targets/shared/web/ResizeContainer";
import { usePortal } from "services/portal";
import { useRouter } from "next/router";
import {
  EnvironmentProps,
  EnvironmentState,
} from "@spacesvr/core/types/environment";
import { Canvas } from "react-three-fiber";
import Player from "@spacesvr/core/players/Player";
import {
  useEnvironmentState,
  environmentStateContext,
} from "@spacesvr/core/utils/hooks";
import { Physics } from "@react-three/cannon";
import { ProviderProps } from "@react-three/cannon/dist/Provider";
import TrackPlayer from "@spacesvr/core/players/TrackPlayer";
import { Vector3 } from "three";
import DesktopPause from "@spacesvr/overlays/DesktopPause";
import { isMobile } from "react-device-detect";
import MobilePause from "@spacesvr/overlays/MobilePause";

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

const ErrorText = styled.p`
  position: absolute;
  text-align: center;
  color: red;
  width: 100%;
  max-width: 500px;
  padding: 0 10%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const defaultCanvasProps: Partial<ContainerProps> = {
  shadowMap: true,
  gl: { alpha: false },
  camera: { position: [0, 2, 0], near: 0.01, far: 200 },
};

const defaultPhysicsProps: Partial<ProviderProps> = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  defaultContactMaterial: {
    friction: 0,
  },
};

type PortalEnvironmentProps = {
  portalHandler: (portalResult: Portal) => Portal;
  children2d?: ReactNode;
};

const PortalEnvironment = (
  props: EnvironmentProps & PortalEnvironmentProps
) => {
  const {
    children,
    canvasProps,
    physicsProps,
    children2d,
    portalHandler,
  } = props;

  const router = useRouter();
  const { id } = router.query;
  const { result, error } = usePortal(id as string, portalHandler);

  const state = useEnvironmentState();
  const localState: EnvironmentState = { ...state, portal: result };

  const [fixedPath, setFixedPath] = useState<boolean>(true);

  if (error) {
    return <ErrorText>{error}</ErrorText>;
  }

  return (
    <Container ref={state.containerRef}>
      <Canvas {...defaultCanvasProps} {...canvasProps}>
        <Physics {...defaultPhysicsProps} {...physicsProps}>
          <environmentStateContext.Provider value={localState}>
            {fixedPath ? (
              <TrackPlayer />
            ) : (
              <Player initPos={new Vector3(0, 2, 53)} />
            )}
            {children}
          </environmentStateContext.Provider>
        </Physics>
      </Canvas>
      <environmentStateContext.Provider value={localState}>
        {children2d}
        <ShirtsLoading setFixedPath={setFixedPath} />
        <DesktopPause />
        {isMobile && <MobilePause />}
      </environmentStateContext.Provider>
    </Container>
  );
};

export default PortalEnvironment;
