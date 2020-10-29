import React, { Suspense } from "react";
import { Physics } from "@react-three/cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "@spacesvr/components/InfinitePlane";
import ShirtsPlayer from "@spacesvr/core/players/ShirtsPlayer";
import { SceneProps } from "@spacesvr/core/types/scene";
import ShirtsMusic from "./components/ShirtsMusic";
import ShirtsAssets from "./components/ShirtsAssets";
import ShirtsFloor from "./components/ShirtsFloor";
import FloatingProfilePic from "./components/FloatingProfilePic";

import { getMusicStore } from "scenes/Shirts/stores/music";
import { useAnalytics } from "services/analytics";
import ShirtsLighting from "./components/ShirtsLighting";
import Logo from "@spacesvr/components/Logo";
import ColoredSky from "./components/ColoredSky";
import WallPiece from "./components/WallPiece";
import ShirtsEffects from "./components/ShirtsEffects";
import SHIRT_SONGS from "./assets/songs";
import { getSong, MusicManager } from "./services/musicManager";
import Credits from "./components/Credits";
import { useRouter } from "next/router";
import { COLORS } from "./assets/colors";

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

  useAnalytics();

  const router = useRouter();
  const { id } = router.query;

  const song = getSong(id as string, SHIRT_SONGS);
  const useMusicStore = getMusicStore(() => ({ song, eventIndex: 0 }));

  const name = (portal && portal.firstName) || "❤";
  const randomColor = COLORS[Math.abs(portal?.seed) % COLORS.length];

  if (!portal) {
    return <></>;
  }

  return (
    <>
      <Credits
        useMusicStore={useMusicStore}
        name={name}
        useEnvStore={useEnvStore}
      />
      <Canvas {...defaultCanvasProps}>
        {children}
        <MusicManager useMusicStore={useMusicStore} />
        <Physics {...physicsProps}>
          <ColoredSky color={randomColor} />
          <InfinitePlane height={-0.001} />
          <ShirtsPlayer
            useEnvStore={useEnvStore}
            initPos={[0, 2, 53]}
            fixedPath={fixedPath}
          />
          <ambientLight intensity={0.2} />
          <ShirtsLighting color={randomColor} />
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
            <FloatingProfilePic
              src={portal?.instagram?.profile_pic_url_hd}
              useMusicStore={useMusicStore}
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
            <group position={[15, 0.75, 15]}>
              <Logo rotating={true} />
            </group>
          </Suspense>
          <ShirtsEffects useMusicStore={useMusicStore} />
        </Physics>
      </Canvas>
    </>
  );
};

export default Shirts;
