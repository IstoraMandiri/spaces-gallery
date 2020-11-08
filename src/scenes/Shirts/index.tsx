import { Suspense } from "react";
import ShirtsAssets from "./components/ShirtsAssets";
import ShirtsFloor from "./components/ShirtsFloor";
import FloatingProfilePic from "./components/FloatingProfilePic";

import { getMusicStore } from "scenes/Shirts/stores/music";
import { useAnalytics } from "services/analytics";
import ShirtsLighting from "./components/ShirtsLighting";
import ColoredSky from "./components/ColoredSky";
import WallPiece from "./components/WallPiece";
import ShirtsEffects from "./components/ShirtsEffects";
import SHIRT_SONGS from "./assets/songs";
import { getSong, MusicManager } from "./services/musicManager";
import { useRouter } from "next/router";
import { Logo, InfinitePlane } from "@spacesvr/components";
import { PortalEnvironment } from "@spacesvr/core/";
import Credits from "./components/Credits";
import { buildShirtPortal } from "./services/shirtPortal";
import ShirtsMusic from "./components/ShirtsMusic";

const Shirts = () => {
  useAnalytics();

  const router = useRouter();
  const { id } = router.query;
  const song = getSong(id as string, SHIRT_SONGS);
  const useMusicStore = getMusicStore(() => ({ song }));

  return (
    <PortalEnvironment
      portalHandler={buildShirtPortal}
      children2d={<Credits useMusicStore={useMusicStore} />}
    >
      <MusicManager useMusicStore={useMusicStore} />
      <ColoredSky />
      <InfinitePlane height={-0.001} />
      <ambientLight intensity={0.2} />
      <ShirtsLighting />
      <group position={[0, 0, 23]}>
        <ShirtsMusic useMusicStore={useMusicStore} url={song.url} />
      </group>
      <Suspense fallback={null}>
        <WallPiece useMusicStore={useMusicStore} />
        <ShirtsAssets useMusicStore={useMusicStore} />
        <FloatingProfilePic useMusicStore={useMusicStore} />
        <ShirtsFloor
          position={[0, -2.5, 0]}
          scale={[3, 0.5, 3]}
          size={50}
          hueStart={0.5}
          hueEnd={0.8}
        />
      </Suspense>
      <Suspense fallback={null}>
        <group position={[15, 0.75, 15]}>
          <Logo rotating />
        </group>
      </Suspense>
      <ShirtsEffects useMusicStore={useMusicStore} />
    </PortalEnvironment>
  );
};

export default Shirts;
