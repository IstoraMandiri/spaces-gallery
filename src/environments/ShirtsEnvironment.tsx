import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import PauseMenu from "overlays/PauseMenu";
import { getEnvironmentStore } from "stores/environment";
import ShirtsLoading from "overlays/ShirtsLoading";
import { ContainerProps } from "react-three-fiber/targets/shared/web/ResizeContainer";
import MobilePause from "ui-components/MobilePause";
import { isMobile } from "react-device-detect";
import { usePortal } from "../services/portal";
import { buildShirtPortal } from "../scenes/Shirts/services/shirtPortal";
import { ShirtsSceneComponent } from "../scenes/Shirts";
import { useRouter } from "next/router";

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

type EnvironmentProps = {
  scene: ShirtsSceneComponent;
};

const defaultCanvasProps: Partial<ContainerProps> = {
  shadowMap: true,
  gl: { alpha: false },
  sRGB: true,
  camera: { position: [0, 2, 0], near: 0.01, far: 200 },
};

const ShirtsEnvironment = (props: EnvironmentProps) => {
  const { scene: Scene } = props;

  // create container ref and pass into environment store
  const container = useRef<HTMLDivElement>(null);
  const [useStore] = getEnvironmentStore(() => ({ container }));

  // get portal
  const router = useRouter();
  const { id } = router.query;
  const { result, error } = usePortal(id as string, buildShirtPortal);

  const [fixedPath, setFixedPath] = useState<boolean>(true);

  if (error) {
    return <ErrorText>{error}</ErrorText>;
  }

  const numberedId = parseInt(id as string) || -1;
  const pauseTitle =
    numberedId > 0
      ? `The ${ordinalSuffixOf(numberedId)} Portal, made just for ${
          result ? result.firstName : ""
        }`
      : `Shirt Portal | ${id}`;

  return (
    <Container ref={container}>
      <Scene
        useEnvStore={useStore}
        defaultCanvasProps={defaultCanvasProps}
        portal={result}
        fixedPath={fixedPath}
      />
      <ShirtsLoading useEnvStore={useStore} setFixedPath={setFixedPath} />
      <PauseMenu useEnvStore={useStore} title={pauseTitle} />
      {isMobile && <MobilePause useEnvStore={useStore} />}
    </Container>
  );
};

function ordinalSuffixOf(i: number) {
  const j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

export default ShirtsEnvironment;
