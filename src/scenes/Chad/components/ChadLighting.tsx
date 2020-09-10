import React, { useMemo } from "react";
import { SpotLight } from "three";

const LIGHT_INTENSITY = 8;
const LIGHT_DISTANCE = 30;
const LIGHT_COLOR = 0xffffff;

const AMBIENT_INTENSITY = 0.3;

const ChadLighting = (props: { isGallery: boolean }) => {
  const { isGallery } = props;

  const light1 = useMemo(() => new SpotLight(), []);
  const light2 = useMemo(() => new SpotLight(), []);

  const spotlightAttrs = {
    distance: LIGHT_DISTANCE,
    color: LIGHT_COLOR,
    intensity: LIGHT_INTENSITY,
    angle: Math.PI / 2.2,
    penumbra: 0.03,
  };

  return (
    <>
      <ambientLight intensity={AMBIENT_INTENSITY} color={0xffffff} />
      <fog attach="fog" args={[0x000000, 4, 50]} />
      {/*<group position={[0, 20, 0]}>*/}
      {/*  <primitive object={light1} {...spotlightAttrs} />*/}
      {/*  <primitive object={light1.target} position={[0, -1, 0]} />*/}
      {/*</group>*/}
      {/*<group position={[0, -20, 0]}>*/}
      {/*  <primitive object={light2} {...spotlightAttrs} />*/}
      {/*  <primitive object={light2.target} position={[0, 1, 0]} />*/}
      {/*</group>*/}
      <pointLight intensity={1.2} position={[0, 0, 0]} color={0xffffff} />
    </>
  );
};

export default ChadLighting;
