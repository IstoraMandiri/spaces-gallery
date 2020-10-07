import React, { useRef } from "react";
import { MusicStoreHook } from "stores/music";
import { useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";

type ReactiveProps = JSX.IntrinsicElements["group"] & {
  url: string;
  useMusicStore: MusicStoreHook;
  type: string;
};

let min = 1000000;
let max = -10000000;

const ReactivePrimitive = (props: ReactiveProps) => {
  const { url, type, useMusicStore } = props;

  const texture = useLoader(THREE.TextureLoader, url);
  const aa = useMusicStore((st) => st.audioAnalyser);
  const group = useRef<THREE.Group>();
  const material = useRef<THREE.MeshStandardMaterial>();
  const freqIndex = useRef(Math.floor(Math.random() * 16));

  useFrame(({ clock }) => {
    if (material.current) {
      const freqData = aa?.getFrequencyData()[freqIndex.current] || 0;

      if (freqData < min) {
        min = freqData;
      }

      if (freqData > max) {
        max = freqData;
      }

      const modFreqData = (freqData - min) / (max - min);

      const disp = THREE.MathUtils.lerp(-0.4, 1.0, modFreqData);

      material.current.displacementScale = disp;
    }

    if (group.current) {
      group.current.rotation.x = clock.getElapsedTime() / 8;
      group.current.rotation.y = clock.getElapsedTime() / 5;
      group.current.rotation.z = clock.getElapsedTime() / 11;
    }
  });

  const primitives = [
    <boxBufferGeometry
      key={1}
      attach="geometry"
      args={[2, 2, 2, 20, 20, 20]}
    />,
    <icosahedronBufferGeometry key={2} attach="geometry" args={[1, 0]} />,
    <sphereBufferGeometry
      key={2}
      attach="geometry"
      args={[3 * Math.random(), 16, 16]}
    />,
  ];
  const randomPrimitive =
    primitives[Math.floor(Math.random() * primitives.length)];

  return (
    <group {...props} ref={group}>
      <mesh>
        {randomPrimitive}
        <meshStandardMaterial
          ref={material}
          attach="material"
          map={texture}
          displacementMap={texture}
          displacementScale={0}
        />
      </mesh>
    </group>
  );
};

export default ReactivePrimitive;
