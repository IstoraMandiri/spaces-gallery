import React, { useMemo } from "react";
import { Physics } from "use-cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "three-components/InfinitePlane";
import Logo from "three-components/Logo";
import Player from "core/Player";
import { SceneComponent } from "types/scene";

import Analytics from "ui-components/Analytics";
import Effects from "core/Effects";
import Balloons from "./components/Balloons";
import { Color } from "three";
import Sign from "../Chad/components/Sign";
import Present from "./components/Present";

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

const Ben: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  const seed = useMemo(() => Math.random(), []);

  const ANGLE = seed * Math.PI * 2;
  const DIST = 35;
  const INIT_COORDS: [number, number, number] = [
    DIST * Math.cos(ANGLE),
    1,
    DIST * Math.sin(ANGLE),
  ];

  const SIGN_DIST = 2;
  const SIGN_COORDS: [number, number, number] = [
    (DIST - SIGN_DIST) * Math.cos(ANGLE),
    1,
    (DIST - SIGN_DIST) * Math.sin(ANGLE),
  ];

  return (
    <>
      <Analytics />
      <Canvas
        {...defaultCanvasProps}
        onCreated={({ scene }) => {
          scene.background = new Color(0xe7e7e7);
        }}
      >
        {children}
        <fog attach="fog" args={[0xe7e7e7, 1, 10]} />
        <Physics {...physicsProps}>
          <InfinitePlane height={-0.001} />
          <Player
            useEnvStore={useEnvStore}
            initPos={INIT_COORDS}
            initLook={[INIT_COORDS[0] * -100, 1, INIT_COORDS[2] * -100]}
          />
          <group position={SIGN_COORDS}>
            <Sign text="find ben" rotation={[0, -ANGLE + Math.PI / 2, 0]} />
          </group>
          <Present />
          <Logo
            floating
            rotating
            useEnvStore={useEnvStore}
            position={[0, 1.25, 0]}
          />
          <Balloons useEnvStore={useEnvStore} />
          <ambientLight intensity={1} />
          <pointLight intensity={5} color={"white"} distance={55} />
          <Effects />
        </Physics>
      </Canvas>
    </>
  );
};

export default Ben;
