import React, { Suspense } from "react";
import { Physics } from "use-cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "three-components/InfinitePlane";
import Player from "core/Player";
import { SceneComponent } from "types/scene";
import ShirtsMusic from "./components/ShirtsMusic";
import ShirtsPiece from "./components/ShirtsPiece";
import ShirtsFloor from "./components/ShirtsFloor";

import { getAudioAnalyserStore } from "stores/audio";
import Analytics from "ui-components/Analytics";
import { Sky } from "drei";
import ShirtsLighting from "./components/ShirtsLighting";
import { usePortal } from "services/portal";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  gravity: [0, -30, 0],
  defaultContactMaterial: {
    friction: 0,
  },
};

const Shirts: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  const id = window.location.pathname.substring(8);
  const [useAAStore] = getAudioAnalyserStore(() => ({}));

  const { result, error } = usePortal(id);

  if (error) {
    return <>{error}</>;
  }

  console.log(result);

  return (
    <>
      <Analytics />
      <Canvas {...defaultCanvasProps}>
        {children}
        <Physics {...physicsProps}>
          <Sky />
          <InfinitePlane height={-0.001} />
          <Player useEnvStore={useEnvStore} initPos={[0, 10, 14]} />
          <ambientLight intensity={0.2} />
          <ShirtsLighting />
          <group position={[0, 0, 23]}>
            <ShirtsMusic
              useEnvStore={useEnvStore}
              useAAStore={useAAStore}
              url="https://d27rt3a60hh1lx.cloudfront.net/audio/ini-bestmixever.mp3"
            />
            <Suspense fallback={null}>
              <ShirtsPiece useEnvStore={useEnvStore} useAAStore={useAAStore} />
              <ShirtsFloor
                useEnvStore={useEnvStore}
                position={[-30, -2.5, -30]}
                scale={[1, 0.5, 1]}
                cubes={50}
                hueStart={0.5}
                hueEnd={0.8}
              />
            </Suspense>
          </group>
          <Suspense fallback={null}>
            <ShirtsPiece
              useEnvStore={useEnvStore}
              useAAStore={useAAStore}
              json={result}
            />
            <ShirtsFloor
              useEnvStore={useEnvStore}
              position={[-30, -2.5, -30]}
              scale={[1, 0.5, 1]}
              cubes={50}
              hueStart={0.5}
              hueEnd={0.8}
            />
          </Suspense>
        </Physics>
      </Canvas>
    </>
  );
};

export default Shirts;
