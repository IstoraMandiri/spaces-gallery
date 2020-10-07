import React from "react";
import { PINK } from "./Colors";

const Sun = () => {
  return (
    <group>
      <mesh position={[160, 20, -200]}>
        <sphereBufferGeometry attach="geometry" args={[20, 50, 50]} />
        <meshBasicMaterial attach="material" color={PINK} />
      </mesh>
    </group>
  );
};

export default Sun;
