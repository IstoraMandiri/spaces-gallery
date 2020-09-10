import React, { Suspense, useCallback, useState } from "react";
import { Physics } from "use-cannon";
import { Canvas } from "react-three-fiber";
import Player from "core/Player";
import { SceneComponent } from "types/scene";

import Analytics from "ui-components/Analytics";
import Effects from "core/Effects";
import ChadGallery from "models/ChadGallery";
import ChadPiece from "./components/ChadPiece";
import ChadSpacesSphere from "./components/ChadSpacesSphere";
import ChadLighting from "./components/ChadLighting";
import ChadSceneSelector from "./components/ChadSceneSelector";
import PlatformPlatform from "./components/PlatformPlatform";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  defaultContactMaterial: {
    friction: 0,
  },
};

const Chad: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  const [sceneState, setSceneState] = useState<
    "gallery" | "falling" | "piece" | "ending"
  >("gallery");

  const isGallery = sceneState === "gallery" || sceneState === "ending";
  const PIECE_SCALE = isGallery ? 1 : 1.75;
  const SUN_POS = isGallery ? [0.5, 0.5, 0] : [0, -1, 0];

  const onFrame = useCallback(
    (bodyApi: any) => {
      if (sceneState === "falling") {
        bodyApi.position.set(0, 150, 0);
        setTimeout(() => setSceneState("piece"), 150);
      }

      if (sceneState === "ending") {
        bodyApi.position.set(0, 150, 30);
        setTimeout(() => setSceneState("gallery"), 150);
      }
    },
    [sceneState]
  );

  return (
    <>
      <Analytics />
      <Canvas {...defaultCanvasProps}>
        {children}
        <Physics {...physicsProps}>
          {/* @ts-ignore */}
          <Player
            useEnvStore={useEnvStore}
            initPos={[0, 1, 30]}
            onFrame={onFrame}
          />
          <ChadLighting isGallery={isGallery} />
          <ChadSceneSelector
            useEnvStore={useEnvStore}
            sceneState={sceneState}
            setSceneState={setSceneState}
          />
          <group scale={[PIECE_SCALE, PIECE_SCALE, PIECE_SCALE]}>
            <ChadPiece useEnvStore={useEnvStore} />
          </group>
          <Effects />
          {sceneState === "gallery" && (
            <>
              <Suspense fallback={null}>
                <ChadGallery useEnvStore={useEnvStore} />
              </Suspense>
              <ChadSpacesSphere useEnvStore={useEnvStore} />
            </>
          )}
          {sceneState === "piece" && (
            <>
              <PlatformPlatform />
            </>
          )}
        </Physics>
      </Canvas>
    </>
  );
};

export default Chad;
