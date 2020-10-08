import React from "react";
import { useBox, useSphere } from "use-cannon";

type SphereColliderProps = {
  position: [number, number, number];
  scale?: [number, number, number];
};

type BoxColliderProps = {
  scale?: [number, number, number];
};

export const BoxCollider = (props: BoxColliderProps) => {
  const { scale = [2, 10, 2] } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [box] = useBox(() => ({
    type: "Static",
    position: [0, 0, 0],
    args: [1, 1, 1],
  }));
  const boxScale: [number, number, number] = [scale[0], 20, scale[2]];

  return (
    <group>
      <mesh ref={box}>
        <boxBufferGeometry attach="geometry" args={boxScale} />
        <meshStandardMaterial attach="material" visible={false} />
      </mesh>
    </group>
  );
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
