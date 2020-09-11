import React from "react";

const AMBIENT_INTENSITY = 0.3;

const DanilLighting = () => {
  return (
    <>
      <ambientLight intensity={AMBIENT_INTENSITY} color={0xffffff} />
      <pointLight position={[0, 3, 0]} intensity={0.8} />
      <fog attach="fog" args={[0x333333, 1, 45]} />
    </>
  );
};

export default DanilLighting;
