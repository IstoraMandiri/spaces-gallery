import React from "react";
import { Physics } from "@react-three/cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "@spacesvr/components/InfinitePlane";
import Player from "@spacesvr/core/players/Player";
import { SceneComponent } from "@spacesvr/core/types/scene";

import { useAnalytics } from "services/analytics";
import RealisticEffects from "@spacesvr/core/effects/RealisticEffects";
import Logo from "@spacesvr/components/Logo";
import { Sky } from "@react-three/drei";
import HomeBlue from "./models/HomeBlue";
import HomeRed from "./models/HomeRed";
import HomePurple from "./models/HomePurple";

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

  return (
    <Canvas {...defaultCanvasProps}>
      {children}
      <Physics {...physicsProps}>
        <Logo />
        <Sky />
        <InfinitePlane height={-0.001} />
        <HomeBlue position-z={-10} />
        <HomePurple position-z={10} />
        <HomeRed position-x={10} />
        <Player useEnvStore={useEnvStore} initPos={[0, 1, 2]} />
        <ambientLight intensity={1} />
        <pointLight intensity={1} color={"white"} distance={55} />
        <RealisticEffects />
      </Physics>
    </Canvas>
  );
};

export default SpacesVR;
