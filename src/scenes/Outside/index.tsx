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
import OutsideLighting from "./components/OutsideLighting";
import HectorRoom from "./components/HectorRoom";

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
          <RobertRoom />
          <HectorRoom useEnvStore={useEnvStore} />
          <ZachRoom />
          <DennisRoom useEnvStore={useEnvStore} />
          <OutsideLighting />
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
