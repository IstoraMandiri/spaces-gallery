import React from "react";
import { Physics } from "@react-three/cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "@spacesvr/components/InfinitePlane";
import Player from "@spacesvr/core/players/Player";
import { SceneComponent } from "@spacesvr/core/types/scene";

import { useAnalytics } from "services/analytics";
import RealisticEffects from "@spacesvr/core/effects/RealisticEffects";
import Logo from "@spacesvr/components/Logo";
import HomeBlue from "./models/HomeBlue";
import HomeRed from "./models/HomeRed";
import HomePurple from "./models/HomePurple";
import { Color } from "three";
import SpacesVREntity from "./components/SpacesVREntity";
import PlaceholderEntity from "./components/PlaceholderEntity";
import Floor from "./components/Floor";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  gravity: [0, -30, 0],
  defaultContactMaterial: {
    friction: 0,
  },
};

const SpacesVR: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  useAnalytics();

  const entities = [...Array(90).keys()];

  return (
    <Canvas
      {...defaultCanvasProps}
      camera={{ near: 0.01, far: 200 }}
      onCreated={({ scene }) => {
        scene.background = new Color(0xffffff);
      }}
    >
      <fog attach="fog" args={[0xfffffff, 10, 60]} />
      {children}
      <Physics {...physicsProps}>
        <Logo position={[4, 0, 0]} />
        <SpacesVREntity />
        <Floor />
        {entities.map((val, i) => (
          <PlaceholderEntity key={i} />
        ))}
        <InfinitePlane height={-0.001} />
        <HomeBlue position-z={-10} />
        <HomePurple position-z={10} />
        <HomeRed position-x={10} />
        <Player useEnvStore={useEnvStore} initPos={[0, 1, 5]} />
        <ambientLight intensity={1} />
        <RealisticEffects />
      </Physics>
    </Canvas>
  );
};

export default SpacesVR;
