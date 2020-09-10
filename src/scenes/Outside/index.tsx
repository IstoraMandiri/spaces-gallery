import React, { Suspense, useMemo, useState } from "react";
import { Physics } from "use-cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "three-components/InfinitePlane";
import Logo from "three-components/Logo";
import Player from "core/Player";
import { SceneComponent } from "types/scene";

import SpacesGallery from "models/SpacesGallery";
import SpacesPlaques from "models/SpacesPlaques";
import Analytics from "ui-components/Analytics";
import RobertRoom from "./components/RobertRoom";
import HDRISky from "three-components/HDRI/HDRISky";
import Effects from "core/Effects";
import ZachRoom from "./components/ZachRoom";
import DennisRoom from "./components/DennisRoom";
import OutsideLighting from "./components/OutsideLighting";
import HectorRoom from "./components/HectorRoom";
import JustinRoom from "./components/JustinRoom";
import OutsideAudio from "./components/OutsideAudio";
import SantiRoom from "./components/SantiRoom";
import { WebGLRenderer } from "three";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  gravity: [0, -30, 0],
  defaultContactMaterial: {
    friction: 0,
    // restitution?: number
    // contactEquationStiffness?: number
    // contactEquationRelaxation?: number
    // frictionEquationStiffness?: number
    // frictionEquationRelaxation?: number
  },
};

const Outside: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  const [renderer, setRenderer] = useState<WebGLRenderer>();

  const initAngle = Math.PI * 0.4;
  const RADIUS = 7;

  return (
    <>
      <Analytics />
      <Canvas
        {...defaultCanvasProps}
        onCreated={(props) => {
          setRenderer(props.gl);
        }}
      >
        {children}
        <Physics {...physicsProps}>
          <HDRISky />
          <InfinitePlane height={-0.001} />
          <Player
            useEnvStore={useEnvStore}
            initPos={[
              Math.cos(initAngle) * RADIUS,
              1,
              Math.sin(initAngle) * RADIUS,
            ]}
            initLook={[
              Math.cos(initAngle) * RADIUS * -100,
              1,
              Math.sin(initAngle) * RADIUS * -100,
            ]}
          />
          <RobertRoom useEnvStore={useEnvStore} />
          <HectorRoom useEnvStore={useEnvStore} />
          <ZachRoom />
          <JustinRoom useEnvStore={useEnvStore} />
          <SantiRoom useEnvStore={useEnvStore} renderer={renderer} />
          <DennisRoom useEnvStore={useEnvStore} />
          <Logo
            floating
            rotating
            useEnvStore={useEnvStore}
            position={[0, 1.25, 0]}
          />
          <OutsideAudio
            url="https://spaces-gallery-assets.s3-us-west-1.amazonaws.com/audio/LucidMondayMix.mp3"
            useEnvStore={useEnvStore}
            position={[0, 0, 0]}
          />
          <OutsideLighting />
          <Suspense fallback={null}>
            <SpacesGallery useEnvStore={useEnvStore} />
          </Suspense>
          <Suspense fallback={null}>
            <SpacesPlaques useEnvStore={useEnvStore} />
          </Suspense>
          <Effects />
        </Physics>
      </Canvas>
    </>
  );
};

export default Outside;
