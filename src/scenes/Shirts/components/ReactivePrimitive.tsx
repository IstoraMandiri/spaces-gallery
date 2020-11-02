import React, { useMemo, useRef } from "react";
import { MusicStoreHook } from "scenes/Shirts/stores/music";
import { useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";
import SimplexNoise from "simplex-noise";

type ReactiveProps = JSX.IntrinsicElements["group"] & {
  url: string;
  useMusicStore: MusicStoreHook;
  primitive?: number;
};

let min = 1000000;
let max = -10000000;

const MIN_DISP = -0.2;
const MAX_DISP = 0.85;

const ReactivePrimitive = (props: ReactiveProps) => {
  const { url, primitive, useMusicStore } = props;

  const seed = useMemo(() => Math.random(), []);
  const simplex = useMemo(() => new SimplexNoise(seed.toString()), [seed]);
  const texture = useLoader(THREE.TextureLoader, url);
  const aa = useMusicStore((st) => st.audioAnalyser);
  const group = useRef<THREE.Group>();
  const innerGroup = useRef<THREE.Group>();
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

      const disp = THREE.MathUtils.lerp(MIN_DISP, MAX_DISP, modFreqData);

      material.current.displacementScale = disp;
    }

    if (group.current) {
      group.current.rotation.x = clock.getElapsedTime() / (7 + seed * 30);
      group.current.rotation.y = clock.getElapsedTime() / (10 + seed * 30);
      group.current.rotation.z = clock.getElapsedTime() / (9 + seed * 30);
    }

    if (innerGroup.current) {
      const FREQ = 0.1 + seed * 0.3;
      const time = clock.getElapsedTime();
      innerGroup.current.position.x = simplex.noise2D(100, time * FREQ);
      innerGroup.current.position.y = simplex.noise2D(200, time * FREQ);
      innerGroup.current.position.z = simplex.noise2D(300, time * FREQ);
    }
  });

  const primitives = [
    <boxBufferGeometry
      key={1}
      attach="geometry"
      args={[2, 2, 2, 40, 40, 40]}
    />,
    <cylinderBufferGeometry
      key={2}
      attach="geometry"
      args={[1, 1, 4, 32, 32]}
    />,
    <sphereBufferGeometry key={2} attach="geometry" args={[2, 32, 32]} />,
  ];
  const randomPrimitive =
    typeof primitive === "number"
      ? primitives[primitive % primitives.length]
      : primitives[Math.floor(Math.random() * primitives.length)];

  const locSeed = Math.max(((seed * 10000) % 1) - 0.5, 0);
  const SCALE = 1 + locSeed * locSeed * 3;
  const HEIGHT = locSeed * 18;

  return (
    <group scale={[SCALE, SCALE, SCALE]} position-y={HEIGHT}>
      <group {...props} ref={group}>
        <group ref={innerGroup}>
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
          <mesh scale={[1 + MIN_DISP, 1 + MIN_DISP, 1 + MIN_DISP]}>
            {randomPrimitive}
            <meshNormalMaterial attach="material" />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default ReactivePrimitive;
