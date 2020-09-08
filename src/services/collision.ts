import { useMemo } from "react";
import * as THREE from "three";
import { BufferGeometry } from "three";
import { useConvexPolyhedron } from "use-cannon";

export const useCollision = (geometry: BufferGeometry) => {
  const geo = useMemo(() => new THREE.Geometry().fromBufferGeometry(geometry), [
    geometry,
  ]);

  const [hitbox] = useConvexPolyhedron(() => ({
    type: "Static",
    args: geo,
  }));

  return hitbox;
};
