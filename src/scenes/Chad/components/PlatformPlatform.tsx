import React from "react";

import { useBox } from "use-cannon";

const ChadSceneSelector = () => {
  const [ref] = useBox(() => ({
    type: "Static",
    position: [0, 0, 0],
    args: [2, 1, 2],
  }));

  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" args={[2, 1, 2]} />
      <meshStandardMaterial color="white" attach="material" />
    </mesh>
  );

  return null;
};

export default ChadSceneSelector;
