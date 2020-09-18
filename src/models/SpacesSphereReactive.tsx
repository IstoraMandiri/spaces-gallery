import * as THREE from "three";
import React, { useMemo, useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
// import { draco } from "drei";
// import { ModelProps } from "../types/model";
import { loadModel } from "../services/loader";
// import { BufferGeometry } from "three";
// import { useConvexPolyhedron } from "use-cannon";
import { EnvironmentStoreHook } from "stores/environment";
import { AudioAnalyserStoreHook } from "stores/audio";

type GLTFResult = GLTF & {
  nodes: {
    Sphere: THREE.Mesh;
  };
  materials: {
    Sphere: THREE.MeshStandardMaterial;
  };
};

//this should be moved to the types folder eventually
type AudioReactiveModelProps = JSX.IntrinsicElements["group"] & {
  useEnvStore: EnvironmentStoreHook;
  useAAStore: AudioAnalyserStoreHook;
  index: number;
  bucket_size: number;
};

export default function Model(props: AudioReactiveModelProps) {
  const { useEnvStore, useAAStore, index, bucket_size } = props;
  const setLoading = useEnvStore((st) => st.setLoading);
  const group = useRef<THREE.Group>();
  const sphereGroup = useRef<THREE.Group>();
  const { nodes, materials } = useLoader<GLTFResult>(
    GLTFLoader,
    "https://d27rt3a60hh1lx.cloudfront.net/models/SpacesSphere1/SpacesSphere1.glb",
    loadModel(setLoading)
  );

  const aa = useAAStore((st) => st.audioAnalyser);

  // materials.Sphere.metalness = 1;
  // materials.Sphere.refractionRatio = 0.75;
  materials.Sphere.color = new THREE.Color(0.2, 0.5, 0.5);

  // const wallsGeo = useMemo(() => {
  //   return new THREE.Geometry().fromBufferGeometry(
  //     nodes.Sphere.geometry as BufferGeometry
  //   );
  // }, [nodes]);
  // const [wallsHitbox] = useConvexPolyhedron(() => ({
  //   type: "Static",
  //   args: wallsGeo.clone().translate(0, 0.02, 0).scale(100, 100, 100),
  // }));

  useFrame(({ clock }) => {
    if (group.current) {
      const freq_data = aa?.getFrequencyData()[index]
        ? aa?.getFrequencyData()[index] / 10
        : 0;
      group.current.position.y = freq_data;
      group.current.rotation.y =
        (Math.PI / (16 + (Math.sin(clock.elapsedTime) + 0.5) * 5)) *
        index *
        bucket_size;
      group.current.children[0].scale.x = group.current.children[0].scale.y = group.current.children[0].scale.z =
        80 + freq_data * 9;
      group.current.children[0].rotation.y =
        (Math.sin(clock.elapsedTime / 2) + 0.5) * 5;
    }
  });

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      rotation={[0, (Math.PI / 16) * index * bucket_size, 0]}
    >
      <group ref={sphereGroup} scale={[100, 100, 100]}>
        <group position={[0.1, 0, 0]}>
          <mesh
            material={materials.Sphere}
            geometry={nodes.Sphere.geometry}
            castShadow
          />
        </group>
      </group>
    </group>
  );
}
