import React from "react";
import { useSphere } from "use-cannon";

type SphereColliderProps = {
  position: [number, number, number];
  scale?: [number, number, number];
};

const SphereCollider = (props: SphereColliderProps) => {
  const { position, scale = [20, 20, 20] } = props;

  const [ref1] = useSphere(() => ({
    type: "Static",
    position: [0, 0, 0],
    args: 20,
  }));

  return (
    <group position={position}>
      <mesh ref={ref1}>
        <sphereBufferGeometry attach="geometry" args={scale} />
        <meshStandardMaterial attach="material" visible={false} />
      </mesh>
    </group>
  );
};

export default SphereCollider;
