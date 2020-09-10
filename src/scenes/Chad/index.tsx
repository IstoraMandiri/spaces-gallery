import React, { Suspense, useCallback, useRef, useState } from "react";
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
import { Stars } from "drei";
import { Color } from "three";
import ToggleEffect from "../../three-components/ToggleEffect";
import { Raycaster, Vector3 } from "three";
import TextCanvas from "../../three-components/TextCanvas";
import ChadMusic from "./components/ChadMusic";
import Sign from "./components/Sign";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  defaultContactMaterial: {
    friction: 0,
  },
};

export const CHAD_COLOR = new Color(0x28fa92);
export const CHAD_COLOR2 = 0x28fa92;

type SCENE_TYPES = "gallery" | "falling" | "piece" | "ending";

const Chad: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  const [sceneState, setSceneState] = useState<SCENE_TYPES>("gallery");

  const isGallery = sceneState === "gallery" || sceneState === "ending";
  const PIECE_SCALE = isGallery ? 1 : 1.75;

  const [wireframe, setWireframe] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [metal, setMetal] = useState(false);
  const [reflect, setReflect] = useState(false);
  const [color, setColor] = useState(false);

  const effects = {
    wireframe: wireframe,
    bubble: bubble,
    metal: metal,
    reflect: reflect,
    color: color,
  };

  const onFrame = useCallback(
    (bodyApi: any) => {
      if (sceneState === "falling") {
        bodyApi.position.set(0, 90, 0);
        bodyApi.velocity.set(0, -0.1, 0);
        setTimeout(() => setSceneState("piece"), 100);
      }

      if (sceneState === "ending") {
        bodyApi.position.set(0, 90, 30);
        bodyApi.velocity.set(0, -0.1, 0);
        setTimeout(() => setSceneState("gallery"), 100);
      }
    },
    [sceneState]
  );

  const raycaster = useRef(new Raycaster(new Vector3(), new Vector3(), 0, 2));

  return (
    <>
      <Analytics />
      <Canvas {...defaultCanvasProps} camera={{ far: 150 }}>
        {children}
        <Stars radius={30} depth={50} count={1000} factor={2} fade />
        <Physics {...physicsProps}>
          {/* @ts-ignore */}
          <Player
            useEnvStore={useEnvStore}
            initPos={[0, 1, 30]}
            onFrame={onFrame}
            raycaster={raycaster}
          />
          <ChadLighting />
          <ChadSceneSelector
            useEnvStore={useEnvStore}
            sceneState={sceneState}
            setSceneState={setSceneState}
          />
          <group scale={[PIECE_SCALE, PIECE_SCALE, PIECE_SCALE]}>
            <ChadPiece useEnvStore={useEnvStore} effects={effects} />
          </group>
          <group position={[0, 0, 23]}>
            <ChadMusic
              useEnvStore={useEnvStore}
              url="https://spaces-gallery-assets.s3-us-west-1.amazonaws.com/audio/harris+cole+mix.mp3"
            />
          </group>
          <Effects />
          {sceneState === "gallery" && (
            <>
              <Suspense fallback={null}>
                <ChadGallery useEnvStore={useEnvStore} />
              </Suspense>
              <ChadSpacesSphere useEnvStore={useEnvStore} />
              <Sign
                useEnvStore={useEnvStore}
                text="Take the Leap into Virtual Genesis"
                position={[-2.5, 1, 23.75]}
              />
              <Sign
                useEnvStore={useEnvStore}
                text="Take the Leap into Virtual Genesis"
                position={[2.5, 1, -23.75]}
                rotation={[0, Math.PI, 0]}
              />
              <ToggleEffect
                position={[1.5, 0, 25]}
                raycaster={raycaster}
                effect={color}
                setEffect={setColor}
                color="red"
              />
              <ToggleEffect
                position={[25, 4, 1.5]}
                raycaster={raycaster}
                effect={metal}
                setEffect={setMetal}
                color="blue"
              />
              <ToggleEffect
                position={[1.5, 0, -25]}
                raycaster={raycaster}
                effect={bubble}
                setEffect={setBubble}
                color="green"
              />
              <ToggleEffect
                position={[-25, 4, 1.5]}
                raycaster={raycaster}
                effect={reflect}
                setEffect={setReflect}
                color="purple"
              />
              <ToggleEffect
                position={[-25, -4, 1.5]}
                raycaster={raycaster}
                effect={bubble}
                setEffect={setBubble}
                color="pink"
              />
              <ToggleEffect
                position={[25, -4, 1.5]}
                raycaster={raycaster}
                effect={bubble}
                setEffect={setBubble}
                color="orange"
              />
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
