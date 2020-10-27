import React, { useRef } from "react";
import { ModelProps } from "../../../core/types/model";
import { UseStore } from "zustand";
import { useFrame } from "react-three-fiber";

type PrismProps = {
  scale?: [number, number, number];
  position: [number, number, number];
  color: string;
};
const Prism = (props: PrismProps) => {
  const { scale = [1, 1, 1], position, color } = props;
  const group = useRef();
  const newPosition = position;

  if (position[0] < 5.5 && position[2] < 6) {
    newPosition[1] += 7;
  }

  return (
    <>
      <group ref={group} position={newPosition}>
        <mesh castShadow receiveShadow>
          <boxBufferGeometry attach="geometry" args={scale} />
          <meshStandardMaterial attach="material" color={color} />
        </mesh>
      </group>
    </>
  );
};

export default Prism;
