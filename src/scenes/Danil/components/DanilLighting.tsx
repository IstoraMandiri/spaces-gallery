import React from "react";

const AMBIENT_INTENSITY = 0.3;

const DanilLighting = () => {
  return (
    <>
      <ambientLight intensity={AMBIENT_INTENSITY} color={0xffffff} />
      <fog attach="fog" args={[0x333333, 50, 150]} />
    </>
  );
};

export default DanilLighting;
