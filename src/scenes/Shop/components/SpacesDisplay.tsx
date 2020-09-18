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
  position: [number, number, number];
  overlay: boolean;
  setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpacesDisplay = (props: DisplayProps) => {
  const { useEnvStore, position, overlay, setOverlay } = props;
  const [hover, setHover] = useState<boolean>(false);
  const shirt = useRef();

  return (
    <group position={position}>
      <directionalLight
        position={[0, 5, 7]}
        target={shirt.current}
        intensity={1.5}
        castShadow
      />
      <directionalLight
        position={[0, 5, -7]}
        target={shirt.current}
        intensity={0.5}
        castShadow
      />
      <directionalLight
        position={[7, 5, 0]}
        target={shirt.current}
        intensity={0.2}
        castShadow
      />
      <directionalLight
        position={[-7, 5, 0]}
        target={shirt.current}
        intensity={0.2}
        castShadow
      />
      <group ref={shirt} position={[0, -5, 0]}>
        <Suspense fallback={null}>
          <SpacesShirt
            useEnvStore={useEnvStore}
            overlay={overlay}
            setOverlay={setOverlay}
          />
        </Suspense>
      </group>
      <Base />
    </group>
  );
};

export default SpacesDisplay;
