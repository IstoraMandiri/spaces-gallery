import React from "react";
import { EnvironmentStoreHook } from "stores/environment";

import ReactiveCube from "./ReactiveCube";

type FloorProps = {
  useEnvStore: EnvironmentStoreHook;
  position: [number, number, number];
  scale?: [number, number, number];
  size?: number;
  offset?: number;
  color?: string;
  hueStart?: number;
  hueEnd?: number;
  wallColor?: string;
};

const ShirtsFloor = (props: FloorProps) => {
  const {
    useEnvStore,
    position,
    scale = [1, 0.5, 1],
    size = 10,
    offset = 0,
    hueStart = 0.5,
    hueEnd = 230 / 360,
  } = props;

  const cubes = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const xPos = (j - size / 2) * (scale[0] + offset);
      const zPos = (i - size / 2) * (scale[2] + offset);
      const wall = i === 0 || i === size - 1 || j === 0 || j === size - 1;

      cubes.push(
        <ReactiveCube
          key={`${i}-${j}`}
          position={[xPos, 0, zPos]}
          gridIndex={[i, j]}
          scale={scale}
          wall={wall}
          useEnvStore={useEnvStore}
          positionOffset={position}
          hueStart={hueStart}
          hueEnd={hueEnd}
          gridLength={size}
        />
      );
    }
  }

  return <group position={position}>{cubes}</group>;
};

export default ShirtsFloor;
