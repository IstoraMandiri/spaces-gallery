import React, { Suspense, useRef, useState } from "react";
import { Physics } from "use-cannon";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import InfinitePlane from "three-components/InfinitePlane";
import ShirtsPlayer from "core/ShirtsPlayer";
import { SceneProps } from "types/scene";
import ShirtsMusic from "./components/ShirtsMusic";
import ShirtsAssets from "./components/ShirtsAssets";
import ShirtsFloor from "./components/ShirtsFloor";
import ShirtsCollisions from "./components/ShirtsCollisions";

import { getMusicStore } from "stores/music";
import Analytics from "ui-components/Analytics";
import ShirtsLighting from "./components/ShirtsLighting";
import Logo from "three-components/Logo";
import ColoredSky from "./components/ColoredSky";
import WallPiece from "./components/WallPiece";
import SHIRT_SONGS from "./assets/songs";
import { getSong, MusicManager } from "./services/musicManager";
import Credits from "./components/Credits";

const physicsProps = {
  iterations: 20,
  size: 300,
  gravity: [0, -30, 0],
  allowSleep: false,
  defaultContactMaterial: {
    friction: 0,
  },
};

type ShirtsSceneProps = SceneProps & {
  portal: Portal | undefined;
  fixedPath: boolean;
};
export type ShirtsSceneComponent = React.ComponentType<ShirtsSceneProps>;

const Shirts: ShirtsSceneComponent = (props) => {
  const {
    useEnvStore,
    defaultCanvasProps,
    portal,
    fixedPath,
    children,
  } = props;

  const id = window.location.pathname.substring(8);
  const song = getSong(id, SHIRT_SONGS);
  const [useMusicStore] = getMusicStore(() => ({ song, eventIndex: 0 }));

  const name = (portal && portal.firstName) || "❤";

  return (
    <>
      <Analytics />
      <Credits
        useMusicStore={useMusicStore}
        name={name}
        useEnvStore={useEnvStore}
      />
      <Canvas {...defaultCanvasProps}>
        {children}
        <MusicManager useMusicStore={useMusicStore} />
        <Physics {...physicsProps}>
          <ColoredSky />
          <InfinitePlane height={-0.001} />
          <ShirtsPlayer
            useEnvStore={useEnvStore}
            initPos={[0, 2, 53]}
            fixedPath={fixedPath}
          />
          <ambientLight intensity={0.2} />
          <ShirtsLighting />
          <group position={[0, 0, 23]}>
            <ShirtsMusic
              useEnvStore={useEnvStore}
              useMusicStore={useMusicStore}
              url={song.url}
            />
          </group>
          <Suspense fallback={null}>
            <WallPiece
              useEnvStore={useEnvStore}
              useMusicStore={useMusicStore}
            />
            <ShirtsAssets
              useEnvStore={useEnvStore}
              useMusicStore={useMusicStore}
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
            <ShirtsCollisions position={[0, 0, 0]} />
          </Suspense>
          <Suspense fallback={null}>
            <group position={[15, 0.75, 15]}>
              <Logo useEnvStore={useEnvStore} rotating={true} />
            </group>
          </Suspense>
        </Physics>
      </Canvas>
    </>
  );
};

export default Shirts;
