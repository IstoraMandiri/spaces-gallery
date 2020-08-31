import React, { Suspense } from "react";
import { Physics } from "use-cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "three-components/InfinitePlane";
import Player from "core/Player";
import { SceneComponent } from "types/scene";

import SpacesGallery from "models/SpacesGallery";
import Analytics from "ui-components/Analytics";
import RobertRoom from "./components/RobertRoom";
import HDRISky from "three-components/HDRI/HDRISky";
import Effects from "core/Effects";
import ZachRoom from "./components/ZachRoom";
import DennisRoom from "./components/DennisRoom";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  gravity: [0, -40, 0],
  defaultContactMaterial: {
    friction: 0,
    // restitution?: number
    // contactEquationStiffness?: number
    // contactEquationRelaxation?: number
    // frictionEquationStiffness?: number
    // frictionEquationRelaxation?: number
  },
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
          <ambientLight intensity={0.1} color={0xffffff} />
          {/*<pointLight intensity={2} position={[0, 3, 0]} color={0xff0000} />*/}
          <RobertRoom />
          <ZachRoom />
          <DennisRoom useEnvStore={useEnvStore} />
          <pointLight position={[0, 10, 0]} intensity={2} color={0xe2cbff} />
          <Suspense fallback={null}>
            <SpacesGallery useEnvStore={useEnvStore} />
          </Suspense>
          <Effects />
        </Physics>
      </Canvas>
    </>
  );
};

export default Outside;
