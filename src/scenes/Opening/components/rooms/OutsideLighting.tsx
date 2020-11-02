import React, { useMemo } from "react";
import { SpotLight } from "three";

const LIGHT_INTENSITY = 4;
const LIGHT_DISTANCE = 30;
const LIGHT_COLOR = 0xffffff;

const AMBIENT_INTENSITY = 0.03;

const OutsideLighting: React.FC = (props) => {
  const light1 = useMemo(() => new SpotLight(), []);

  const spotlightAttrs = {
    distance: LIGHT_DISTANCE,
    color: LIGHT_COLOR,
    intensity: LIGHT_INTENSITY,
    angle: Math.PI / 2.6,
    penumbra: 0.03,
    castShadow: true,
    bias: 0.0001,
  };

  return (
    <>
      <ambientLight intensity={AMBIENT_INTENSITY} color={0xffffff} />
      <group position={[0, 5, 0]}>
        <primitive object={light1} {...spotlightAttrs} />
        <primitive object={light1.target} position={[0, -1, 0]} />
      </group>
    </>
  );
};

export default OutsideLighting;
