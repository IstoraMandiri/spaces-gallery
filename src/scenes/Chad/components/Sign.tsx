import React from "react";
import { EnvironmentStoreHook } from "stores/environment";
import { Text } from "drei";

type SignProps = {
  useEnvStore: EnvironmentStoreHook;
  text: string;
  signSize?: [number, number, number];
  dark?: boolean;
} & JSX.IntrinsicElements["group"];

const Sign = (props: SignProps) => {
  const {
    useEnvStore,
    text,
    signSize = [2, 0.6, 0.25],
    dark,
    ...restProps
  } = props;

  return (
    <group {...restProps}>
      <Text color={dark ? "white" : "black"}>{text}</Text>
      <mesh position={[0, 0, -0.25 / 2 - 0.001]}>
        <boxBufferGeometry args={signSize} attach="geometry" />
        <meshStandardMaterial
          color={dark ? "black" : "white"}
          attach="material"
        />
      </mesh>
    </group>
  );
};

export default Sign;
