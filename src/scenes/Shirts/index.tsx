import React, { Suspense } from "react";
import { Physics } from "use-cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "three-components/InfinitePlane";
import Player from "core/Player";
import { SceneProps } from "types/scene";
import ShirtsMusic from "./components/ShirtsMusic";
import ShirtsAssets from "./components/ShirtsAssets";
import ShirtsFloor from "./components/ShirtsFloor";

import { getAudioAnalyserStore } from "stores/audio";
import Analytics from "ui-components/Analytics";
import ShirtsLighting from "./components/ShirtsLighting";
import Logo from "three-components/Logo";
import ColoredSky from "./components/ColoredSky";
import WallPiece from "./components/WallPiece";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  gravity: [0, -30, 0],
  defaultContactMaterial: {
    friction: 0,
  },
};

type ShirtsSceneProps = SceneProps & { portal: Portal | undefined };
export type ShirtsSceneComponent = React.ComponentType<ShirtsSceneProps>;

const Shirts: ShirtsSceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, portal, children } = props;

  const [useAAStore] = getAudioAnalyserStore(() => ({}));

  return (
    <>
      <Analytics />
      <Canvas {...defaultCanvasProps}>
        {children}
        <Physics {...physicsProps}>
          <ColoredSky />
          <InfinitePlane height={-0.001} />
          <Player useEnvStore={useEnvStore} initPos={[0, 2, 20]} />
          <ambientLight intensity={0.2} />
          <ShirtsLighting />
          <group position={[0, 0, 23]}>
            <ShirtsMusic
              useEnvStore={useEnvStore}
              useAAStore={useAAStore}
              url="https://d27rt3a60hh1lx.cloudfront.net/audio/ini-bestmixever.mp3"
            />
          </group>
          <Suspense fallback={null}>
            <WallPiece useEnvStore={useEnvStore} useAAStore={useAAStore} />
            <ShirtsAssets
              useEnvStore={useEnvStore}
              useAAStore={useAAStore}
              portal={portal}
            />
            <ShirtsFloor
              useEnvStore={useEnvStore}
              position={[0, -2.5, 0]}
              scale={[3, 0.5, 3]}
              size={50}
              hueStart={0.5}
              hueEnd={0.8}
            />
          </Suspense>
          <Suspense fallback={null}>
            <Logo useEnvStore={useEnvStore} />
          </Suspense>
        </Physics>
      </Canvas>
    </>
  );
};

export default Shirts;
