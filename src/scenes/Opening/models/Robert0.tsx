/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from "three";
import { useRef } from "react";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

import { useGLTF } from "@react-three/drei";

type GLTFResult = GLTF & {
  nodes: {
    CUBEROBERT: THREE.Mesh;
    POSTROBERT: THREE.Mesh;
  };
  materials: {
    ["MATERIAL.ROBERT"]: THREE.MeshStandardMaterial;
  };
};

const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/content/opening/robert/Robert0/Robert0.glb";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(FILE_URL) as GLTFResult;

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0.020903, -0.010631, 0]}>
        <mesh
          material={materials["MATERIAL.ROBERT"]}
          geometry={nodes.CUBEROBERT.geometry}
          position={[-0.000727, 0.00938, 0]}
        />
        <mesh
          material={materials["MATERIAL.ROBERT"]}
          geometry={nodes.POSTROBERT.geometry}
          position={[0.000727, -0.00938, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload(FILE_URL);
