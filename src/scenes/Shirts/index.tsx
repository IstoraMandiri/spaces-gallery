import React, { Suspense, useMemo } from "react";
import { Physics } from "use-cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "three-components/InfinitePlane";
import Player from "core/Player";
import { SceneComponent } from "types/scene";
import ShirtsMusic from "./components/ShirtsMusic";
import ShirtsPiece from "./components/ShirtsPiece";
import ShirtsFloor from "./components/ShirtsFloor";
import axios from "axios";


import {
  // CameraHelper,
  DirectionalLight,
  // DirectionalLightHelper,
  SpotLight,
} from "three";

import { getAudioAnalyserStore } from "stores/audio";

import Analytics from "ui-components/Analytics";
import HDRISky from "three-components/HDRI/HDRISky";
import { Sky } from "drei";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  gravity: [0, -30, 0],
  defaultContactMaterial: {
    friction: 0,
  },
};

const Multiplayer: SceneComponent = (props) => {
  const [responseData, setResponseData] = React.useState("");

  React.useEffect(() => {
    const API_URL =
      "https://27m2mbw4h0.execute-api.us-west-1.amazonaws.com/fetch";
    axios
      .post(API_URL, { id: window.location.pathname.substring(8) })
      .then((res) => {
        console.log("res", res.data);
        console.log("window", window.location.pathname);
        setResponseData(res.data);
      });
  }, [setResponseData]);

  const { useEnvStore, defaultCanvasProps, children } = props;

  const light = useMemo(() => new SpotLight(), []);
  const lightArgs = {
    distance: 12,
    color: 0x57a4a9,
    intensity: 8,
    angle: Math.PI / 2.4,
    penumbra: 0.5,
  };

  const sun = useMemo(() => new DirectionalLight(0xde00ff), []);
  // const shadowHelper = useMemo(() => new CameraHelper(sun.shadow.camera), []);
  //Set up shadow properties for the light
  sun.shadow.camera.scale.set(4, 4, 4);
  // sun.shadow.camera.near = 0.5;    // default
  sun.shadow.mapSize.width = 2048;
  sun.shadow.mapSize.height = 2048;

  const [useAAStore] = getAudioAnalyserStore(() => ({}));
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
          <group position={[-4, 8, 5]}>
            <primitive castShadow object={light} {...lightArgs} />
            <primitive object={light.target} position={[-1, -1, -1]} />
            {/* <primitive object={shadowHelper} /> */}
            <primitive object={sun} position={[10, 10, 10]} castShadow />
          </group>
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
          </group>
          <Suspense fallback={null}>
            <ShirtsPiece
              useEnvStore={useEnvStore}
              useAAStore={useAAStore}
              json={responseData}
            />
          </Suspense>
        </Physics>
      </Canvas>
    </>
  );
};

export default Multiplayer;
