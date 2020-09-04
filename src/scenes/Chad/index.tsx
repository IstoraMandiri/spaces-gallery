import React, { Suspense, useState } from "react";
import { Physics } from "use-cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "three-components/InfinitePlane";
import Player from "core/Player";
import { SceneComponent } from "types/scene";

import Analytics from "ui-components/Analytics";
import HDRISky from "three-components/HDRI/HDRISky";
import Effects from "core/Effects";
import SpacesSphere from "models/SpacesSphere";
import ChadKnight from "models/ChadKnight";
import ChadPiece from "./components/ChadPiece";
import { WebGLRenderer } from "three";

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

const Chad: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  const [renderer, setRenderer] = useState<WebGLRenderer>();

  return (
    <>
      <Analytics />
      <Canvas
        {...defaultCanvasProps}
        onCreated={(props) => {
          setRenderer(props.gl);
        }}
      >
        {children}
        <Physics {...physicsProps}>
          <HDRISky />
          <InfinitePlane height={-0.001} />
          <Player useEnvStore={useEnvStore} />
          <Suspense fallback={null}>
            <SpacesSphere useEnvStore={useEnvStore} />
          </Suspense>
          <ambientLight intensity={0.3} />
          <ChadPiece useEnvStore={useEnvStore} />
          <Effects renderer={renderer} />
        </Physics>
      </Canvas>
    </>
  );
};

export default Chad;
