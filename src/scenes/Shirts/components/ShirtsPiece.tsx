import React, { Suspense, useEffect, useRef, useState } from "react";
import { EnvironmentStoreHook } from "stores/environment";
import { AudioAnalyserStoreHook } from "stores/audio";
import SpacesSphere from "models/SpacesSphere";
import Wall from "./ReactiveWall";
import { useFrame, useLoader } from "react-three-fiber";
// import { Cloth, ModifierStack } from "three.modifiers";
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
};

const ShirtsPiece = (props: ShirtsProps) => {
  const { useEnvStore, useAAStore } = props;
  //   const aa = useAAStore((st) => st.audioAnalyser);
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
  const objects: Array<Asset> = [
    {
      url:
        "https://d27rt3a60hh1lx.cloudfront.net/portals/shirt/wonglok831/117222381_120107479541576_5937787846796282665_n.jpg",
      type: "image",
    },
    {
      url:
        "https://d27rt3a60hh1lx.cloudfront.net/content/chadknight/harris/chaptsikc.jpg",
      type: "image",
    },
    {
      url:
        "https://d27rt3a60hh1lx.cloudfront.net/content/opening/robert/Robert1/Robert1.glb",
      type: "mesh",
    },
    {
      url:
        "https://d27rt3a60hh1lx.cloudfront.net/content/opening/robert/Robert1/Robert1.glb",
      type: "mesh",
    },
    {
      url:
        "https://d27rt3a60hh1lx.cloudfront.net/content/opening/dennis/2_compositions.mp4",
      type: "video",
    },
    {
      url:
        "https://d27rt3a60hh1lx.cloudfront.net/content/opening/dennis/2_compositions.mp4",
      type: "video",
    },
    {
      url:
        "https://d27rt3a60hh1lx.cloudfront.net/portals/shirt/wonglok831/120219462_689612748644727_4947143331971474529_n.mp4",
      type: "video",
    },
    {
      url:
        "https://d27rt3a60hh1lx.cloudfront.net/portals/shirt/wonglok831/120219462_689612748644727_4947143331971474529_n.mp4",
      type: "video",
    },
    {
      url:
        "https://d27rt3a60hh1lx.cloudfront.net/portals/shirt/wonglok831/120219462_689612748644727_4947143331971474529_n.mp4",
      type: "video",
    },
    {
      url:
        "https://d27rt3a60hh1lx.cloudfront.net/portals/shirt/wonglok831/120219462_689612748644727_4947143331971474529_n.mp4",
      type: "video",
    },
  ];

  assignAssetSlots(slots, objects);
  const meshes = [];
  for (let i = 0; i < objects.length; i++) {
    switch (objects[i].type) {
      case "image":
        console.log(objects[i]);
        meshes.push(
          <BasicImage
            src={objects[i].url}
            ratio={[1, 1]}
            sizeScale={5 + 1 * Math.random()}
            position={objects[i].position}
            rotation={[0, 4 * Math.PI * Math.random(), 0]}
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
          />
        );
        break;
      case "mesh":
        console.log(objects[i]);
        meshes.push(
          <Robert1 useEnvStore={useEnvStore} position={objects[i].position} />
        );
        break;
    }
  }

  // const texture = useLoader(
  //   THREE.TextureLoader,
  //   "https://d27rt3a60hh1lx.cloudfront.net/content/chadknight/harris/chaptsikc.jpg"
  // );

  // const mesh = useRef();

  // let modifier: ModifierStack;

  // const cloth = new Cloth(1, 0);

  // if (mesh.current) {
  //   modifier = new ModifierStack(mesh.current);

  //   cloth.setForce(0.02, -0.02, -0.02);

  //   modifier.addModifier(cloth);
  // }

  useFrame(({ clock }) => {
    //this is just to make sure the audio analyser is working
    // console.log(aa?.getFrequencyData());
    //update mesh modifiers
    // if (!modifier && mesh.current) {
    //   modifier = new ModifierStack(mesh.current);
    //   cloth.setForce(0.02, -0.02, -0.02);
    //   modifier.addModifier(cloth);
    // }
    // try {
    //   cloth.lockXMin(0);
    // } catch (err) {
    //   console.log(err);
    //   modifier.addModifier(cloth);
    // }
    // modifier && modifier.apply();
  });

  return (
    <group>
      <Suspense fallback={null}>
        {wallPieces}
        {/* <SpacesSphere useEnvStore={useEnvStore} /> */}
        {meshes}
        <mesh
          receiveShadow
          position={[0, -2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[50, 70, 32]} attach="geometry" />
          <meshStandardMaterial color="red" attach="material" />
        </mesh>
        {/* this is the floor of the scene ^^^ */}
        {/* <mesh
          ref={mesh}
          receiveShadow
          position={[0, 2, 0]}
          rotation={[0, 0, 0]}
        >
          <planeGeometry args={[50, 50, 32]} attach="geometry" />
          <meshStandardMaterial attach="material" map={texture} />
        </mesh> */}
      </Suspense>
    </group>
  );
};

export default ShirtsPiece;
