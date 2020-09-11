import React, { Suspense } from "react";
import { Physics } from "use-cannon";
import { Canvas } from "react-three-fiber";
import Player from "core/Player";
import { SceneComponent } from "types/scene";

import Analytics from "ui-components/Analytics";
import DanilLighting from "./components/DanilLighting";
import BrutalistGallery from "models/BrutalistGallery";
import { Sky } from "drei";
import { Color } from "three";
import InfinitePlane from "three-components/InfinitePlane";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  defaultContactMaterial: {
    friction: 0,
  },
};

export const CHAD_COLOR = new Color(0x28fa92);
export const CHAD_COLOR2 = 0x28fa92;

const Chad: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  return (
    <>
      <Analytics />
      <Canvas {...defaultCanvasProps} camera={{ far: 150 }}>
        {children}
        <Sky />
        <Physics {...physicsProps}>
          <InfinitePlane height={-0.001} />
          <Player useEnvStore={useEnvStore} initPos={[0, 0, 0]} />
          <DanilLighting />
          <Suspense fallback={null}>
            <BrutalistGallery useEnvStore={useEnvStore} />
          </Suspense>
        </Physics>
      </Canvas>
    </>
  );
};

export default Chad;
