import Arrow from "three-components/Arrow";
import { Text } from "drei";
import React from "react";

type LevelSignProps = {
  text: string;
  dir: "up" | "down";
} & JSX.IntrinsicElements["group"];

const LevelSign = (props: LevelSignProps) => {
  const { text, dir, ...restProps } = props;

  const arrowRot = dir === "up" ? -Math.PI / 2 : Math.PI / 2;

  return (
    <group {...restProps}>
      <group>
        <Arrow
          dark
          rotation={[0, 0, arrowRot]}
          scale={[1.4, 1.4, 1.4]}
          position={[-0.5, 0, 0]}
        />
        <Text
          fontSize={0.3}
          position={[-0.2, 0, 0]}
          lineHeight={1}
          color="black"
          anchorX="left"
        >
          {text}
        </Text>
        <mesh position={[0, 0, -0.2 / 2 - 0.001]}>
          <boxBufferGeometry args={[1.6, 1, 0.2]} attach="geometry" />
          <meshStandardMaterial attach="material" />
        </mesh>
      </group>
    </group>
  );
};

export default LevelSign;
