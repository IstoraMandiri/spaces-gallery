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
      // console.log(`PlayerX: ${camera.position.x}\nPlayerZ: ${camera.position.z}\nWolfX: ${wolf.current.position.x}\nWolfZ: ${wolf.current.position.z}`)
      const xCom = camera.position.z + 45;
      const yCom = camera.position.x;
      camera.updateMatrixWorld();
      // const diff = v1.set(xCom, yCom).normalize();
      const xVector = v1.set(xCom, 0).normalize();
      const yVector = v2.set(0, yCom).normalize();
      const targetVector = new Vector2().addVectors(xVector, yVector);
      // wolf.current.rotation.y = targetVector.angle();
      // wolf.current.rotation.y = -diff.angle() - Math.PI / 2 - Math.PI / 4;
      // wolf.current.rotation.y = Math.atan(yCom/xCom);
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
