import React, { useEffect, useMemo, useRef } from "react";
import SimplexNoise from "simplex-noise";

import { PINK, GREEN } from "./Colors";
import { BufferGeometry, PlaneBufferGeometry } from "three";

type HillsProps = {
  angle: number;
  dimensions: [number, number];
  dist: number;
  tall?: number;
};

const SMOOTHNESS = 80;
const GRADUAL_INCLINE = 0.25;

const Hills = (props: HillsProps) => {
  const { angle, dimensions, dist, tall = 9 } = props;

  const [width, height] = dimensions;

  const hillRef = useRef<THREE.Mesh>();
  const simplex = useMemo(() => new SimplexNoise(), []);
  const hillGeo = useMemo<BufferGeometry>(() => {
    const hillBufferGeo = new PlaneBufferGeometry(width, height, width, height);

    const vertices = hillBufferGeo.attributes.position.array;
    const count = hillBufferGeo.attributes.position.count;

    const inclineX = GRADUAL_INCLINE * width;
    const inclineY = GRADUAL_INCLINE * height;

    let minX = 10000;
    let maxX = -10000;

    for (let i = 0; i < count; i++) {
      const x = vertices[i * 3];
      const y = vertices[i * 3 + 1];

      if (x < minX) minX = x;
      if (x > maxX) maxX = x;

      let localScale = 1;
      const modX = x + width / 2;
      if (modX < inclineX) {
        localScale *= modX / inclineX;
      } else if (width - modX < inclineX) {
        localScale *= (width - modX) / inclineX;
      }
      const modY = y + height / 2;
      if (modY < inclineY) {
        localScale *= modY / inclineY;
      } else if (height - modY < inclineY) {
        localScale *= (height - modY) / inclineY;
      }

      localScale = Math.min(Math.abs(localScale), 1);

      const newZ =
        (tall *
          localScale *
          (simplex.noise2D(x / SMOOTHNESS, y / SMOOTHNESS) + 1)) /
        2;

      hillBufferGeo.attributes.position.setZ(i, newZ);
    }

    return hillBufferGeo as BufferGeometry;
  }, []);

  return (
    <group rotation-y={angle}>
      <group position-z={-1 * dist}>
        <mesh ref={hillRef} rotation-x={-Math.PI / 2} geometry={hillGeo}>
          <meshBasicMaterial attach="material" color={GREEN} />
        </mesh>
      </group>
    </group>
  );
};

export default Hills;
