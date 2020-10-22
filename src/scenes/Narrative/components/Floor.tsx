import React from "react";
import { GREEN } from "../assets/Colors";

const Floor = () => {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[2000, 2000]} />
        <meshBasicMaterial attach="material" color={GREEN} />
      </mesh>
    </>
  );
};

export default Floor;
