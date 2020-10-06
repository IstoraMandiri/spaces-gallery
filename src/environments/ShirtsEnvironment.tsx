import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import PauseMenu from "overlays/PauseMenu";
import { getEnvironmentStore } from "stores/environment";
import LoadingShirts from "ui-components/LoadingShirts";
import { ContainerProps } from "react-three-fiber/targets/shared/web/ResizeContainer";
import MobilePause from "ui-components/MobilePause";
import { isMobile } from "react-device-detect";
import { usePortal } from "../services/portal";
import { buildShirtPortal } from "../scenes/Shirts/services/shirtPortal";
import { ShirtsSceneComponent } from "../scenes/Shirts";

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
  scene: ShirtsSceneComponent;
  title?: string;
  artist?: string;
  link?: string;
};

const defaultCanvasProps: Partial<ContainerProps> = {
  shadowMap: true,
  gl: { alpha: false },
  sRGB: true,
  camera: { position: [0, 2, 0], near: 0.01, far: 200 },
};

const ShirtsEnvironment = (props: EnvironmentProps) => {
  const { scene: Scene, artist, title, link } = props;

  // create container ref and pass into environment store
  const container = useRef<HTMLDivElement>(null);
  const [useStore] = getEnvironmentStore(() => ({ container }));

  // get portal
  const id = window.location.pathname.substring(8);
  const { result, error } = usePortal(id, buildShirtPortal);

  const [fixedPath, setFixedPath] = useState<boolean>(true);

  if (error) {
    return <>{error}</>;
  }

  if (!result) {
    return <>Loading...</>;
  }

  return (
    <Container ref={container}>
      <Scene
        useEnvStore={useStore}
        defaultCanvasProps={defaultCanvasProps}
        portal={result}
        fixedPath={fixedPath}
      />
      <LoadingShirts
        useEnvStore={useStore}
        name={result.firstName}
        setFixedPath={setFixedPath}
      />
      <PauseMenu
        useEnvStore={useStore}
        artist={artist}
        link={link}
        title={title}
      />
      {isMobile && <MobilePause useEnvStore={useStore} />}
    </Container>
  );
};

export default ShirtsEnvironment;
