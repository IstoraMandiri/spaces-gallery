import React, { Suspense, useEffect, useRef, useState } from "react";
import { EnvironmentStoreHook } from "stores/environment";
import { AudioAnalyserStoreHook } from "stores/audio";
import Wall from "./ReactiveWall";
import { useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";
import BasicImage from "three-components/BasicImage";
import Robert1 from "models/Robert1Generic"; //need to make a custom component this is placeholder
import FramedMutedVideo from "three-components/FramedMutedVideo"; //need to make a custom component this is placeholder

type Asset = {
  url: string;
  type: string;
  position?: THREE.Vector3;
};

const assignAssetSlots = (
  slots: Array<THREE.Vector3>,
  objects: Array<Asset>
) => {
  for (let i = 0; i < objects.length; i++) {
    const rand = Math.floor(Math.random() * slots.length);
    objects[i].position = slots[rand];
    slots.splice(rand, 1);
  }
};

type ShirtsProps = {
  useEnvStore: EnvironmentStoreHook;
  useAAStore: AudioAnalyserStoreHook;
  json?: any;
};

const ShirtsPiece = (props: ShirtsProps) => {
  const { useEnvStore, useAAStore, json } = props;

  const num_spheres = 8;
  const bucket_size = 1;
  const initSpheres = (num: number) => {
    const wallPieces = [];
    for (let i = 0; i < num; i++) {
      wallPieces.unshift(
        <Wall
          useEnvStore={useEnvStore}
          useAAStore={useAAStore}
          index={i}
          bucket_size={bucket_size}
          key={i}
        />
      );
    }
    return wallPieces;
  };
  const wallPieces = initSpheres(num_spheres);

  //length of slots array and objects array should always be equal
  const slots = [
    new THREE.Vector3(3, 0, 8),
    new THREE.Vector3(-8, 0, 13),
    new THREE.Vector3(-5, 0, 10),
    new THREE.Vector3(3, 0, -12),
    new THREE.Vector3(8, 0, 10),
    new THREE.Vector3(-3, 0, 15),
    new THREE.Vector3(4, 0, -5),
    new THREE.Vector3(0, 0, 13),
    new THREE.Vector3(-1, 0, -14),
    new THREE.Vector3(-3, 0, -10),
  ];

  const objects = json
    ? json.assets
    : [
        {
          url:
            "https://d27rt3a60hh1lx.cloudfront.net/content/opening/robert/Robert1/Robert1.glb",
          type: "3d",
        },
      ]; // if the assets json has not returned fall back to this

  assignAssetSlots(slots, objects);

  const meshes = [];
  for (let i = 0; i < objects.length; i++) {
    switch (objects[i].type) {
      case "image":
        meshes.push(
          <BasicImage
            key={i}
            src={objects[i].url}
            ratio={[1, 1]}
            sizeScale={5 + 1 * Math.random()}
            position={objects[i].position}
            rotation={[0, 4 * Math.PI * Math.random(), 0]}
            useAAStore={useAAStore}
            floating
          />
        );
        break;
      case "video":
        meshes.push(
          <FramedMutedVideo
            src={objects[i].url}
            ratio={[730, 730]}
            sizeScale={5 + 1 * Math.random()}
            position={objects[i].position}
            rotation={[0, 2 * Math.PI * Math.random(), 0]}
            useEnvStore={useEnvStore}
            floating
            floatHeight={5}
            key={i}
          />
        );
        break;
      case "3d":
        meshes.push(
          <Robert1
            key={i}
            useEnvStore={useEnvStore}
            position={objects[i].position}
          />
        );
        break;
    }
  }

  useFrame(({ clock }) => {
    //this is just to make sure the audio analyser is working
    // console.log(aa?.getFrequencyData());
  });

  return (
    <group>
      <Suspense fallback={null}>
        {wallPieces}
        {meshes}
      </Suspense>
    </group>
  );
};

export default ShirtsPiece;
