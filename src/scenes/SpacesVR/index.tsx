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
import PlaceholderEntity from "./components/PlaceholderEntity";
import Floor from "./components/Floor";
import { softShadows } from "@react-three/drei";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  gravity: [0, -30, 0],
  defaultContactMaterial: {
    friction: 0,
  },
};

softShadows({});

const SpacesVR: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  useAnalytics();

  const entities = [...Array(90).keys()];

  return (
    <Canvas
      {...defaultCanvasProps}
      shadowMap
      gl={{ depth: true, alpha: true }}
      camera={{ near: 0.01, far: 200 }}
      onCreated={({ scene }) => {
        scene.background = new Color(0xffffff);
      }}
    >
      <fog attach="fog" args={[0xfffffff, 0, 60]} />
      {children}
      <Physics {...physicsProps}>
        <SpacesVREntity />
        <Floor />
        {entities.map((val, i) => (
          <PlaceholderEntity key={i} />
        ))}
        <InfinitePlane height={-0.001} />
        <Player useEnvStore={useEnvStore} initPos={[0, 1, 5]} />
        <ambientLight intensity={1} />
        <directionalLight
          position={[0, 10, 0]}
          intensity={2}
          castShadow
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <RealisticEffects />
      </Physics>
    </Canvas>
  );
};

export default SpacesVR;
