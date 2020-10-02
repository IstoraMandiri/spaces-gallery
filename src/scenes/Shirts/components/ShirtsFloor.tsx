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

const NONE_RANGE = 17;
const INNER_EDGE_RANGE = 19.5;
const OUTER_EDGE_RANGE = 55;

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

      const { distance } = cartesian2Polar(xPos, zPos);

      if (distance < NONE_RANGE) {
        continue;
      }

      const wall = distance < INNER_EDGE_RANGE || distance > OUTER_EDGE_RANGE;

      cubes.push(
        <ReactiveCube
          key={`${i}-${j}`}
          position={[xPos, 0, zPos]}
          gridIndex={[i, j]}
          scale={scale}
          wall={wall}
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

function cartesian2Polar(x: number, y: number) {
  const distance = Math.sqrt(x * x + y * y);
  const radians = Math.atan2(y, x); //This takes y first
  const polarCoor = { distance: distance, radians: radians };
  return polarCoor;
}

export default ShirtsFloor;
