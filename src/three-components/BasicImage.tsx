import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "react-three-fiber";
import { Color, Group, Vector2, Mesh } from "three";
import { Cloth, ModifierStack } from "three.modifiers";
import { AudioAnalyserStoreHook } from "stores/audio";

type BasicImageProps = JSX.IntrinsicElements["group"] & {
  src: string;
  ratio: [number, number];
  sizeScale: number;
  floating?: boolean;
  color?: Color;
  useAAStore: AudioAnalyserStoreHook;
};
const floatHeight = 2;

const BasicImage = (props: BasicImageProps) => {
  const {
    src,
    sizeScale,
    ratio,
    floating,
    color = 0x111111,
    useAAStore,
  } = props;

  const texture = useLoader(THREE.TextureLoader, src);
  const group = useRef<Group>();
  const uuid = useRef(Math.random());

  // sizing
  const normalizedRatio = new Vector2(ratio[0], ratio[1]).normalize();
  const width = normalizedRatio.x * sizeScale;
  const height = normalizedRatio.y * sizeScale;

  const mesh = useRef<Mesh>();

  let modifier: ModifierStack;

  const cloth = new Cloth(1, 0);

  const aa = useAAStore((st) => st.audioAnalyser);

  // if (mesh.current) {
  //   modifier = new ModifierStack(mesh.current);

  //   cloth.setForce(0.02, -0.02, -0.02);

  //   modifier.addModifier(cloth);
  // }

  useFrame(({ clock }) => {
    if (mesh.current && floating) {
      mesh.current.position.y =
        floatHeight *
        2 *
        (Math.sin(
          clock.getElapsedTime() * (uuid.current / 10 + 0.9) +
            uuid.current * 1000
        ) +
          1.4);
    }
    //update mesh modifiers
    if (!modifier && mesh.current) {
      modifier = new ModifierStack(mesh.current);

      cloth.setForce(
        0.002 * Math.random(),
        -0.002 * Math.random(),
        -0.002 * Math.random()
      );

      modifier.addModifier(cloth);
    }
    try {
      cloth.lockXMin(0);
      cloth.lockYMin(0);
      let freq_data = aa?.getFrequencyData()[0];
      if (freq_data === undefined) freq_data = 0.01;
      cloth.setForce(
        0.002 * Math.random() * (freq_data / 200),
        -0.002 * Math.random(),
        -0.002 * Math.random() * (freq_data / 200)
      );
    } catch (err) {
      console.log(err);
      modifier.addModifier(cloth);
    }
    modifier && modifier.apply();
  });

  return (
    <group {...props}>
      <group ref={group}>
        <mesh ref={mesh} castShadow>
          <planeGeometry attach="geometry" args={[width, height, 16, 16]} />
          <meshStandardMaterial
            attach="material"
            map={texture}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
};

export default BasicImage;
