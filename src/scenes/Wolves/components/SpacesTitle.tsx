import React, { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "react-three-fiber";
import Text from "@spacesvr/components/Text";
import CrazyMaterial from "../shaders/crazy";
import Logo from "@spacesvr/components/Logo";

const SpacesTitle = () => {
  const group = useRef<Mesh>();

  const material = useRef(new CrazyMaterial());
  const SCALE = 7;

  useFrame(({ clock }, delta) => {
    if (material?.current) {
      // @ts-ignore
      material.current.time += delta;
    }
  });

  return (
    <group rotation={[0, Math.PI * 1.25, 0]}>
      <group position={[0, 10, -38]}>
        <group scale={[SCALE * 0.1, SCALE * 0.1, 0.1]}>
          <mesh ref={group}>
            <Text
              text="Spaces"
              font="https://d27rt3a60hh1lx.cloudfront.net/fonts/AnotherDanger.json"
              size={SCALE}
              material={material.current}
            />
          </mesh>
        </group>
        <group position={[0, 0, -11]} scale={[9, 9, 9]}>
          <Logo rotating floating />
        </group>
      </group>
    </group>
  );
};

export default SpacesTitle;
