import React, { Suspense, useEffect, useRef, useState } from "react";
import { EnvironmentStoreHook } from "stores/environment";
import { AudioAnalyserStoreHook } from "stores/audio";
import SpacesSphere from "models/SpacesSphere";
import Wall from "./ReactiveWall";
import { Color, Mesh } from "three";
import { useFrame, useLoader } from "react-three-fiber";
import { Cloth, ModifierStack, Noise } from "three.modifiers";
import * as THREE from "three";

type ShirtsProps = {
  useEnvStore: EnvironmentStoreHook;
  useAAStore: AudioAnalyserStoreHook;
};

const ShirtsPiece = (props: ShirtsProps) => {
  const { useEnvStore, useAAStore } = props;

  const aa = useAAStore((st) => st.audioAnalyser);
  //   const sphere = useRef<Mesh>();
  const num_spheres = 8;
  const bucket_size = 1;
  const initSpheres = (num: number) => {
    const rows = [];
    for (let i = 0; i < num; i++) {
      rows.unshift(
        <Wall
          useEnvStore={useEnvStore}
          useAAStore={useAAStore}
          index={i}
          bucket_size={bucket_size}
        />
      );
    }
    return rows;
  };
  const rows = initSpheres(num_spheres);

  const texture = useLoader(
    THREE.TextureLoader,
    "https://d27rt3a60hh1lx.cloudfront.net/content/chadknight/harris/chaptsikc.jpg"
  );

  const mesh = useRef();

  let modifier: ModifierStack;

  const cloth = new Cloth(1, 0);

  if (mesh.current) {
    modifier = new ModifierStack(mesh.current);

    cloth.setForce(0.02, -0.02, -0.02);

    modifier.addModifier(cloth);
  }

  useFrame(({ clock }) => {
    //this is just to make sure the audio analyser is working
    // console.log(aa?.getFrequencyData());

    //update mesh modifiers on the floor mesh
    try {
      cloth.lockXMin(0);
    } catch (err) {
      console.log(err);
    }
    modifier && modifier.apply();
  });

  //   const [realColor, setColor] = useState<string>("black");
  //   useEffect(() => {
  //     if (realColor === "black") {
  //       setColor("#28FA92");
  //     } else {
  //       setColor(colors[Math.floor(Math.random() * colors.length)]);
  //     }
  //   }, [color]);

  return (
    <group>
      <Suspense fallback={null}>
        {rows}
        <SpacesSphere useEnvStore={useEnvStore} />
        <mesh
          receiveShadow
          position={[0, -2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[50, 70, 32]} attach="geometry" />
          <meshStandardMaterial color="red" attach="material" />
        </mesh>
        <mesh
          ref={mesh}
          receiveShadow
          position={[0, 2, 0]}
          rotation={[0, 0, 0]}
        >
          <planeGeometry args={[50, 50, 32]} attach="geometry" />
          <meshStandardMaterial attach="material" map={texture} />
        </mesh>
      </Suspense>
    </group>
  );
};

export default ShirtsPiece;
