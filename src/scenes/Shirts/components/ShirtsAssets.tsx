import React, { Suspense, useMemo } from "react";
import { EnvironmentStoreHook } from "stores/environment";
import { MusicStoreHook } from "stores/music";
import BasicImage from "three-components/BasicImage";
import FramedMutedVideo from "three-components/FramedMutedVideo";
import ReactivePrimitive from "three-components/ReactivePrimitive";

type ShirtsAssetsProps = {
  useEnvStore: EnvironmentStoreHook;
  useMusicStore: MusicStoreHook;
  portal?: Portal;
};

const DIST_RANGE = [22, 50];

const ShirtsAssets = (props: ShirtsAssetsProps) => {
  const { useEnvStore, useMusicStore, portal } = props;

  const assets: Array<any> = useMemo(() => {
    if (!portal || !portal.assets) {
      return [];
    }

    const locAssets: Array<any> = [];
    for (const asset of portal.assets) {
      const type = asset.type;
      const url = asset.url;
      const dist =
        Math.random() * (DIST_RANGE[1] - DIST_RANGE[0]) + DIST_RANGE[0];
      const angle = Math.random() * 2 * Math.PI;

      const x = dist * Math.cos(angle);
      const z = dist * Math.sin(angle);
      const position: [number, number, number] = [x, 3 + 5 * Math.random(), z];

      if (type === "image") {
        if (Math.random() < 0.35) {
          locAssets.push(
            <BasicImage
              key={url}
              src={url}
              ratio={[1, 1]}
              sizeScale={5 + 1 * Math.random()}
              position={position}
              rotation={[0, 4 * Math.PI * Math.random(), 0]}
              useMusicStore={useMusicStore}
              floating
            />
          );
        } else {
          locAssets.push(
            <ReactivePrimitive
              key={url}
              type={type}
              url={url}
              position={position}
              rotation={[0, 4 * Math.PI * Math.random(), 0]}
              useMusicStore={useMusicStore}
              scale={[2, 2, 2]}
            />
          );
        }
      } else if (type === "video") {
        locAssets.push(
          <FramedMutedVideo
            key={url}
            src={url}
            ratio={[730, 730]}
            sizeScale={10 + 1 * Math.random()}
            position={position}
            rotation={[0, 2 * Math.PI * Math.random(), 0]}
            useEnvStore={useEnvStore}
            floating
            floatHeight={5}
          />
        );
      }
    }

    return locAssets;
  }, [portal]);

  return (
    <group>
      <Suspense fallback={null}>{assets}</Suspense>
    </group>
  );
};

export default ShirtsAssets;
