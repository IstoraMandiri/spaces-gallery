import React, { useRef } from "react";
import { useThree, useFrame } from "react-three-fiber";
import { MusicStoreHook } from "scenes/Shirts/stores/music";
import { Mesh } from "three";
import ReactivePrimitive from "scenes/Shirts/components/ReactivePrimitive";

type FloatingProfilePicProps = JSX.IntrinsicElements["group"] & {
  useMusicStore: MusicStoreHook;
  src?: string;
};

const FloatingProfilePic = (props: FloatingProfilePicProps) => {
  const { useMusicStore, src } = props;

  const { camera } = useThree();
  const group = useRef<Mesh>();

  useFrame(({ clock }) => {
    if (src) {
      const current = group.current;
      if (current && current.position) {
        current.position.x =
          camera.position.x + Math.sin(clock.elapsedTime / 2) * 4;
        current.position.y = camera.position.y + 1;
        current.position.z =
          camera.position.z + Math.cos(clock.elapsedTime / 2) * 4;
      }
    }
  });

  if (!src) {
    return <></>;
  }

  return (
    <group ref={group}>
      <ReactivePrimitive
        url={src}
        useMusicStore={useMusicStore}
        primitive={0}
      />
    </group>
  );
};

export default FloatingProfilePic;
