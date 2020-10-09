import React, { useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { MeshStandardMaterial, Vector3 } from "three";
import SimplexNoise from "simplex-noise";
import { BoxCollider } from "./ShirtsCollisions";
import * as THREE from "three";

type ReactiveCubeProps = {
  position: [number, number, number];
  scale: [number, number, number];
  gridIndex: [number, number];
  hueStart: number;
  hueEnd: number;
  wall?: boolean;
  gridLength: number;
  positionOffset: [number, number, number];
};

const ReactiveCube = (props: ReactiveCubeProps) => {
  const {
    position,
    scale,
    gridIndex,
    gridLength,
    wall,
    positionOffset,
    hueStart,
    hueEnd,
  } = props;

  const cube = useRef<THREE.Mesh>();
  const { camera } = useThree();
  const simplex = useRef(new SimplexNoise("seedyo"));
  const positionVector = new Vector3(
    position[0] + positionOffset[0],
    position[1] + positionOffset[1],
    position[2] + positionOffset[2]
  );
  const hitboxScale: [number, number, number] = [scale[0], 20, scale[2]];

  useFrame(({ clock }, delta) => {
    const simpValue =
      (simplex.current.noise3D(
        gridIndex[0] / 15,
        gridIndex[1] / 15,
        clock.getElapsedTime() * 0.08
      ) +
        1) /
      2;
    if (cube.current) {
      (cube.current.material as MeshStandardMaterial).color.setHSL(
        hueStart + (hueEnd - hueStart) * (gridIndex[0] / gridLength),
        0.25,
        0.45 + simpValue / 2
      );
      (cube.current.material as MeshStandardMaterial).metalness =
        gridIndex[1] / gridLength;

      const simpHeight = scale[1] + 8 * simpValue;

      if (wall) {
        const distance = camera.position.distanceTo(positionVector);
        if (distance < 10) {
          cube.current.scale.y = Math.min(
            15,
            cube.current.scale.y + delta * 50
          );
        } else {
          cube.current.scale.y = Math.max(
            simpHeight,
            cube.current.scale.y - delta * 50
          );
        }
      } else {
        cube.current.scale.y = simpHeight;
      }
    }
  });

  const materialProps = wall ? { transparent: true, opacity: 0.9 } : {};

  return (
    <>
      <mesh position={position} ref={cube}>
        <boxBufferGeometry attach="geometry" args={scale} />
        <meshStandardMaterial attach="material" {...materialProps} />
      </mesh>
      {wall && <BoxCollider position={position} scale={hitboxScale} />}
    </>
  );
};

export default ReactiveCube;
