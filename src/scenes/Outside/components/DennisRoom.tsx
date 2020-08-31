import React from "react";
import FramedImage from "three-components/FramedImage";
import FramedMutedVideo from "three-components/FramedMutedVideo";
import { EnvironmentStoreHook } from "stores/environment";

type DennisProps = {
  useEnvStore: EnvironmentStoreHook;
};

const DennisRoom = (props: DennisProps) => {
  const { useEnvStore } = props;

  return (
    <group rotation={[0, (Math.PI * 4) / 3, 0]}>
      <group position={[0, 5.2, -45]}>
        <FramedImage
          src="https://d27rt3a60hh1lx.cloudfront.net/content/opening/dennis/5_water_1.jpg"
          ratio={[2, 1.5]}
          sizeScale={5}
          position={[8.5, 0, 8]}
          rotation={[0, -Math.PI / 2, 0]}
          floating
        />
        <FramedImage
          src="https://d27rt3a60hh1lx.cloudfront.net/content/opening/dennis/5_water_2.jpg"
          ratio={[2, 1.5]}
          sizeScale={5}
          position={[6.5, 0, 0]}
          rotation={[0, -Math.PI / 3, 0]}
          floating
        />
        <FramedMutedVideo
          src="https://d27rt3a60hh1lx.cloudfront.net/content/opening/dennis/2_compositions.mp4"
          ratio={[730, 782]}
          sizeScale={5}
          position={[0, 0, -4]}
          useEnvStore={useEnvStore}
        />
        <FramedImage
          src="https://d27rt3a60hh1lx.cloudfront.net/content/opening/dennis/5_water_3.jpg"
          ratio={[1.5, 2]}
          sizeScale={5}
          position={[-6.5, 0, 0]}
          rotation={[0, Math.PI / 3, 0]}
          floating
        />
        <FramedImage
          src="https://d27rt3a60hh1lx.cloudfront.net/content/opening/dennis/5_water_4.jpg"
          ratio={[1.5, 2]}
          sizeScale={5}
          position={[-8.5, 0, 8]}
          rotation={[0, Math.PI / 2, 0]}
          floating
        />
      </group>
    </group>
  );
};

export default DennisRoom;
