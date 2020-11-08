import { Suspense, useState } from "react";
import { Sky, Stars } from "@react-three/drei";
import { Color } from "three";
import { Vector3 } from "three";

import { useAnalytics } from "services/analytics";
import ChadGallery from "scenes/Chad/models/ChadGallery";
import ChadPiece from "./components/ChadPiece";
import ChadLighting from "./components/ChadLighting";
import ChadSceneSelector from "./components/ChadSceneSelector";
import PlatformPlatform from "./components/PlatformPlatform";
import ToggleEffect from "scenes/Chad/components/ToggleEffect";
import ChadEntrance from "./components/ChadEntrance";
import Signs from "./components/Signs";
import { StandardEnvironment } from "@spacesvr/core";
import { Audio } from "@spacesvr/components";

export const CHAD_COLOR = new Color(0x28fa92);

export type SCENE_TYPES = "gallery" | "piece";

const Chad = () => {
  const [sceneState, setSceneState] = useState<SCENE_TYPES>("gallery");

  const isGallery = sceneState === "gallery";

  const [rotate, setRotate] = useState(false);
  const [lok, setLok] = useState(false);
  const [time, setTime] = useState(false);
  const [color, setColor] = useState(false);

  const effects = { rotate, lok, time, color };

  useAnalytics();

  return (
    <StandardEnvironment
      disableGround
      canvasProps={{ camera: { far: 150 } }}
      player={{ pos: new Vector3(-2, -3, 62), rot: Math.PI / 2 }}
    >
      {time ? (
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
        <Audio
          url="https://spaces-gallery-assets.s3-us-west-1.amazonaws.com/audio/harris+cole+mix.mp3"
          position={new Vector3(0, 10, 1)}
          volume={10}
          rollOff={0.2}
        />
      </group>
      {sceneState === "gallery" && (
        <>
          <Suspense fallback={null}>
            <ChadGallery />
          </Suspense>
          <ChadEntrance />
          <Signs />
          <ToggleEffect
            position={[25, 4, 1.5]}
            effect={color}
            setEffect={setColor}
            color="blue"
          />
          <ToggleEffect
            position={[-25, 4, 1.5]}
            effect={lok}
            setEffect={setLok}
            color="purple"
          />
          <ToggleEffect
            position={[-25, -4, 1.5]}
            effect={time}
            setEffect={setTime}
            color="white"
          />
          <ToggleEffect
            position={[25, -4, 1.5]}
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
