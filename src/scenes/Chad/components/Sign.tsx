import React from "react";
import { EnvironmentStoreHook } from "stores/environment";
import { Text } from "drei";

type SignProps = {
  useEnvStore: EnvironmentStoreHook;
  text: string;
} & JSX.IntrinsicElements["group"];

const Sign = (props: SignProps) => {
  const { useEnvStore, text, ...restProps } = props;

  return (
    <group {...restProps}>
      <Text color="black">{text}</Text>
      <mesh position={[0, 0, -0.25 / 2 - 0.001]}>
        <boxBufferGeometry args={[2, 0.6, 0.25]} attach="geometry" />
        <meshStandardMaterial color="white" attach="material" />
      </mesh>
    </group>
  );
};

export default Sign;
