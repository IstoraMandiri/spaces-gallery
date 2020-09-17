import React, { Suspense, useEffect, useRef, useState } from "react";
import { EnvironmentStoreHook } from "stores/environment";
import { softShadows } from "drei";

import SpacesShirt from "models/SpacesShirt";
import { UseStore } from "zustand";
import { Canvas } from "react-three-fiber";

// @ts-ignore
softShadows();

const Base = () => {
  return (
    <group>
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderBufferGeometry attach="geometry" args={[5, 5, 0.1, 80]} />
        <meshStandardMaterial attach="material" color="grey" />
      </mesh>
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <cylinderBufferGeometry attach="geometry" args={[3.5, 3.5, 0.2, 80]} />
        <meshStandardMaterial attach="material" color="grey" />
      </mesh>
    </group>
  );
};

type DisplayProps = {
  useEnvStore: UseStore<any>;
  shopifyState?: any;
  raycaster?: any;
  position: [number, number, number];
};

const SpacesDisplay = (props: DisplayProps) => {
  const { useEnvStore, position } = props;
  const [hover, setHover] = useState<boolean>(false);
  const shirt = useRef();

  return (
    <group position={position}>
      <directionalLight
        position={[0, 5, 7]}
        target={shirt.current}
        intensity={2}
        castShadow
      />
      <group ref={shirt} position={[0, -2, 0]}>
        <Suspense fallback={null}>
          <SpacesShirt useEnvStore={useEnvStore} />
        </Suspense>
      </group>
      <mesh
        position={[8, 2, 0]}
        castShadow
        // mouseOver={() => {setHover(!hover)}}
      >
        <sphereBufferGeometry attach="geometry" args={[1, 50, 50]} />
        <meshStandardMaterial attach="material" color="blue" />
      </mesh>
      <Base />
    </group>
  );
};

export default SpacesDisplay;
