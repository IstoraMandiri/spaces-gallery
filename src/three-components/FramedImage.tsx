import React from "react";
import * as THREE from "three";
import { useLoader } from "react-three-fiber";
import { Vector2 } from "three";

type FramedImageProps = JSX.IntrinsicElements["group"] & {
  src: string;
  ratio: [number, number];
  sizeScale: number;
  frameless?: boolean;
};

const frameWidth = 0.3;
const frameDepth = 0.1;
const meshOffset = 0.0005;

const FramedImage = (props: FramedImageProps) => {
  const { src, sizeScale, ratio, frameless = false } = props;

  const texture = useLoader(THREE.TextureLoader, src);

  // sizing
  const normalizedRatio = new Vector2(ratio[0], ratio[1]).normalize();
  const width = normalizedRatio.x * sizeScale;
  const height = normalizedRatio.y * sizeScale;

  return (
    <group {...props}>
      <mesh>
        <planeBufferGeometry attach="geometry" args={[width, height]} />
        <meshStandardMaterial attach="material" map={texture} />
      </mesh>
      {!frameless && (
        <mesh position={[0, 0, -0.1 - meshOffset]}>
          <boxBufferGeometry
            attach="geometry"
            args={[width + frameWidth, height + frameWidth, frameDepth]}
          />
          <meshStandardMaterial attach="material" color="#4a4a4a" />
        </mesh>
      )}
    </group>
  );
};

export default FramedImage;
