import React from "react";
import { Sky } from "drei";
import * as THREE from "three";
import { Color } from "three";

type ColoredSkyProps = {
  color: Color | number | string;
};

const ColoredSky = (props: ColoredSkyProps) => {
  const { color } = props;
  return (
    <>
      <Sky />
      <mesh>
        <sphereBufferGeometry attach="geometry" args={[70, 50, 50]} />
        <meshStandardMaterial
          attach="material"
          color={color}
          transparent
          opacity={0.68}
          side={THREE.DoubleSide}
          blending={THREE.SubtractiveBlending}
        />
      </mesh>
    </>
  );
};

export default ColoredSky;
