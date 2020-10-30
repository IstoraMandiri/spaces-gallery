import React, { Suspense, useRef } from "react";
import WolfHead from "../models/WolfHead";
import { Mesh, Vector2, Vector3 } from "three";
import { useFrame, useThree } from "react-three-fiber";
import Text from "@spacesvr/components/Text";
import CrazyMaterial from "../shaders/crazy";

const v1 = new Vector2();
const v2 = new Vector2();

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
      const xCom = camera.position.x + wolf.current.position.x;
      const yCom = camera.position.z + wolf.current.position.z;
      const diff = v1.set(yCom, xCom).normalize();
      wolf.current.rotation.y = -diff.angle() - Math.PI / 2 - Math.PI / 4;
    }
  });

  return (
    <group rotation={[0, Math.PI / 2.7, 0]}>
      <group position={[0, 10, -40]}>
        <group scale={[SCALE * 0.1, SCALE * 0.1, 0.1]}>
          <mesh ref={group}>
            <Text
              text="We Are Wolves"
              font="fonts/AnotherDanger.json"
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
