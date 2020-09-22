import React from "react";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";

const IMAGE_SRC = "https://d27rt3a60hh1lx.cloudfront.net/images/benjamin.jpg";

const Present = () => {
  const texture = useLoader(THREE.TextureLoader, IMAGE_SRC);

  return (
    <group>
      <mesh scale={[1, 1, 1]} position={[0, 6, 0]}>
        <sphereBufferGeometry attach="geometry" args={[5, 10, 10]} />
        <meshBasicMaterial map={texture} attach="material" />
      </mesh>
    </group>
  );
};

export default Present;
