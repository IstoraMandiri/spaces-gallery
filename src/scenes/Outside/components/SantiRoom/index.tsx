import React, { Suspense, useEffect, useRef, useState } from "react";
import { EnvironmentStoreHook } from "stores/environment";
import SantiRoomA from "models/SantiRoomA";
import { WebGLRenderer } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import Room from "./room";
import { useFrame } from "react-three-fiber";

type SantiProps = {
  useEnvStore: EnvironmentStoreHook;
  renderer: WebGLRenderer | undefined;
};

const SantiRoom = (props: SantiProps) => {
  const { useEnvStore, renderer } = props;

  const [gltf, setGLTF] = useState<GLTF>();
  const room = useRef();

  useEffect(() => {
    if (gltf && renderer && !room.current) {
      room.current = new Room(gltf, renderer);
    }
  }, [gltf, renderer, room]);

  useFrame(({ clock }) => {
    if (room.current) room.current.step(clock.getElapsedTime());
  });

  return (
    <group rotation={[0, (Math.PI * 5) / 3, 0]}>
      <Suspense fallback={null}>
        <SantiRoomA useEnvStore={useEnvStore} setGLTF={setGLTF} />
      </Suspense>
    </group>
  );
};

export default SantiRoom;
