import React, { useMemo } from "react";
import { Physics } from "@react-three/cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "three-components/InfinitePlane";
import Player from "core/Player";
import { SceneComponent } from "core/types/scene";

import Analytics from "ui-components/Analytics";
import RealisticEffects from "core/effects/RealisticEffects";
import Logo from "three-components/Logo";

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

  return (
    <>
      <Analytics />
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
    </>
  );
};

export default Refactor;
