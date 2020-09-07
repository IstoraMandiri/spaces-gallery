import React, { Suspense, useMemo, useState } from "react";
import { Physics } from "use-cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "three-components/InfinitePlane";
import Player from "core/Player";
import { SceneComponent } from "types/scene";
import SpacesSphere from "models/SpacesSphere";

import Analytics from "ui-components/Analytics";
import HDRISky from "three-components/HDRI/HDRISky";
import { Sky } from "drei";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  gravity: [0, -30, 0],
  defaultContactMaterial: {
    friction: 0,
    // restitution?: number
    // contactEquationStiffness?: number
    // contactEquationRelaxation?: number
    // frictionEquationStiffness?: number
    // frictionEquationRelaxation?: number
  },
};

const Multiplayer: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  return (
    <>
      <Analytics />
      <Canvas {...defaultCanvasProps}>
        {children}
        <Physics {...physicsProps}>
          <Sky />
          <InfinitePlane height={-0.001} visible />
          <Player useEnvStore={useEnvStore} />
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
            <SpacesSphere useEnvStore={useEnvStore} />
          </Suspense>
        </Physics>
      </Canvas>
    </>
  );
};

export default Multiplayer;
