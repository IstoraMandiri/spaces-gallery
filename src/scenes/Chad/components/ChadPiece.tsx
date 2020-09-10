import React, { Suspense, useRef } from "react";
import { EnvironmentStoreHook } from "stores/environment";
import { Color, Mesh } from "three";
import ChadKnight from "models/ChadKnight";
import { useFrame } from "react-three-fiber";
import { CHAD_COLOR } from "../index";

type ChadKnightProps = {
  useEnvStore: EnvironmentStoreHook;
};

const SCALE = 1.3;

const ChadKnightPieces = (props: ChadKnightProps) => {
  const { useEnvStore } = props;

  const sphere = useRef<Mesh>();

  useFrame(({ clock }) => {
    if (sphere.current) {
      sphere.current.rotation.y = clock.getElapsedTime() / 10;
    }
  });

  return (
    <group>
      <group scale={[SCALE, SCALE, SCALE]}>
        <Suspense fallback={null}>
          <ChadKnight useEnvStore={useEnvStore} color={CHAD_COLOR} />
        </Suspense>
        <mesh ref={sphere} position={[0, 0, 0]}>
          <sphereBufferGeometry attach="geometry" args={[8, 5 * 14, 3 * 14]} />
          <meshLambertMaterial
            attach="material"
            wireframe
            color={CHAD_COLOR}
            emissive={new Color(0x000000)}
            emissiveIntensity={10}
          />
        </mesh>
      </group>
    </group>
  );
};

export default ChadKnightPieces;
