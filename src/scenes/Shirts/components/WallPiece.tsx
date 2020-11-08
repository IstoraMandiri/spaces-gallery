import React, { useRef } from "react";
import * as THREE from "three";
import Wall from "./ReactiveWall";
import { MusicStoreHook } from "scenes/Shirts/stores/music";
import { useFrame } from "react-three-fiber";

type WallPieceProps = {
  useMusicStore: MusicStoreHook;
};

const WallPiece = (props: WallPieceProps) => {
  const { useMusicStore } = props;

  const wallGroup = useRef<THREE.Group>();

  const num_spheres = 8;
  const bucketSize = 1;
  const initSpheres = (num: number) => {
    const wallPieces = [];
    for (let i = 0; i < num; i++) {
      wallPieces.unshift(
        <Wall
          useMusicStore={useMusicStore}
          index={i}
          bucketSize={bucketSize}
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
