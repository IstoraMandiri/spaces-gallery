import React, { useRef } from "react";
import { ModelProps } from "../../../types/model";
import { UseStore } from "zustand";
import { useFrame } from "react-three-fiber";

type PrismProps = {
  useEnvStore: UseStore<any>;
  scale?: [number, number, number];
  position: [number, number, number];
  color: string;
};
const Prism = (props: PrismProps) => {
  const { useEnvStore, scale = [1, 1, 1], position, color } = props;
  const group = useRef();

  return (
    <>
      <group ref={group} position={position}>
        <mesh castShadow>
          <boxBufferGeometry attach="geometry" args={scale} />
          <meshStandardMaterial attach="material" color={color} />
        </mesh>
      </group>
    </>
  );
};

export default Prism;
