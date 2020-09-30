import React, { useRef } from "react";
import { EnvironmentStoreHook } from "../../../stores/environment";
import { AudioAnalyserStoreHook } from "../../../stores/audio";
import { useFrame, useThree } from "react-three-fiber";
import { Vector3 } from "three";
import * as THREE from "three";
import SimplexNoise from "simplex-noise";
import { useBox } from "use-cannon";

type ReactiveCubeProps = {
  position: [number, number, number];
  scale: [number, number, number];
  gridIndex: [number, number];
  hueStart: number;
  hueEnd: number;
  wall?: boolean;
  gridLength: number;
  useEnvStore: EnvironmentStoreHook;
  positionOffset: [number, number, number];
};

const ReactiveCube = (props: ReactiveCubeProps) => {
  const {
    position,
    scale,
    gridIndex,
    gridLength,
    wall = false,
    useEnvStore,
    positionOffset,
    hueStart,
    hueEnd,
  } = props;
  const cube = useRef();
  const { camera } = useThree();
  const simplex = useRef(new SimplexNoise("seedyo"));
  const positionVector = new Vector3(
    position[0] + positionOffset[0],
    position[1] + positionOffset[1],
    position[2] + positionOffset[2]
  );

  useFrame(({ clock }, delta) => {
    const simpValue =
      (simplex.current.noise3D(
        gridIndex[0] / 18,
        gridIndex[1] / 18,
        clock.getElapsedTime() * 0.08
      ) +
        1) /
      2;
    if (cube.current) {
      // @ts-ignore
      cube.current.material.color.setHSL(
        hueStart + (hueEnd - hueStart) * (gridIndex[0] / gridLength),
        0.25,
        0.45 + simpValue / 2
      );
      // @ts-ignore
      cube.current.material.metalness = gridIndex[1] / gridLength;

      const distance = camera.position.distanceTo(positionVector);

      if (wall) {
        if (distance < 8) {
          // @ts-ignore
          cube.current.scale.y = Math.min(
            10,
            // @ts-ignore
            cube.current.scale.y + delta * 50
          );
        } else {
          // @ts-ignore
          cube.current.scale.y = Math.max(
            scale[1],
            // @ts-ignore
            cube.current.scale.y - delta * 50
          );
        }
      } else {
        // @ts-ignore
        cube.current.scale.y = scale[1] + 3 * simpValue;

        // if (distance < 5) {
        //   // @ts-ignore
        //   cube.current.scale.y = Math.min(
        //     7,
        //   // @ts-ignore
        //     cube.current.scale.y + delta*50
        //   )
        // } else {
        //   // @ts-ignore
        //   cube.current.scale.y = scale[1] + 3 * simpValue;
        // }
      }
    }
  });

  return (
    <>
      <mesh position={position} ref={cube}>
        <boxBufferGeometry attach="geometry" args={scale} />
        <meshStandardMaterial attach="material" />
      </mesh>
    </>
  );
};

export default ReactiveCube;
