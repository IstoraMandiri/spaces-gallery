import React, { useRef } from "react";
import styled from "@emotion/styled";
import { SceneComponent } from "core/types/scene";
import { getEnvironmentStore } from "stores/environment";
import LoadingScreen from "ui-components/LoadingScreen";
import { ContainerProps } from "react-three-fiber/targets/shared/web/ResizeContainer";
import Player from "../Player";

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
  title?: string;
  artist?: string;
  link?: string;
};

const defaultCanvasProps: Partial<ContainerProps> = {
  shadowMap: true,
  gl: { alpha: false },
  camera: { position: [0, 2, 0], near: 0.01, far: 100 },
};

const Environment = (props: EnvironmentProps) => {
  const { scene: Scene, artist, title, link } = props;

  // create container ref and pass into environment store
  const container = useRef<HTMLDivElement>(null);
  const [useStore] = getEnvironmentStore(() => ({ container }));

  return (
    <Container ref={container}>
      <LoadingScreen useEnvStore={useStore} />
      <Scene
        useEnvStore={useStore}
        defaultCanvasProps={defaultCanvasProps}
      ></Scene>
    </Container>
  );
};

export default Environment;
