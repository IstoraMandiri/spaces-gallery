import React, { useMemo } from "react";
import { SpotLight } from "three";
import { EnvironmentStoreHook } from "stores/environment";
import { Text } from "drei";
import Logo from "three-components/Logo";

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
      <group
        name="wall"
        rotation={[0, 0, 0]}
        position={[-1, 0.25, -8]}
        scale={[0.7, 0.7, 0.7]}
      >
        <Text scale={[6, 6, 6]} position={[-4, 0, 0]} textAlign="left">
          CHAD KNIGHT
        </Text>
        <Text scale={[4, 4, 4]} position={[-1.6, 0, 0]}>
          x
        </Text>
        <group position={[-2.75, -1.45, 0]}>
          <Text
            scale={[2, 2, 2]}
            anchorY="middle"
            maxWidth={3}
            textAlign="left"
            color="black"
          >
            {
              "Virtual Genesis is about God breathing life into a virtual universe.\
          It's a representation of the first code defined, digitally enabled,\
          virtual volumetric space. It represents the skin or peripheral\
          exoskeleton humans inhabit to enter the virtual world."
            }
          </Text>
          <mesh position={[0, 0, -0.25 / 2 - 0.001]}>
            <boxBufferGeometry args={[7, 2, 0.25]} attach="geometry" />
            <meshStandardMaterial color="white" attach="material" />
          </mesh>
        </group>
        <Logo
          useEnvStore={useEnvStore}
          floating
          rotation={[0, Math.PI / 2, 0]}
        />
      </group>
    </group>
  );
};

export default ChadEntrance;
