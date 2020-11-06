import React, { Suspense, useCallback, useRef, useState } from "react";
import { Sky, Stars } from "@react-three/drei";
import { Color } from "three";
import { Raycaster, Vector3 } from "three";

import { useAnalytics } from "services/analytics";
import RealisticEffects from "@spacesvr/core/effects/RealisticEffects";
import ChadGallery from "scenes/Chad/models/ChadGallery";
import ChadPiece from "./components/ChadPiece";
import ChadLighting from "./components/ChadLighting";
import ChadSceneSelector from "./components/ChadSceneSelector";
import PlatformPlatform from "./components/PlatformPlatform";
import Player from "@spacesvr/core/players/Player";
import ToggleEffect from "scenes/Chad/components/ToggleEffect";
import ChadMusic from "./components/ChadMusic";
import ChadEntrance from "./components/ChadEntrance";
import Signs from "./components/Signs";
import StandardEnvironment from "@spacesvr/core/environments/StandardEnvironments";

export const CHAD_COLOR = new Color(0x28fa92);
export const CHAD_COLOR2 = 0x28fa92;

type SCENE_TYPES = "gallery" | "falling" | "piece" | "ending";

const Chad = () => {
  const [sceneState, setSceneState] = useState<SCENE_TYPES>("gallery");

  const isGallery = sceneState === "gallery" || sceneState === "ending";

  const [lockControls, setLockControls] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [lok, setLok] = useState(false);
  const [time, setTime] = useState(false);
  const [color, setColor] = useState(false);

  const effects = { bubble, rotate, lok, time, color };

  useAnalytics();

  const onFrame = useCallback(
    (bodyApi: any) => {
      if (sceneState === "falling") {
        setLockControls(true);
        bodyApi.position.set(0, 90, 0);
        bodyApi.velocity.set(0, -0.1, 0);
        setTimeout(() => setSceneState("piece"), 100);
        setTimeout(() => setLockControls(false), 2000);
      }

      if (sceneState === "ending") {
        bodyApi.position.set(0, 90, 30);
        bodyApi.velocity.set(0, -0.1, 0);
        setTimeout(() => setSceneState("gallery"), 100);
      }
    },
    [sceneState]
  );

  /*
    <Player
        initPos={[-2, -3, 62]}
        initLook={[-2, -3, -100]}
        onFrame={onFrame}
        raycaster={raycaster}
        lockControls={lockControls}
      />
   */

  const raycaster = useRef(new Raycaster(new Vector3(), new Vector3(), 0, 3));

  return (
    <StandardEnvironment canvasProps={{ camera: { far: 150 } }}>
      {time ? (
        // @ts-ignore
        <Sky distance={60000} />
      ) : (
        <Stars radius={30} depth={50} count={1000} factor={2} fade />
      )}
      <ChadLighting time={time} />
      <ChadSceneSelector
        sceneState={sceneState}
        setSceneState={setSceneState}
      />
      <ChadPiece isGallery={isGallery} effects={effects} />
      <group position={[0, 0, 23]}>
        <ChadMusic url="https://spaces-gallery-assets.s3-us-west-1.amazonaws.com/audio/harris+cole+mix.mp3" />
      </group>
      <RealisticEffects />
      {sceneState === "gallery" && (
        <>
          <Suspense fallback={null}>
            <ChadGallery />
          </Suspense>
          <ChadEntrance raycaster={raycaster} />
          <Signs />
          <ToggleEffect
            position={[25, 4, 1.5]}
            raycaster={raycaster}
            effect={color}
            setEffect={setColor}
            color="blue"
          />
          <ToggleEffect
            position={[-25, 4, 1.5]}
            raycaster={raycaster}
            effect={lok}
            setEffect={setLok}
            color="purple"
          />
          <ToggleEffect
            position={[-25, -4, 1.5]}
            raycaster={raycaster}
            effect={time}
            setEffect={setTime}
            color="white"
          />
          <ToggleEffect
            position={[25, -4, 1.5]}
            raycaster={raycaster}
            effect={rotate}
            setEffect={setRotate}
            color="red"
          />
        </>
      )}
      {sceneState === "piece" && (
        <>
          <PlatformPlatform />
        </>
      )}
    </StandardEnvironment>
  );
};

export default Chad;
