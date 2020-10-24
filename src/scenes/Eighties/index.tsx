import React, { useMemo } from "react";
import { Physics } from "use-cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "three-components/InfinitePlane";
import Logo from "three-components/Logo";
import Player from "core/Player";
import { SceneComponent } from "types/scene";

import Analytics from "ui-components/Analytics";
import Effects from "core/Effects";
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

  return (
    <>
      <Analytics />
      <Canvas {...defaultCanvasProps}>
        {children}
        <fog attach="fog" args={[0x000000, 1, 100]} />
        <Physics {...physicsProps}>
          <InfinitePlane height={-0.001} />
          <Player useEnvStore={useEnvStore} />
          <Grid />
          <Grid position-y={8} />
          <Logo
            floating
            rotating
            useEnvStore={useEnvStore}
            position={[0, 1.25, 0]}
          />
          <ambientLight intensity={1} />
          <pointLight intensity={5} color={"white"} distance={55} />
          <Effects />
        </Physics>
      </Canvas>
    </>
  );
};

export default Eighties;
