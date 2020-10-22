import React from "react";
import { GRAY, YELLOW } from "../assets/Colors";

type RoadProps = JSX.IntrinsicElements["group"];

const Road = (props: RoadProps) => {
  return (
    <group {...props}>
      <mesh position-y={0.001}>
        <boxBufferGeometry attach="geometry" args={[4, 0.001, 400]} />
        <meshBasicMaterial attach="material" color={GRAY} />
      </mesh>
      <mesh position-y={0.002}>
        <boxBufferGeometry attach="geometry" args={[0.2, 0.001, 400]} />
        <meshBasicMaterial attach="material" color={YELLOW} />
      </mesh>
    </group>
  );
};

export default Road;
