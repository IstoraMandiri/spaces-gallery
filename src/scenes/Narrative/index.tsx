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
import House from "./components/House";
import { GRAY } from "./components/Colors";
import Hills from "./components/Hills";
import HillRange from "./components/HillRange";
import SkyLine from "./components/SkyLine";
import SkyLines from "./components/SkyLines";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  gravity: [0, -30, 0],
  defaultContactMaterial: {
    friction: 0,
  },
};

const BG_COLOR = new Color(GRAY);

const Narrative: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

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
        <fog attach="fog" args={[GRAY, 100, 400]} />
        <Physics {...physicsProps}>
          <InfinitePlane height={-0.001} />
          <ambientLight intensity={1} />
          <Floor />
          <Player useEnvStore={useEnvStore} initPos={[0, 0, 8]} />
          <House />
          <HillRange />
          <SkyLines />
          <Logo
            floating
            rotating
            useEnvStore={useEnvStore}
            position={[0, -10, 0]}
          />
          <NarrativeEffects />
        </Physics>
      </Canvas>
    </>
  );
};

export default Narrative;
