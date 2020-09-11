import { Text } from "drei";
import React from "react";
import ChadLogo from "../../ChadLogo";
import Logo from "three-components/Logo";
import { EnvironmentStoreHook } from "stores/environment";

const Credits = (props: { useEnvStore: EnvironmentStoreHook }) => {
  const { useEnvStore } = props;

  return (
    <group
      name="wall"
      rotation={[0, Math.PI, 0]}
      position={[-5, 0.5, 6]}
      scale={[2, 2, 2]}
    >
      <Text scale={[6, 6, 6]} position={[-4, -0.7, 0]} textAlign="left">
        CHAD KNIGHT
      </Text>
      <ChadLogo
        useEnvStore={useEnvStore}
        position={[-4, 0.4, -0.2]}
        scale={[0.8, 0.8, 0.8]}
      />
      <Text scale={[3.5, 3.5, 3.5]} position={[-1.6, 0, 0]}>
        x
      </Text>
      <Logo useEnvStore={useEnvStore} floating rotation={[0, Math.PI / 2, 0]} />
    </group>
  );
};

export default Credits;
