import React from "react";
import { Color } from "three";
import { EnvironmentStoreHook } from "stores/environment";
import { Text } from "drei";
import Logo from "three-components/Logo";
import FramedImage from "three-components/FramedImage";
import ChadLogo from "./ChadLogo";

const FRAME_COLOR = new Color(0xffffff);

const ChadEntrance = (props: { useEnvStore: EnvironmentStoreHook }) => {
  const { useEnvStore } = props;

  return (
    <group position={[-2, -2, 65]}>
      <pointLight position={[-2, 2, -6]} intensity={0.5} distance={10} />
      <group
        name="wall"
        rotation={[0, Math.PI, 0]}
        position={[-5, 0.5, 4]}
        scale={[2, 2, 2]}
      >
        <Text scale={[6, 6, 6]} position={[-4, -0.7, 0]} textAlign="left">
          CHAD KNIGHT
        </Text>
        <ChadLogo
          useEnvStore={useEnvStore}
          position={[-4, 0.6, 0]}
          scale={[0.8, 0.8, 0.8]}
        />
        <Text scale={[3.5, 3.5, 3.5]} position={[-1.6, 0, 0]}>
          x
        </Text>
        <Logo
          useEnvStore={useEnvStore}
          floating
          rotation={[0, Math.PI / 2, 0]}
        />
      </group>
      <group
        name="back-wall"
        rotation={[0, 0, 0]}
        position={[0, 1.5, -9.4]}
        scale={[0.7, 0.7, 0.7]}
      >
        <group position={[-2.75, -1.75, 0]} scale={[2, 2, 2]}>
          <Text
            position={[-0.15, 1, 0]}
            scale={[4.5 * 1.6, 6 * 1.6, 4.5 * 1.6]}
            anchorY="middle"
            maxWidth={3}
            textAlign="left"
            color="white"
          >
            {"VIRTUAL GENESIS"}
          </Text>
          <Text
            position={[0, -0.2, 0]}
            scale={[2, 2, 2]}
            anchorY="middle"
            maxWidth={3}
            textAlign="left"
            color="white"
          >
            {
              "Virtual Genesis is about God breathing life into a virtual universe.\
          It's a representation of the first code defined, digitally enabled,\
          virtual volumetric space. It represents the skin or peripheral\
          exoskeleton humans inhabit to enter the virtual world."
            }
          </Text>
        </group>
      </group>
      <group
        name="right-wall"
        rotation={[0, -Math.PI / 2, 0]}
        position={[4.3, 0, -7]}
        scale={[0.7, 0.7, 0.7]}
      >
        <group position={[2.75, -0.25, 0]}>
          <FramedImage
            sizeScale={3}
            ratio={[1, 1]}
            src={
              "https://d27rt3a60hh1lx.cloudfront.net/content/chadknight/harris/chaptsikc.jpg"
            }
            floating
            color={FRAME_COLOR}
            position={[-3.5, 0, 0]}
          />
          <FramedImage
            sizeScale={3}
            ratio={[1, 1]}
            src={
              "https://d27rt3a60hh1lx.cloudfront.net/content/chadknight/harris/fishing.jpg"
            }
            floating
            color={FRAME_COLOR}
          />
          <FramedImage
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
        <group position={[2.5, -2, 0.75]} scale={[0.4, 0.4, 0.4]}>
          <Text
            position={[0, 0, 0]}
            scale={[3, 3, 3]}
            anchorY="middle"
            maxWidth={3}
            textAlign="left"
            color="black"
          >
            {"Music provided by Harris Cole"}
          </Text>
          <mesh position={[0, 0, -0.25 / 2 - 0.001]}>
            <boxBufferGeometry args={[7, 1.5, 0.25]} attach="geometry" />
            <meshStandardMaterial color="white" attach="material" />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default ChadEntrance;
