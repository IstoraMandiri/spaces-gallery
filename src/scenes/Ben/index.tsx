import React, { useMemo } from "react";
import InfinitePlane from "@spacesvr/components/InfinitePlane";
import Logo from "@spacesvr/components/Logo";

import { useAnalytics } from "services/analytics";
import RealisticEffects from "@spacesvr/core/effects/RealisticEffects";
import Balloons from "./components/Balloons";
import { Color, Vector3 } from "three";
import Sign from "../Chad/components/Sign";
import Present from "./components/Present";
import StandardEnvironment from "@spacesvr/core/environments/StandardEnvironment";

const Ben = () => {
  useAnalytics();

  const seed = useMemo(() => Math.random(), []);

  const ANGLE = seed * Math.PI * 2;
  const DIST = 35;
  const INIT_COORDS = new Vector3(
    DIST * Math.cos(ANGLE),
    1,
    DIST * Math.sin(ANGLE)
  );

  const SIGN_DIST = 2;
  const SIGN_COORDS: [number, number, number] = [
    (DIST - SIGN_DIST) * Math.cos(ANGLE),
    1,
    (DIST - SIGN_DIST) * Math.sin(ANGLE),
  ];

  return (
    <StandardEnvironment
      canvasProps={{
        onCreated: ({ scene }) => {
          scene.background = new Color(0xe7e7e7);
        },
      }}
      player={{ pos: INIT_COORDS, rot: ANGLE + Math.PI }}
    >
      <fog attach="fog" args={[0xe7e7e7, 1, 10]} />
      <InfinitePlane height={-0.001} />
      <group position={SIGN_COORDS}>
        <Sign text="find ben" rotation={[0, -ANGLE + Math.PI / 2, 0]} />
      </group>
      <Present />
      <Logo floating rotating position={[0, 1.25, 0]} />
      <Balloons />
      <ambientLight intensity={1} />
      <pointLight intensity={5} color={"white"} distance={55} />
    </StandardEnvironment>
  );
};

export default Ben;
