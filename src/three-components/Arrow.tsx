import React from "react";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";

type ArrowProps = JSX.IntrinsicElements["group"];

const IMAGE_SRC = "https://d27rt3a60hh1lx.cloudfront.net/images/whiteArrow.png";

const Arrow = (props: ArrowProps) => {
  const { ...restProps } = props;

  const texture = useLoader(THREE.TextureLoader, IMAGE_SRC);

  return (
    <group {...restProps}>
      <mesh scale={[0.004, 0.004, 0.004]}>
        <planeBufferGeometry attach="geometry" args={[98, 51]} />
        <meshStandardMaterial
          map={texture}
          attach="material"
          alphaTest={0.5}
          transparent={true}
          normalMap={texture}
        />
      </mesh>
    </group>
  );
};

export default Arrow;
