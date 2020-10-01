import React, { useMemo, Suspense } from "react";
import { Physics } from "use-cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "three-components/InfinitePlane";
import Logo from "three-components/Logo";
import Player from "core/Player";
import { SceneComponent } from "types/scene";

import Analytics from "ui-components/Analytics";
import { Color } from "three";
import Floor from "./components/Floor";
import NarrativeEffects from "./components/NarrativeEffects";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  gravity: [0, -30, 0],
  defaultContactMaterial: {
    friction: 0,
  },
};

const BG_COLOR_HEX = 0x262626;
const BG_COLOR = new Color(BG_COLOR_HEX);

const Narrative: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  const seed = useMemo(() => Math.random(), []);

  return (
    <>
      <Analytics />
      <Canvas
        {...defaultCanvasProps}
        camera={{ far: 500 }}
        colorManagement={true}
      >
        {children}
        <color
          attach="background"
          args={[BG_COLOR.r, BG_COLOR.g, BG_COLOR.b]}
        />
        <fog attach="fog" args={[BG_COLOR_HEX, 100, 400]} />
        <Physics {...physicsProps}>
          <InfinitePlane height={-0.001} />
          <ambientLight intensity={1} />
          <Floor />
          <Player useEnvStore={useEnvStore} initPos={[0, 0, 3]} />
          <Logo
            floating
            rotating
            useEnvStore={useEnvStore}
            position={[0, 1.25, 0]}
          />
          <NarrativeEffects />
        </Physics>
      </Canvas>
    </>
  );
};

export default Narrative;
