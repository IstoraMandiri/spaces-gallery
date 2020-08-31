import React, { Suspense } from "react";
import { Physics } from "use-cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "three-components/InfinitePlane";
import Player from "core/Player";
import { SceneComponent } from "types/scene";

import SpacesGallery from "models/SpacesGallery";
import Analytics from "ui-components/Analytics";
import { Sky } from "drei";
import MainRoom from "./components/MainRoom";
import HDRISky from "../../three-components/HDRI/HDRISky";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
};

const Outside: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  return (
    <>
      <Analytics />
      <Canvas {...defaultCanvasProps}>
        {children}
        <Physics {...physicsProps}>
          <HDRISky />
          <InfinitePlane height={-0.001} />
          <Player useEnvStore={useEnvStore} />
          <ambientLight intensity={0.3} color={0xffffff} />
          <MainRoom />
          <pointLight position={[0, 10, 0]} intensity={2} color={0xe2cbff} />
          <Suspense fallback={null}>
            <SpacesGallery useEnvStore={useEnvStore} />
          </Suspense>
        </Physics>
      </Canvas>
    </>
  );
};

export default Outside;
