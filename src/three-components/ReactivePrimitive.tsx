import React, { useRef } from "react";
import { AudioAnalyserStoreHook } from "stores/audio";
import { useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";

type ReactiveProps = JSX.IntrinsicElements["group"] & {
  url: string;
  useAAStore: AudioAnalyserStoreHook;
  type: string;
};

let min = 1000000;
let max = -10000000;

const ReactivePrimitive = (props: ReactiveProps) => {
  const { url, type, useAAStore } = props;

  const texture = useLoader(THREE.TextureLoader, url);
  const aa = useAAStore((st) => st.audioAnalyser);
  const group = useRef<THREE.Group>();
  const material = useRef<THREE.MeshStandardMaterial>();
  const freqIndex = useRef(Math.floor(Math.random() * 64));

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

      const disp = THREE.MathUtils.lerp(-0.1, 0.8, modFreqData);

      material.current.displacementScale = disp;
    }

    if (group.current) {
      group.current.rotation.x = clock.getElapsedTime() / 8;
      group.current.rotation.y = clock.getElapsedTime() / 5;
      group.current.rotation.z = clock.getElapsedTime() / 11;
    }
  });

  return (
    <group {...props} ref={group}>
      <mesh>
        <boxBufferGeometry attach="geometry" args={[2, 2, 2, 20, 20, 20]} />
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
