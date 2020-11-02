import React from "react";
import Image from "@spacesvr/components/Image";
import Video from "@spacesvr/components/Video";
import { EnvironmentStoreHook } from "@spacesvr/core/stores/environment";

type Props = {
  useEnvStore: EnvironmentStoreHook;
};

const HectorRoom = (props: Props) => {
  const { useEnvStore } = props;

  return (
    <group rotation={[0, (2 / 3) * Math.PI, 0]}>
      <group position={[0, 2.5, -40]}>
        <Image
          src="https://spaces-gallery-assets.s3-us-west-1.amazonaws.com/content/opening/hector/Dior.jpg"
          ratio={[3307, 2550]}
          sizeScale={7.9}
          rotation={[0, 0, 0]}
          position={[0, 2.9, 0]}
          framed
        />
        <Image
          src="https://spaces-gallery-assets.s3-us-west-1.amazonaws.com/content/opening/hector/Frank+Ocean+Nikes.jpg"
          ratio={[1, 1]}
          sizeScale={5}
          rotation={[0, -Math.PI / 3, 0]}
          position={[8, 2.7, 4]}
          framed
        />
        <Video
          useEnvStore={useEnvStore}
          src="https://spaces-gallery-assets.s3-us-west-1.amazonaws.com/content/opening/hector/TravisVideo.mp4"
          ratio={[1260, 720]}
          sizeScale={4}
          rotation={[0, Math.PI / 3, 0]}
          position={[-7, 2, 5]}
          framed
          muted
        />
      </group>
    </group>
  );
};

export default HectorRoom;
