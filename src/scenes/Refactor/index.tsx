import React, { useMemo } from "react";
import { Physics } from "@react-three/cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "@spacesvr/components/InfinitePlane";
import Player from "@spacesvr/core/players/Player";
import { SceneComponent } from "@spacesvr/core/types/scene";

import { useAnalytics } from "services/analytics";
import RealisticEffects from "@spacesvr/core/effects/RealisticEffects";
import Logo from "@spacesvr/components/Logo";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  gravity: [0, -30, 0],
  defaultContactMaterial: {
    friction: 0,
  },
};

const Refactor: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  useAnalytics();

  return (
    <Canvas {...defaultCanvasProps}>
      {children}
      <fog attach="fog" args={[0xe7e7e7, 1, 10]} />
      <Physics {...physicsProps}>
        <InfinitePlane height={-0.001} />
        <Player useEnvStore={useEnvStore} />
        <ambientLight intensity={1} />
        <pointLight intensity={5} color={"white"} distance={55} />
        <RealisticEffects />
      </Physics>
    </Canvas>
  );
};

export default Refactor;
