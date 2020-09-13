import React, { Suspense, useMemo, useState } from "react";
import { Physics } from "use-cannon";
import { Canvas, useFrame } from "react-three-fiber";
import InfinitePlane from "three-components/InfinitePlane";
import { PusherProvider } from "@harelpls/use-pusher";
import Player from "core/Player";
import { SceneComponent } from "types/scene";
import SpacesSphere from "models/SpacesSphere";

import Analytics from "ui-components/Analytics";
import HDRISky from "three-components/HDRI/HDRISky";
import { Sky } from "drei";
import PlayerSet from "three-components/PlayerSet";
import { getPlayersStore } from "stores/players";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  gravity: [0, -30, 0],
  defaultContactMaterial: {
    friction: 0,
    // restitution?: number
    // contactEquationStiffness?: number
    // contactEquationRelaxation?: number
    // frictionEquationStiffness?: number
    // frictionEquationRelaxation?: number
  },
};

const pusherProps = {
  clientKey: process.env.NEXT_PUBLIC_PUSHER_KEY,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
};

const Multiplayer: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  const [usePlayersStore] = getPlayersStore(() => ({}));

  return (
    <>
      <Analytics />
      <Canvas {...defaultCanvasProps}>
        <PusherProvider {...pusherProps}>
          {children}
          <Physics {...physicsProps}>
            <Sky />
            <InfinitePlane height={-0.001} visible />
            <Player useEnvStore={useEnvStore} />
            <PlayerSet
              useEnvStore={useEnvStore}
              usePlayersStore={usePlayersStore}
            />
            <ambientLight intensity={1} />
            <Suspense fallback={null}>
              <SpacesSphere useEnvStore={useEnvStore} />
            </Suspense>
          </Physics>
        </PusherProvider>
      </Canvas>
    </>
  );
};

export default Multiplayer;
