import React from "react";
import { Sky } from "drei";
import * as THREE from "three";

const ColoredSky = () => {
  return (
    <>
      <Sky />
      <mesh>
        <sphereBufferGeometry attach="geometry" args={[70, 50, 50]} />
        <meshStandardMaterial
          attach="material"
          color="green"
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
