import React from "react";
import FramedImage from "three-components/FramedImage";
import RobertPlaque from "three-components/RobertPlaque";
import { EnvironmentStoreHook } from "stores/environment";

const RobertRoom = (props: { useEnvStore: EnvironmentStoreHook }) => {
  const { useEnvStore } = props;
  return (
    <group rotation={[0, Math.PI / 3, 0]}>
      <group position={[0, 5, -45]}>
        <FramedImage
          src="https://d27rt3a60hh1lx.cloudfront.net/content/opening/robert/getsusall.jpg"
          ratio={[1, 1]}
          sizeScale={5}
          position={[8.5, 0, 8]}
          rotation={[0, -Math.PI / 2, 0]}
          floating
        />
        <RobertPlaque
          label="3"
          useEnvStore={useEnvStore}
          position={[8.5, -0.25, 9]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <FramedImage
          src="https://d27rt3a60hh1lx.cloudfront.net/content/opening/robert/cottoncandy.jpg"
          ratio={[1, 1]}
          sizeScale={5}
          position={[7, 0, 0]}
          rotation={[0, -Math.PI / 3, 0]}
          floating
        />
        <RobertPlaque
          label="1"
          useEnvStore={useEnvStore}
          position={[8, -0.25, 1]}
          rotation={[0, -Math.PI / 3, 0]}
        />

        <FramedImage
          src="https://d27rt3a60hh1lx.cloudfront.net/content/opening/robert/rapture.jpg"
          ratio={[2, 2.5]}
          sizeScale={5}
          position={[0, 0, -4]}
          floating
        />
        <RobertPlaque
          label="5"
          useEnvStore={useEnvStore}
          position={[1, 0, -4]}
        />
        <FramedImage
          src="https://d27rt3a60hh1lx.cloudfront.net/content/opening/robert/dontgoin.jpg"
          ratio={[1, 1]}
          sizeScale={5}
          position={[-7, 0, 0]}
          rotation={[0, Math.PI / 3, 0]}
          floating
        />
        <RobertPlaque
          label="2"
          useEnvStore={useEnvStore}
          position={[-6, -0.25, -1]}
          rotation={[0, Math.PI / 3, 0]}
        />
        <FramedImage
          src="https://d27rt3a60hh1lx.cloudfront.net/content/opening/robert/spaceship.jpg"
          ratio={[1, 1]}
          sizeScale={5}
          position={[-8.5, 0, 8]}
          rotation={[0, Math.PI / 2, 0]}
          floating
        />
        <RobertPlaque
          label="4"
          useEnvStore={useEnvStore}
          position={[-8.5, -0.25, 7]}
          rotation={[0, Math.PI / 2, 0]}
        />
      </group>
    </group>
  );
};

export default RobertRoom;
