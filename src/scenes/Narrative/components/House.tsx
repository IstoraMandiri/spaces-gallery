import React from "react";

import { PINK, GRAY } from "./Colors";

const House = () => {
  return (
    <group>
      <mesh name="main-body">
        <boxBufferGeometry attach="geometry" args={[3.5, 8, 10]} />
        <meshBasicMaterial attach="material" color={GRAY} />
      </mesh>
      <group scale={[1, 0.7, 1]} position-y={4} name="roof">
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxBufferGeometry
            attach="geometry"
            args={[3.5 / Math.sqrt(2), 3.5 / Math.sqrt(2), 10]}
          />
          <meshBasicMaterial attach="material" color={GRAY} />
        </mesh>
      </group>
      <group scale={[1, 0.701, 1]} position-y={4} name="roof-insert">
        <mesh rotation-z={Math.PI / 4}>
          <boxBufferGeometry
            attach="geometry"
            args={[3.5 / Math.sqrt(2), 3.5 / Math.sqrt(2), 9.5]}
          />
          <meshBasicMaterial attach="material" color={PINK} />
        </mesh>
      </group>
      <group position={[3.5 / 2 + 0.001, 3, 3.4]} name="window">
        <mesh rotation-y={Math.PI / 2}>
          <planeBufferGeometry attach="geometry" args={[0.7, 0.7]} />
          <meshBasicMaterial attach="material" color={PINK} />
        </mesh>
        <group name="shutters" position-x={0.001}>
          <mesh rotation={[-0.092, Math.PI / 2, 0]} position-y={0.198}>
            <planeBufferGeometry attach="geometry" args={[1, 0.04]} />
            <meshBasicMaterial attach="material" color={GRAY} />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]} position-y={0.054}>
            <planeBufferGeometry attach="geometry" args={[1, 0.04]} />
            <meshBasicMaterial attach="material" color={GRAY} />
          </mesh>
          <mesh rotation={[-0.074, Math.PI / 2, 0]} position-y={-0.2084}>
            <planeBufferGeometry attach="geometry" args={[1, 0.04]} />
            <meshBasicMaterial attach="material" color={GRAY} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default House;
