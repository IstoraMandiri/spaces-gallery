import { Suspense, useRef } from "react";
import WolfHead from "../models/WolfHead";
import { Mesh } from "three";
import { useFrame, useThree } from "react-three-fiber";
import { Text } from "spacesvr/components";
import CrazyMaterial from "../shaders/crazy";

const WolvesTitle = () => {
  const group = useRef<Mesh>();
  const { camera } = useThree();

  const material = useRef(new CrazyMaterial());
  const SCALE = 7;

  const wolf = useRef<Mesh>();

  useFrame(({ clock }, delta) => {
    if (material?.current) {
      // @ts-ignore
      material.current.time += delta;
    }

    if (camera && wolf.current) {
      wolf.current.rotation.y = 0;
    }
  });

  return (
    <group rotation={[0, Math.PI / 2.7, 0]}>
      <group position={[0, 10, -40]}>
        <group scale={[SCALE * 0.1, SCALE * 0.1, 0.1]}>
          <mesh ref={group}>
            <Text
              text="We Are Wolves"
              font="https://d27rt3a60hh1lx.cloudfront.net/fonts/AnotherDanger.json"
              size={SCALE}
              material={material.current}
            />
          </mesh>
        </group>
        <group position={[0, -12, -5]} scale={[19, 19, 19]} ref={wolf}>
          <Suspense fallback={null}>
            <WolfHead />
          </Suspense>
        </group>
      </group>
    </group>
  );
};

export default WolvesTitle;
