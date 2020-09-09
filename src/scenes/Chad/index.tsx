import React, { Suspense } from "react";
import { Physics } from "use-cannon";
import { Canvas } from "react-three-fiber";
import Player from "core/Player";
import { SceneComponent } from "types/scene";

import Analytics from "ui-components/Analytics";
import Effects from "core/Effects";
import ChadGallery from "models/ChadGallery";
import ChadPiece from "./components/ChadPiece";
import ChadSpacesSphere from "./components/ChadSpacesSphere";
import { Sky } from "drei";
import ChadLighting from "./components/ChadLighting";

const physicsProps = {
  iterations: 10,
  size: 10,
  allowSleep: false,
};

const Chad: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  return (
    <>
      <Analytics />
      <Canvas {...defaultCanvasProps}>
        {children}
        <Physics {...physicsProps}>
          {/* @ts-ignore */}
          <Sky sunPosition={[0, 1, 0]} />
          {/*<InfinitePlane height={-0.001} />*/}
          <Player useEnvStore={useEnvStore} initPos={[0, 1, 30]} />
          <ChadSpacesSphere useEnvStore={useEnvStore} />
          <ChadLighting />
          <Suspense fallback={null}>
            <ChadGallery useEnvStore={useEnvStore} />
          </Suspense>
          <ChadPiece useEnvStore={useEnvStore} />
          <Effects />
        </Physics>
      </Canvas>
    </>
  );
};

export default Chad;
