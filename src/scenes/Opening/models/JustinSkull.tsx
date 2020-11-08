/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

import { Color } from "three";
import { useGLTF } from "@react-three/drei";

type GLTFResult = GLTF & {
  nodes: {
    JUSTINSKULL: THREE.Mesh;
  };
  materials: {
    SKULL: THREE.MeshStandardMaterial;
  };
};

const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/content/opening/justin/JustinSkull2/JustinSkull2.glb";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const mesh = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(FILE_URL) as GLTFResult;

  materials.SKULL.color = new Color(0x4a4a4a);
  materials.SKULL.metalness = 1;
  // materials.SKULL.reflectivity = 1;
  // materials.SKULL.shininess = 50;
  // materials.SKULL.specular = 0xffffff;

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() / 10;
    }
  });

  return (
    <group ref={group} {...props} dispose={null} name="justin-skull">
      <group scale={[100, 100, 100]} ref={mesh}>
        <mesh
          material={materials.SKULL}
          geometry={nodes.JUSTINSKULL.geometry}
        />
      </group>
    </group>
  );
}

useGLTF.preload(FILE_URL);
