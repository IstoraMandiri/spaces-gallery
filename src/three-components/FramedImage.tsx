import React, { useMemo, useRef } from "react";
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
const borderThickness = 0.2;
const borderDepth = 0.2;
const meshOffset = 0.0005;
const floatHeight = 0.05;

const FramedImage = (props: FramedImageProps) => {
  const { src, sizeScale, ratio, frameless, floating } = props;

  const texture = useLoader(THREE.TextureLoader, src);
  const group = useRef<Group>();
  const uuid = useRef(Math.random());

  // sizing
  const normalizedRatio = new Vector2(ratio[0], ratio[1]).normalize();
  const width = normalizedRatio.x * sizeScale;
  const height = normalizedRatio.y * sizeScale;

  useFrame(({ clock }) => {
    if (group.current && floating) {
      group.current.position.y =
        floatHeight *
        2 *
        (Math.sin(
          clock.getElapsedTime() * (uuid.current / 10 + 0.9) +
            uuid.current * 1000
        ) -
          0.5);
    }
  });

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.8,
        metalness: 0.05,
      }),
    []
  );

  return (
    <group {...props}>
      <group ref={group}>
        <mesh castShadow>
          <planeBufferGeometry attach="geometry" args={[width, height]} />
          <meshStandardMaterial attach="material" map={texture} />
        </mesh>
        {!frameless && (
          <>
            <mesh position={[0, 0, -0.1 - meshOffset]} material={material}>
              <boxBufferGeometry
                attach="geometry"
                args={[width + frameWidth, height + frameWidth, frameDepth]}
              />
            </mesh>
            {/* top */}
            <mesh
              position={[
                0,
                height / 2 + frameWidth / 2 - borderThickness / 2,
                0,
              ]}
              material={material}
            >
              <boxBufferGeometry
                attach="geometry"
                args={[width + frameWidth, borderThickness, borderDepth]}
              />
            </mesh>
            {/* bottom */}
            <mesh
              position={[
                0,
                -height / 2 - frameWidth / 2 + borderThickness / 2,
                0,
              ]}
              material={material}
            >
              <boxBufferGeometry
                attach="geometry"
                args={[width + frameWidth, borderThickness, borderDepth]}
              />
            </mesh>
            {/* left */}
            <mesh
              position={[
                -width / 2 - frameWidth / 2 + borderThickness / 2,
                0,
                0,
              ]}
              material={material}
            >
              <boxBufferGeometry
                attach="geometry"
                args={[borderThickness, height + frameWidth, borderDepth]}
              />
            </mesh>
            {/* right */}
            <mesh
              position={[
                width / 2 + frameWidth / 2 - borderThickness / 2,
                0,
                0,
              ]}
              material={material}
            >
              <boxBufferGeometry
                attach="geometry"
                args={[borderThickness, height + frameWidth, borderDepth]}
              />
            </mesh>
          </>
        )}
      </group>
    </group>
  );
};

export default FramedImage;
