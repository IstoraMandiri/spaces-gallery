import React, { useEffect, useRef } from "react";
import { EnvironmentStoreHook } from "stores/environment";
import { AudioAnalyserStoreHook } from "stores/audio";

import ReactiveCube from "./ReactiveCube";

type FloorProps = {
  useEnvStore: EnvironmentStoreHook;
  position: [number, number, number];
  scale?: [number, number, number];
  cubes?: number;
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
    cubes = 10,
    offset = 0,
    hueStart = 0.5,
    hueEnd = 230 / 360,
  } = props;

  let cubeRows = [];
  const cubeColumns = [];
  const cubeWalls = [];
  for (let i = 0; i < cubes; i++) {
    for (let j = 0; j < cubes; j++) {
      if (i === 0 || i === cubes - 1 || j === 0 || j === cubes - 1) {
        cubeWalls.push(
          <ReactiveCube
            position={[j * (scale[0] + offset), 0, i * (scale[2] + offset)]}
            gridIndex={[i, j]}
            scale={scale}
            wall={true}
            useEnvStore={useEnvStore}
            positionOffset={position}
            hueStart={hueStart}
            hueEnd={hueEnd}
            gridLength={cubes}
          />
        );
      } else {
        cubeRows.push(
          <ReactiveCube
            position={[j * (scale[0] + offset), 0, i * (scale[2] + offset)]}
            gridIndex={[i, j]}
            scale={scale}
            useEnvStore={useEnvStore}
            positionOffset={position}
            hueStart={hueStart}
            hueEnd={hueEnd}
            gridLength={cubes}
          />
        );
      }
    }
    cubeColumns.push(cubeRows);
    cubeRows = [];
  }

  return (
    <group position={position}>
      {cubeColumns}
      {cubeWalls}
    </group>
  );
};

export default ShirtsFloor;
