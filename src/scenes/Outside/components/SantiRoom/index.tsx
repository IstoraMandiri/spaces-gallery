import React, { Suspense, useEffect, useRef, useState } from "react";
import { EnvironmentStoreHook } from "stores/environment";
import SantiRoomA from "models/SantiRoomA";
import { default as THREE, Group, WebGLRenderer } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Room from "./room";
import { useFrame, useLoader, useThree } from "react-three-fiber";
import { loadModel } from "../../../../services/loader";

type SantiProps = {
  useEnvStore: EnvironmentStoreHook;
  renderer: WebGLRenderer | undefined;
};

type GLTFResult = GLTF & {
  nodes: {
    display_l: THREE.Mesh;
    screen_l: THREE.Mesh;
    display_r: THREE.Mesh;
    screen_r: THREE.Mesh;
    Room: THREE.Mesh;
    Gallery_cut: THREE.Mesh;
    New_screen: THREE.Mesh;
    Human_mesh: THREE.SkinnedMesh;
    Spinner: THREE.Mesh;
    Treadmill: THREE.Mesh;
    Armature_rootJoint: THREE.Bone;
  };
  materials: {
    Room: THREE.MeshStandardMaterial;
    Display: THREE.MeshStandardMaterial;
    ["GALLERY.FULL"]: THREE.MeshStandardMaterial;
    Screen: THREE.MeshStandardMaterial;
  };
};

const SantiRoom = (props: SantiProps) => {
  const { useEnvStore, renderer } = props;

  const room = useRef<Group>();
  const { scene } = useThree();
  const setLoading = useEnvStore((st) => st.setLoading);
  const [added, setAdded] = useState(false);

  const gltf = useLoader<GLTFResult>(
    GLTFLoader,
    "https://d27rt3a60hh1lx.cloudfront.net/content/opening/santi/room_a/room_a.glb",
    loadModel(setLoading)
  );

  useEffect(() => {
    if (gltf && renderer && !room.current) {
      // remove cut gallery
      scene.remove(gltf.scene.children[0].children[2].children[2]);
      gltf.scene.children[0].children[2].children[2].visible = false;

      room.current = new Room(gltf, renderer);
      if (room.current) {
        room.current.name = "santi";
        room.current.traverse((obj) => (obj.frustumCulled = false));
      }
    }

    if (!added && room.current) {
      scene.add(room.current);
      room.current.rotateY((Math.PI * 5) / 3);
      room.current.translateY(0.5);
      room.current.scale.set(1, 1, 1);
      setAdded(false);
    }
  }, [gltf, renderer, room, added]);

  useFrame(({ clock }) => {
    if (room.current) {
      // @ts-ignore
      room.current.step(clock.getElapsedTime() * 1000);
    }
  });

  return null;
};

export default SantiRoom;
