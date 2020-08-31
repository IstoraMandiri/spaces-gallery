import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "react-three-fiber";
import { Group, Vector2 } from "three";

type FramedImageProps = JSX.IntrinsicElements["group"] & {
  src: string;
  ratio: [number, number];
  sizeScale: number;
  frameless?: boolean;
  floating?: boolean;
};

const frameWidth = 0.3;
const frameDepth = 0.1;
const meshOffset = 0.0005;

const FramedImage = (props: FramedImageProps) => {
  const { src, sizeScale, ratio, frameless, floating } = props;

  const texture = useLoader(THREE.TextureLoader, src);
  const group = useRef<Group>();
  const uuid = useRef(Math.random() * 1000);

  // sizing
  const normalizedRatio = new Vector2(ratio[0], ratio[1]).normalize();
  const width = normalizedRatio.x * sizeScale;
  const height = normalizedRatio.y * sizeScale;

  useFrame(({ clock }) => {
    if (group.current && floating) {
      group.current.position.y =
        0.1 * Math.sin(clock.getElapsedTime() + uuid.current);
    }
  });

  return (
    <group {...props}>
      <group ref={group}>
        <mesh castShadow>
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
    </group>
  );
};

export default FramedImage;
