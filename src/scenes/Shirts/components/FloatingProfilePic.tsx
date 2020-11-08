import { useRef } from "react";
import { useThree, useFrame } from "react-three-fiber";
import { MusicStoreHook } from "scenes/Shirts/stores/music";
import { Mesh } from "three";
import ReactivePrimitive from "scenes/Shirts/components/ReactivePrimitive";
import { useEnvironment } from "@spacesvr/core/utils/hooks";

type FloatingProfilePicProps = JSX.IntrinsicElements["group"] & {
  useMusicStore: MusicStoreHook;
};

const FloatingProfilePic = (props: FloatingProfilePicProps) => {
  const { useMusicStore } = props;

  const { portal } = useEnvironment();
  const src = portal?.instagram?.profile_pic_url_hd;

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
