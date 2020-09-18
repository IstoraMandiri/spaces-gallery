import React, { Suspense, useEffect, useRef, useState } from "react";
import { EnvironmentStoreHook } from "stores/environment";
import { AudioAnalyserStoreHook } from "stores/audio";
import SpacesSphere from "models/SpacesSphereReactive";
import { Color, Mesh } from "three";
import { useFrame } from "react-three-fiber";

type ShirtsProps = {
  useEnvStore: EnvironmentStoreHook;
  useAAStore: AudioAnalyserStoreHook;
};

const ShirtsPiece = (props: ShirtsProps) => {
  const { useEnvStore, useAAStore } = props;

  const aa = useAAStore((st) => st.audioAnalyser);
  //   const sphere = useRef<Mesh>();
  const num_spheres = 16;
  const bucket_size = 2;
  const initSpheres = (num: number) => {
    const rows = [];
    for (let i = 0; i < num; i++) {
      rows.unshift(
        <SpacesSphere
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

  useFrame(({ clock }) => {
    //this is just to make sure the audio analyser is working
    // console.log(aa?.getFrequencyData());
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
      <Suspense fallback={null}>{rows}</Suspense>
    </group>
  );
};

export default ShirtsPiece;
