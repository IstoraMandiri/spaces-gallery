import React, { Suspense, useMemo, useState } from "react";
import { Physics } from "@react-three/cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "@spacesvr/components/InfinitePlane";
import Logo from "@spacesvr/components/Logo";
import Player from "@spacesvr/core/players/Player";
import { SceneComponent } from "@spacesvr/core/types/scene";

import SpacesGallery from "scenes/Opening/models/SpacesGallery";
import SpacesPlaques from "scenes/Opening/models/SpacesPlaques";
import { useAnalytics } from "services/analytics";
import RobertRoom from "./components/rooms/RobertRoom";
import HDRI from "@spacesvr/components/HDRI";
import RealisticEffects from "@spacesvr/core/effects/RealisticEffects";
import ZachRoom from "./components/rooms/ZachRoom";
import DennisRoom from "./components/rooms/DennisRoom";
import OutsideLighting from "./components/rooms/OutsideLighting";
import HectorRoom from "./components/rooms/HectorRoom";
import JustinRoom from "./components/rooms/JustinRoom";
import OutsideAudio from "./components/rooms/OutsideAudio";
import SantiRoom from "./components/rooms/SantiRoom";
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

const Opening: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  const [renderer, setRenderer] = useState<WebGLRenderer>();

  const initAngle = Math.PI * 0.4;
  const RADIUS = 7;

  useAnalytics();

  return (
    <Canvas
      {...defaultCanvasProps}
      onCreated={(props) => {
        setRenderer(props.gl);
      }}
    >
      {children}
      <Physics {...physicsProps}>
        <HDRI src="https://d27rt3a60hh1lx.cloudfront.net/images/hdriuno.hdr" />
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
        <RealisticEffects />
      </Physics>
    </Canvas>
  );
};

export default Opening;
