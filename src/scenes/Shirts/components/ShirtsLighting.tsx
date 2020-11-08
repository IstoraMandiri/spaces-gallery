import { useMemo } from "react";
import { DirectionalLight, SpotLight } from "three";
import { COLORS } from "../assets/colors";
import { useEnvironment } from "@spacesvr/core/utils/hooks";

const ShirtsLighting = () => {
  const { portal } = useEnvironment();
  const color = COLORS[Math.abs(portal?.seed) % COLORS.length];

  const light = useMemo(() => new SpotLight(), []);
  const lightArgs = {
    distance: 12,
    color: 0x57a4a9,
    intensity: 8,
    angle: Math.PI / 2.4,
    penumbra: 0.5,
  };

  const sun = useMemo(() => new DirectionalLight(color), []);

  //Set up shadow properties for the light
  sun.shadow.camera.scale.set(4, 4, 4);
  sun.shadow.mapSize.width = 2048;
  sun.shadow.mapSize.height = 2048;

  return (
    <>
      <ambientLight intensity={0.2} />
      <group position={[-4, 8, 5]}>
        <primitive castShadow object={light} {...lightArgs} />
        <primitive object={light.target} position={[-1, -1, -1]} />
        <primitive object={sun} position={[10, 10, 10]} castShadow />
      </group>
    </>
  );
};

export default ShirtsLighting;
