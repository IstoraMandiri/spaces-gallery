import React, { useMemo } from "react";
import { Physics } from "@react-three/cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "@spacesvr/components/InfinitePlane";
import Logo from "@spacesvr/components/Logo";
import Player from "@spacesvr/core/players/Player";
import { SceneComponent } from "@spacesvr/core/types/scene";

import { useAnalytics } from "services/analytics";
import RealisticEffects from "@spacesvr/core/effects/RealisticEffects";
import Grid from "./components/Grid";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  gravity: [0, -30, 0],
  defaultContactMaterial: {
    friction: 0,
  },
};

const Eighties: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  useAnalytics();

  return (
    <Canvas {...defaultCanvasProps}>
      {children}
      <fog attach="fog" args={[0x000000, 1, 100]} />
      <Physics {...physicsProps}>
        <InfinitePlane height={-0.001} />
        <Player useEnvStore={useEnvStore} />
        <Grid />
        <Grid position-y={8} />
        <Logo floating rotating position={[0, 1.25, 0]} />
        <ambientLight intensity={1} />
        <pointLight intensity={5} color={"white"} distance={55} />
        <RealisticEffects />
      </Physics>
    </Canvas>
  );
};

export default Eighties;
