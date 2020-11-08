import React, { Suspense, useMemo } from "react";
import { MusicStoreHook } from "scenes/Shirts/stores/music";
import ReactivePrimitive from "scenes/Shirts/components/ReactivePrimitive";
import HypedAsset from "../modifiers/HypedAsset";
import Video from "@spacesvr/components/Video";
import { useEnvironment } from "@spacesvr/core/utils/hooks";

type ShirtsAssetsProps = {
  useMusicStore: MusicStoreHook;
};

const DIST_RANGE = [22, 50];
const VIDEO_LIMIT = 9;

const ShirtsAssets = (props: ShirtsAssetsProps) => {
  const { useMusicStore } = props;
  const locAssetts: Array<any> = [];
  let videoCount = 0;

  const { portal } = useEnvironment();

  const assets: Array<any> = useMemo(() => {
    if (!portal || !portal.assets) {
      return [];
    }

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
        locAssetts.push(
          <HypedAsset useMusicStore={useMusicStore} key={url}>
            <ReactivePrimitive
              url={url}
              position={position}
              rotation={[0, 4 * Math.PI * Math.random(), 0]}
              useMusicStore={useMusicStore}
              scale={[2, 2, 2]}
            />
          </HypedAsset>
        );
      } else if (type === "video") {
        videoCount++;
        if (videoCount < VIDEO_LIMIT)
          locAssetts.push(
            <HypedAsset useMusicStore={useMusicStore} key={url}>
              <Video
                src={url}
                ratio={[730, 730]}
                sizeScale={10 + 1 * Math.random()}
                position={position}
                rotation={[0, 2 * Math.PI * Math.random(), 0]}
                muted
                framed
                doubleSided
              />
            </HypedAsset>
          );
      }
    }

    return locAssetts;
  }, [portal]);

  return (
    <group>
      <Suspense fallback={null}>{assets}</Suspense>
    </group>
  );
};

export default ShirtsAssets;
