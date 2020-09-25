import * as THREE from "three";
import React, { useMemo, useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
// import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
// import { draco } from "drei";
// import { ModelProps } from "../types/model";
// import { loadModel } from "../services/loader";
// import { BufferGeometry } from "three";
// import { useConvexPolyhedron } from "use-cannon";
import { EnvironmentStoreHook } from "stores/environment";
import { AudioAnalyserStoreHook } from "stores/audio";

//this should be moved to the types folder eventually
type AudioReactiveModelProps = JSX.IntrinsicElements["group"] & {
  useEnvStore: EnvironmentStoreHook;
  useAAStore: AudioAnalyserStoreHook;
  index: number;
  bucket_size: number;
};

export default function Model(props: AudioReactiveModelProps) {
  const { useEnvStore, useAAStore, index, bucket_size } = props;
  //   const setLoading = useEnvStore((st) => st.setLoading);
  const group = useRef<THREE.Group>();
  const boxGroup = useRef<THREE.Group>();

  const aa = useAAStore((st) => st.audioAnalyser);

  useFrame(({ clock }) => {
    if (group.current) {
      const freq_data = aa?.getFrequencyData()[index]
        ? aa?.getFrequencyData()[index] / 10
        : 0;
      group.current.scale.y = 2 + freq_data;
    }
  });

  return (
    <group ref={group} {...props} dispose={null} rotation={[0, 0, 0]}>
      <group ref={boxGroup} scale={[100, 100, 100]}>
        <group position={[-((8 * 0.04) / 2) + 0.04 * index, 0, -0.01]}>
          <mesh receiveShadow castShadow>
            <boxGeometry args={[0.04, 0.02, 0.02]} attach="geometry" />
            <meshNormalMaterial color="red" attach="material" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
