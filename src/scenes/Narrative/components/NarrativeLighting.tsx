import React from "react";
import { GRAY } from "../assets/Colors";

const NarrativeLighting = () => {
  return (
    <>
      <fog attach="fog" args={[GRAY, 100, 400]} />
      <ambientLight intensity={1} />
    </>
  );
};

export default NarrativeLighting;
