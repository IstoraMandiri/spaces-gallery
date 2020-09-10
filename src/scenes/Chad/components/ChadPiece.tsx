import React, { Suspense, useRef } from "react";
import { EnvironmentStoreHook } from "stores/environment";
import { Color, Mesh } from "three";
import ChadKnight from "models/ChadKnight";
import { useFrame } from "react-three-fiber";

type ChadKnightProps = {
  useEnvStore: EnvironmentStoreHook;
  effects: {
    wireframe: boolean;
    bubble: boolean;
    metal: boolean;
    reflect: boolean;
  };
};

const SCALE = 1.3;
const COLOR = new Color(0x56e0af);

const ChadKnightPieces = (props: ChadKnightProps) => {
  const { useEnvStore, effects } = props;

  const sphere = useRef<Mesh>();
  // console.log(effects)

  useFrame(({ clock }) => {
    if (sphere.current) {
      sphere.current.rotation.y = clock.getElapsedTime() / 10;
    }
  });

  return (
    <group>
      <group scale={[SCALE, SCALE, SCALE]}>
        <Suspense fallback={null}>
          <ChadKnight useEnvStore={useEnvStore} color={COLOR} />
        </Suspense>
        <mesh ref={sphere} position={[0, 0, 0]}>
          <sphereBufferGeometry attach="geometry" args={[8, 5 * 14, 3 * 14]} />
          <meshStandardMaterial attach="material" wireframe color={COLOR} />
        </mesh>
      </group>
    </group>
  );
};

export default ChadKnightPieces;
