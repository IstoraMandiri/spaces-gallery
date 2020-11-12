import { Sky } from "@react-three/drei";
import * as THREE from "three";
import { useEnvironment } from "spacesvr/core";
import { COLORS } from "../assets/colors";

const ColoredSky = () => {
  const { portal } = useEnvironment();
  const color = COLORS[Math.abs(portal?.seed) % COLORS.length];

  return (
    <>
      <group scale={[100, 100, 100]}>
        <Sky />
      </group>
      <mesh>
        <sphereBufferGeometry attach="geometry" args={[100, 50, 50]} />
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
