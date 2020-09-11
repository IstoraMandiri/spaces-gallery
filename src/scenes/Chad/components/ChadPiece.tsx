import React, { Suspense, useEffect, useRef, useState } from "react";
import { EnvironmentStoreHook } from "stores/environment";
import { Color, Mesh } from "three";
import ChadKnight from "models/ChadKnight";
import { useFrame } from "react-three-fiber";
import { CHAD_COLOR, CHAD_COLOR2 } from "../index";

type ChadKnightProps = {
  useEnvStore: EnvironmentStoreHook;
  isGallery: boolean;
  effects: {
    bubble: boolean;
    metal: boolean;
    reflect: boolean;
    color?: boolean;
  };
};

const SCALE = 1.3;

const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "white",
  "#28FA92",
];

const ChadKnightPieces = (props: ChadKnightProps) => {
  const {
    useEnvStore,
    isGallery,
    effects: { bubble, metal, reflect, color },
  } = props;

  const sphere = useRef<Mesh>();

  useFrame(({ clock }) => {
    if (sphere.current) {
      sphere.current.rotation.y = clock.getElapsedTime() / 10;
    }
  });

  const [realColor, setColor] = useState<string>("black");
  useEffect(() => {
    if (realColor === "black") {
      setColor("#28FA92");
    } else {
      setColor(colors[Math.floor(Math.random() * colors.length)]);
    }
  }, [color]);

  return (
    <group>
      <group scale={[SCALE, SCALE, SCALE]}>
        <Suspense fallback={null}>
          <ChadKnight useEnvStore={useEnvStore} color={realColor} />
        </Suspense>
        <mesh ref={sphere} position={[0, 0, 0]}>
          <sphereBufferGeometry attach="geometry" args={[8, 5 * 14, 3 * 14]} />
          <meshLambertMaterial
            attach="material"
            wireframe
            color={realColor}
            emissive={new Color(0x000000)}
            emissiveIntensity={10}
          />
        </mesh>
      </group>
    </group>
  );
};

export default ChadKnightPieces;
