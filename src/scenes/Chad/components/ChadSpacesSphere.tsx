import React, { Suspense, useRef } from "react";

import SpacesSphere from "models/SpacesSphere";

import { EnvironmentStoreHook } from "stores/environment";
import { useFrame } from "react-three-fiber";

type ChadSpacesSphereType = {
  useEnvStore: EnvironmentStoreHook;
};

const RADIUS = 30;
const SPEED = 0.05;

const ChadSpacesSphere = (props: ChadSpacesSphereType) => {
  const { useEnvStore } = props;

  const group = useRef<THREE.Group>();

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * SPEED;
    }
  });

  return (
    <group ref={group}>
      <group position={[0, 1, RADIUS]}>
        <Suspense fallback={null}>
          <SpacesSphere useEnvStore={useEnvStore} />
        </Suspense>
      </group>
    </group>
  );
};

export default ChadSpacesSphere;
