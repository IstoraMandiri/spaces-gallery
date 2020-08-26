import React, { useRef } from "react";
import { styled } from "twin.macro";
import PauseMenu from "overlays/PauseMenu";
import Crosshair from "./Crosshair";
import { SceneComponent } from "types/scene";
import { getEnvironmentStore } from "stores/environment";
import LoadingScreen from "ui-components/LoadingScreen";
import { ContainerProps } from "react-three-fiber/targets/shared/web/ResizeContainer";
import MobilePause from "ui-components/MobilePause";
import { isMobile } from "react-device-detect";

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

type EnvironmentProps = {
  scene: SceneComponent;
};

const defaultCanvasProps: Partial<ContainerProps> = {
  shadowMap: false,
  gl: { alpha: false },
  sRGB: true,
  camera: { position: [0, 2, 0], near: 0.01 },
};

const Environment = (props: EnvironmentProps) => {
  const { scene: Scene } = props;

  // create container ref and pass into environment store
  const container = useRef<HTMLDivElement>(null);
  const [useStore] = getEnvironmentStore(() => ({ container }));

  return (
    <Container ref={container}>
      <Scene useEnvStore={useStore} defaultCanvasProps={defaultCanvasProps} />
      <LoadingScreen useEnvStore={useStore} />
      <PauseMenu useEnvStore={useStore} />
      {isMobile && <MobilePause useEnvStore={useStore} />}
      <Crosshair />
    </Container>
  );
};

export default Environment;
