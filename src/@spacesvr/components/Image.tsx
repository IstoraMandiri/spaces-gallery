import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "react-three-fiber";
import { Color, Group, Vector2 } from "three";

type ImageProps = JSX.IntrinsicElements["group"] & {
  src: string;
  ratio: [number, number];
  sizeScale: number;
  framed?: boolean;
  color?: Color;
};

const frameWidth = 0.3;
const frameDepth = 0.1;
const borderThickness = 0.2;
const borderDepth = 0.2;
const meshOffset = 0.0005;

const Image = (props: ImageProps) => {
  const { src, sizeScale, ratio, framed, color = 0x111111 } = props;

  const texture = useLoader(THREE.TextureLoader, src);
  const group = useRef<Group>();

  // sizing
  const normalizedRatio = new Vector2(ratio[0], ratio[1]).normalize();
  const width = normalizedRatio.x * sizeScale;
  const height = normalizedRatio.y * sizeScale;

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: color,
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
        {framed && (
          <>
            <mesh position-z={[-0.1 - meshOffset]} material={material}>
              <boxBufferGeometry
                attach="geometry"
                args={[width + frameWidth, height + frameWidth, frameDepth]}
              />
            </mesh>
            {/* top */}
            <mesh
              position-y={height / 2 + frameWidth / 2 - borderThickness / 2}
              material={material}
            >
              <boxBufferGeometry
                attach="geometry"
                args={[width + frameWidth, borderThickness, borderDepth]}
              />
            </mesh>
            {/* bottom */}
            <mesh
              position-y={-height / 2 - frameWidth / 2 + borderThickness / 2}
              material={material}
            >
              <boxBufferGeometry
                attach="geometry"
                args={[width + frameWidth, borderThickness, borderDepth]}
              />
            </mesh>
            {/* left */}
            <mesh
              position-x={-width / 2 - frameWidth / 2 + borderThickness / 2}
              material={material}
            >
              <boxBufferGeometry
                attach="geometry"
                args={[borderThickness, height + frameWidth, borderDepth]}
              />
            </mesh>
            {/* right */}
            <mesh
              position-x={width / 2 + frameWidth / 2 - borderThickness / 2}
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

export default Image;
