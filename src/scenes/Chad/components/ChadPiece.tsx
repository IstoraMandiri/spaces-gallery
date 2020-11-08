import { Suspense, useEffect, useRef, useState } from "react";
import { Color, Mesh } from "three";
import ChadKnight from "scenes/Chad/models/ChadKnight";
import { useFrame } from "react-three-fiber";
import LokLok from "./LokLok";

type ChadKnightProps = {
  isGallery: boolean;
  effects: {
    rotate: boolean;
    lok: boolean;
    color?: boolean;
  };
};

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
    isGallery,
    effects: { rotate, lok, color },
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

  const SCALE = isGallery ? 1.3 : 1.3 * 2;

  return (
    <group>
      <Suspense fallback={null}>
        <ChadKnight color={realColor} pieceScale={SCALE} rotate={rotate} />
      </Suspense>
      {lok ? (
        <group scale={[SCALE, SCALE, SCALE]}>
          <LokLok color={realColor} />
        </group>
      ) : (
        <mesh ref={sphere} position={[0, 0, 0]} scale={[SCALE, SCALE, SCALE]}>
          <sphereBufferGeometry attach="geometry" args={[8, 5 * 14, 3 * 14]} />
          <meshLambertMaterial
            attach="material"
            wireframe
            color={realColor}
            emissive={new Color(0x000000)}
            emissiveIntensity={10}
          />
        </mesh>
      )}
    </group>
  );
};

export default ChadKnightPieces;
