import React from "react";
import { usePlane } from "use-cannon";

type InfinitePlaneProps = {
  height: number;
  size?: [number, number];
};

const InfinitePlane = (props: InfinitePlaneProps) => {
  const { height, size = [100, 100] } = props;

  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, height, 0],
    args: size,
    type: "Static",
  }));

  return (
    <mesh ref={ref}>
      {/*<planeBufferGeometry attach="geometry" args={size} />*/}
      {/*<meshPhongMaterial attach="material" color="#660000" />*/}
    </mesh>
  );
};

export default InfinitePlane;
