import { useMemo } from "react";
import { SpotLight } from "three";

const LIGHT_INTENSITY = 4.4;
const LIGHT_DISTANCE = 42;
const LIGHT_COLOR = 0xffffff;
const LIGHT_ANGLE = Math.PI / 2.4;

const AMBIENT_INTENSITY = 0.2;

type LightingProps = {
  time: boolean;
};

const ChadLighting = (props: LightingProps) => {
  const light1 = useMemo(() => new SpotLight(), []);
  const light2 = useMemo(() => new SpotLight(), []);
  const { time } = props;

  const topLight = {
    distance: LIGHT_DISTANCE,
    color: LIGHT_COLOR,
    intensity: LIGHT_INTENSITY,
    angle: LIGHT_ANGLE,
    penumbra: 0.35,
  };

  const bottomLight = {
    distance: LIGHT_DISTANCE,
    color: LIGHT_COLOR,
    intensity: LIGHT_INTENSITY * 0.6,
    angle: LIGHT_ANGLE,
    penumbra: 0.35,
  };

  return (
    <>
      <ambientLight intensity={AMBIENT_INTENSITY} color={0xffffff} />
      {time ? <></> : <fog attach="fog" args={[0x000000, 1, 45]} />}
      <group position={[0, 30, 0]}>
        <primitive object={light1} {...topLight} />
        <primitive object={light1.target} position={[0, -100, 0]} />
      </group>
      <group position={[0, -30, 0]}>
        <primitive object={light2} {...bottomLight} />
        <primitive object={light2.target} position={[0, 100, 0]} />
      </group>
      <pointLight
        intensity={2}
        position={[0, 0, 0]}
        color={0xffffff}
        distance={20}
      />
    </>
  );
};

export default ChadLighting;
