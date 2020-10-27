import Image from "@spacesvr/components/Image";
import { Text } from "@react-three/drei";
import React from "react";
import { Color } from "three";

const FRAME_COLOR = new Color(0xffffff);

const RightWall = () => {
  return (
    <group
      name="right-wall"
      rotation={[0, -Math.PI / 2, 0]}
      position={[4.3, -0.35, -7.2]}
      scale={[0.7, 0.7, 0.7]}
    >
      <group position={[2.75, -0.25, 0]}>
        <Image
          sizeScale={3}
          ratio={[1, 1]}
          src={
            "https://d27rt3a60hh1lx.cloudfront.net/content/chadknight/harris/chaptsikc.jpg"
          }
          floating
          color={FRAME_COLOR}
          position={[-3.5, 0, 0]}
        />
        <Image
          sizeScale={3}
          ratio={[1, 1]}
          src={
            "https://d27rt3a60hh1lx.cloudfront.net/content/chadknight/harris/fishing.jpg"
          }
          floating
          color={FRAME_COLOR}
        />
        <Image
          sizeScale={3}
          ratio={[1, 1]}
          src={
            "https://d27rt3a60hh1lx.cloudfront.net/content/chadknight/harris/september.jpg"
          }
          floating
          color={FRAME_COLOR}
          position={[3.5, 0, 0]}
        />
      </group>
      <group position={[2.5, -1.7, 0.6]} scale={[0.35, 0.35, 0.35]}>
        <Text
          position={[0, 0.2, 0]}
          scale={[3.5, 3.5, 3.5]}
          anchorY="middle"
          maxWidth={3}
          textAlign="left"
          color="black"
        >
          {"Music provided by Harris Cole"}
        </Text>
        <Text
          position={[2.3, -0.3, 0]}
          scale={[2.5, 2.5, 2.5]}
          anchorY="middle"
          maxWidth={3}
          anchorX="right"
          color="black"
        >
          @_harris.cole
        </Text>
        <Text
          position={[-2.3, -0.3, 0]}
          scale={[2.5, 2.5, 2.5]}
          anchorY="middle"
          maxWidth={3}
          anchorX="left"
          color="black"
        >
          https://gone.fish
        </Text>
        <mesh position={[0, 0, -0.25 / 2 - 0.001]}>
          <boxBufferGeometry args={[7, 1.5, 0.25]} attach="geometry" />
          <meshStandardMaterial color={FRAME_COLOR} attach="material" />
        </mesh>
      </group>
    </group>
  );
};

export default RightWall;
