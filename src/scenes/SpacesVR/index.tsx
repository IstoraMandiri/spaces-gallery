import React from "react";
import { Physics } from "@react-three/cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "@spacesvr/components/InfinitePlane";
import Player from "@spacesvr/core/players/Player";
import { SceneComponent } from "@spacesvr/core/types/scene";

import { useAnalytics } from "services/analytics";
import RealisticEffects from "@spacesvr/core/effects/RealisticEffects";
import { Color } from "three";
import SpacesVREntity from "./components/SpacesVREntity";
import Floor from "./components/Floor";
import { softShadows } from "@react-three/drei";
import Entities from "./components/Entities";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  gravity: [0, -30, 0],
  defaultContactMaterial: {
    friction: 0,
  },
};

const RENDER_DIST = 50;

softShadows({
  frustrum: 3.75, // Frustrum width (default: 3.75)
  size: 0.001, // World size (default: 0.005)
  near: 7.5, // Near plane (default: 9.5)
  samples: 17, // Samples (default: 17)
  rings: 11, // Rings (default: 11)
});

const SpacesVR: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  useAnalytics();

  return (
    <Canvas
      {...defaultCanvasProps}
      shadowMap
      gl={{ depth: true, alpha: true }}
      onCreated={({ scene }) => {
        scene.background = new Color(0xffffff);
      }}
    >
      <fog attach="fog" args={[0xfffffff, 0, RENDER_DIST]} />
      {children}
      <Physics {...physicsProps}>
        <SpacesVREntity />
        <Floor />
        <Entities renderdist={RENDER_DIST} />
        <InfinitePlane height={-0.001} />
        <Player useEnvStore={useEnvStore} initPos={[0, 8, 5]} />
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[0, RENDER_DIST, 0]}
          intensity={2}
          castShadow
          shadow-mapSize-height={2048}
          shadow-mapSize-width={2048}
          shadow-camera-left={-RENDER_DIST}
          shadow-camera-right={RENDER_DIST}
          shadow-camera-top={RENDER_DIST}
          shadow-camera-bottom={-RENDER_DIST}
        />
        <RealisticEffects />
      </Physics>
    </Canvas>
  );
};

export default SpacesVR;
