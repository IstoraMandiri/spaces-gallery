import React, { useRef } from "react";
import { useThree, useFrame } from "react-three-fiber";
import { MusicStoreHook } from "stores/music";
import { Mesh } from "three";
import ReactivePrimitive from "three-components/ReactivePrimitive";

type FloatingProfilePicProps = JSX.IntrinsicElements["group"] & {
  useMusicStore: MusicStoreHook;
  src?: string;
};

const FloatingProfilePic = (props: FloatingProfilePicProps) => {
  const { useMusicStore, src } = props;

  const { camera } = useThree();
  const group = useRef<Mesh>();

  useFrame(({ clock }) => {
    const current = group.current;
    if (current && current.position) {
      current.position.x =
        camera.position.x + Math.sin(clock.elapsedTime / 2) * 10;
      current.position.y = camera.position.y + 40;
      current.position.z =
        camera.position.z + Math.cos(clock.elapsedTime / 2) * 10;
    }
  });

  if (!src) {
    return <></>;
  }

  return (
    <group ref={group}>
      <ReactivePrimitive
        url={src}
        rotation={[0, Math.PI, 0]}
        useMusicStore={useMusicStore}
        primitive={0}
        scale={[6, 6, 6]}
      />
    </group>
  );
};

export default FloatingProfilePic;
