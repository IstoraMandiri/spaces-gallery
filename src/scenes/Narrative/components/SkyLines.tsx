import React from "react";
import SkyLine from "./SkyLine";

const SkyLines = () => {
  return (
    <group rotation-y={0}>
      <SkyLine position={[-120, 40, -190]} />
      <SkyLine position={[20, 95, -200]} />
      <SkyLine position={[100, 80, -230]} />
    </group>
  );
};

export default SkyLines;
