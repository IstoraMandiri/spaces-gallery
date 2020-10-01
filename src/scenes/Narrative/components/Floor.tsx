import React from "react";
const COLOR = 0x668575;

const Floor = () => {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[2000, 2000]} />
        <meshBasicMaterial attach="material" color={COLOR} />
      </mesh>
    </>
  );
};

export default Floor;
