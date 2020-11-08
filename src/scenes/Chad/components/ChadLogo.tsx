import { useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";
import { Mesh } from "three";

const IMAGE_SRC =
  "https://d27rt3a60hh1lx.cloudfront.net/content/chadknight/chadknight-profile.jpg";

const ChadLogo = (props: JSX.IntrinsicElements["group"]) => {
  const texture = useLoader(THREE.TextureLoader, IMAGE_SRC);

  const group = useRef<Mesh>();

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.position.y = 0.2 * Math.sin(clock.getElapsedTime() / 4);
    }
  });

  return (
    <group {...props}>
      <group ref={group}>
        <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
          <boxBufferGeometry args={[3, 3, 0.2]} attach="geometry" />
          <meshStandardMaterial color="white" attach="material" map={texture} />
        </mesh>
      </group>
    </group>
  );
};

export default ChadLogo;
