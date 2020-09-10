import React, { useMemo, Suspense } from "react";
import { SpotLight } from "three";
import { EnvironmentStoreHook } from "stores/environment";
import SpacesSphere from "models/SpacesSphere";
import { Text } from "drei";

const ChadEntrance = (props: { useEnvStore: EnvironmentStoreHook }) => {
  const { useEnvStore } = props;

  const light1 = useMemo(() => new SpotLight(), []);

  const topLight = {
    distance: 20,
    color: 0xffffff,
    intensity: 1.3,
    angle: Math.PI / 2.8,
    penumbra: 0.9,
  };

  return (
    <group position={[-2, -2, 65]}>
      <group position={[-2, 2, -6]}>
        <primitive object={light1} {...topLight} />
        <primitive object={light1.target} position={[0, -100, 0]} />
      </group>
      <group name="wall" rotation={[0, 0, 0]} position={[0, 1, -10.9]}>
        <Text scale={[6, 6, 6]} position={[-4, 0, 0]}>
          CHAD KNIGHT
        </Text>
        <Text scale={[4, 4, 4]} position={[-1.75, 0, 0]}>
          x
        </Text>
        <Suspense fallback={null}>
          <SpacesSphere useEnvStore={useEnvStore} />
        </Suspense>
      </group>
    </group>
  );
};

export default ChadEntrance;
