import { useMemo, useRef } from "react";
import { Color } from "three";
import * as THREE from "three";

const Grid = (props: JSX.IntrinsicElements["group"]) => {
  return (
    <group {...props}>
      <mesh rotation-x={-Math.PI / 2}>
        <planeBufferGeometry
          attach="geometry"
          args={[1000, 1000, 1000 / 2, 1000 / 2]}
        />
        <meshLambertMaterial
          attach="material"
          wireframe
          color={0x0000ff}
          emissive={new Color(0x000000)}
          emissiveIntensity={10}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default Grid;
