import React, { Suspense, useRef } from "react";
import * as THREE from "three";
import Wall from "./ReactiveWall";
import { EnvironmentStoreHook } from "stores/environment";
import { MusicStoreHook } from "stores/music";
import { useFrame } from "react-three-fiber";

type WallPieceProps = {
  useEnvStore: EnvironmentStoreHook;
  useMusicStore: MusicStoreHook;
};

const WallPiece = (props: WallPieceProps) => {
  const { useEnvStore, useMusicStore } = props;

  const wallGroup = useRef<THREE.Group>();

  const num_spheres = 8;
  const bucket_size = 1;
  const initSpheres = (num: number) => {
    const wallPieces = [];
    for (let i = 0; i < num; i++) {
      wallPieces.unshift(
        <Wall
          useEnvStore={useEnvStore}
          useMusicStore={useMusicStore}
          index={i}
          bucket_size={bucket_size}
          key={i}
        />
      );
    }
    return wallPieces;
  };
  const wallPieces = initSpheres(num_spheres);

  useFrame(({ clock }) => {
    if (wallGroup.current) {
      wallGroup.current.rotation.y = clock.getElapsedTime() / 4.5;
    }
  });

  return <group ref={wallGroup}>{wallPieces}</group>;
};

export default WallPiece;
