import React from "react";
import FramedImage from "three-components/FramedImage";
import FramedVideo from "three-components/FramedVideo";
import { UseStore } from "zustand";
import { EnvironmentStoreHook } from "../../../stores/environment";

type Props = {
  useEnvStore: EnvironmentStoreHook;
};

const HectorRoom = (props: Props) => {
  const { useEnvStore } = props;

  return (
    <group rotation={[0, (2 / 3) * Math.PI, 0]}>
      <group position={[0, 2.5, -40]}>
        {/*<mesh>*/}
        {/*  <boxBufferGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />*/}
        {/*  <meshStandardMaterial attach="material" color="red" />*/}
        {/*</mesh>*/}
        <FramedImage
          src="https://spaces-gallery-assets.s3-us-west-1.amazonaws.com/content/opening/hector/Dior.jpg"
          ratio={[3307, 2550]}
          sizeScale={9}
          rotation={[0, 0, 0]}
          position={[0, 3.075, 0]}
          floating
        />
        <FramedVideo
          useEnvStore={useEnvStore}
          src="https://spaces-gallery-assets.s3-us-west-1.amazonaws.com/content/opening/hector/TravisVideo.mp4"
          ratio={[1260, 720]}
          sizeScale={4}
          rotation={[0, -Math.PI / 3, 0]}
          position={[8, 2, 4]}
          audioPosition={[-34.5, 4.5, 11]}
          audioRotation={[0, (1 / 3) * Math.PI, 0]}
          floating
        />
      </group>
    </group>
  );
};

export default HectorRoom;
