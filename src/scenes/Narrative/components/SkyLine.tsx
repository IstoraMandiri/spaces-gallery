import React, { useCallback, useMemo, useRef } from "react";
import { PINK } from "../assets/Colors";
import SimplexNoise from "simplex-noise";
import { Geometry, Vector3 } from "three";
import { extend, useFrame } from "react-three-fiber";
// @ts-ignore sorry no types
import * as meshline from "threejs-meshline";

extend(meshline);

type SkyLineProps = {
  width?: number;
  height?: number;
  freq?: number;
} & JSX.IntrinsicElements["group"];

const LINE_WIDTH = 0.9;
const NUM_POINTS = 200;
const STEP = 0.1;

const SkyLine = (props: SkyLineProps) => {
  const { width = 1500, height = 3, freq = 0.06, ...restProps } = props;

  const seed = useMemo(() => Math.random(), []);
  const simplex = useMemo(() => new SimplexNoise(), []);
  const ref = useRef<THREE.Mesh>();

  const generatePoints = useCallback(
    (time: number) => {
      const points: Vector3[] = [];
      const simplexFreq = 80;
      const locFreq = freq + seed / 60;

      const OFFSET = seed * 10000;
      const SIN_TIME = time * (0.6 + seed / 5);
      const SIMPLEX_TIME = time * (0.45 + seed / 5);

      for (let i = 0; i < NUM_POINTS; i++) {
        const x = i * STEP;
        const y =
          height * Math.sin(i * locFreq + SIN_TIME + OFFSET) +
          simplex.noise2D(
            (x + SIMPLEX_TIME) / simplexFreq,
            (i + SIMPLEX_TIME) / simplexFreq
          );
        points.push(new Vector3((x / NUM_POINTS) * width, y, 0));
      }

      return points;
    },
    [freq, seed, width, height]
  );

  useFrame(({ clock }) => {
    const points = generatePoints(clock.getElapsedTime());
    if (ref.current) {
      (ref.current.geometry as Geometry).vertices = points;
    }
  });

  return (
    <group {...restProps}>
      <mesh ref={ref}>
        {/* @ts-ignore sorry no types */}
        <meshLine attach="geometry" />
        {/* @ts-ignore sorry no types */}
        <meshLineMaterial
          attach="material"
          color={PINK}
          lineWidth={LINE_WIDTH}
        />
      </mesh>
    </group>
  );
};

export default SkyLine;
