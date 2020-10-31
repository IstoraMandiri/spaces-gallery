import React, { Suspense, useRef, useState } from "react";
import { Physics } from "@react-three/cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "@spacesvr/components/InfinitePlane";
import Player from "@spacesvr/core/players/Player";
import { SceneComponent } from "@spacesvr/core/types/scene";

import { useAnalytics } from "services/analytics";
import RealisticEffects from "@spacesvr/core/effects/RealisticEffects";
import Logo from "@spacesvr/components/Logo";
import WolvesCenter from "./models/WolvesCenter";
import Shop from "./components/Shop";
import { Color, Raycaster, Vector3 } from "three";
import { Sky } from "@react-three/drei";
import WolvesTitle from "./components/WolvesTitle";
import SpacesTitle from "./components/SpacesTitle";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  gravity: [0, -30, 0],
  defaultContactMaterial: {
    friction: 0,
  },
};

const Wolves: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;
  const raycaster = useRef(new Raycaster(new Vector3(), new Vector3(), 0, 3));
  const [lockControls, setLockControls] = useState(false);

  useAnalytics();

  return (
    <Canvas
      {...defaultCanvasProps}
      camera={{ near: 0.1, far: 150 }}
      onCreated={({ scene }) => {
        scene.background = new Color(0x66e8ff);
      }}
    >
      {children}
      <fog attach="fog" args={[0x66e8ff, 10, 60]} />
      <Physics {...physicsProps}>
        <InfinitePlane height={-0.001} />
        <Player
          useEnvStore={useEnvStore}
          initPos={[6, 9, 2]}
          raycaster={raycaster}
          // lockControls={lockControls}
        />
        <ambientLight intensity={1} />
        <directionalLight intensity={1} />
        <RealisticEffects />
        <WolvesTitle />
        <SpacesTitle />
        <Suspense fallback={null}>
          <WolvesCenter />
        </Suspense>
        <Shop raycaster={raycaster} useEnvStore={useEnvStore} />
      </Physics>
    </Canvas>
  );
};

export default Wolves;
