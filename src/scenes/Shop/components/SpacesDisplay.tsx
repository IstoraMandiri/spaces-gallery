import React, { Suspense, useEffect, useRef, useState } from "react";
import { UseStore } from "zustand";
import { Text } from "drei";

import SpacesShirt from "models/SpacesShirt";
import { isMobile } from "react-device-detect";

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
      />
      <directionalLight
        position={[0, 5, -7]}
        target={shirt.current}
        intensity={0.5}
      />
      <directionalLight
        position={[7, 5, 0]}
        target={shirt.current}
        intensity={0.2}
      />
      <directionalLight
        position={[-7, 5, 0]}
        target={shirt.current}
        intensity={0.2}
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
      <group name="cylinderBase">
        <mesh position={[0, 0, 0]} receiveShadow>
          <cylinderBufferGeometry attach="geometry" args={[5, 5, 0.1, 80]} />
          <meshStandardMaterial attach="material" color="grey" />
        </mesh>
        <mesh position={[0, 0.1, 0]} receiveShadow>
          <cylinderBufferGeometry
            attach="geometry"
            args={[3.5, 3.5, 0.2, 80]}
          />
          <meshStandardMaterial attach="material" color="grey" />
        </mesh>
      </group>
      <group name="floatingCard" position={[-3, 4, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxBufferGeometry attach="geometry" args={[1.5, 0.3, 0.2]} />
          <meshStandardMaterial attach="material" color="grey" />
        </mesh>
        <group position={[0, 0, 0.105]}>
          <Text color="purple">
            {isMobile
              ? "Tap the Shirt to Place an Order"
              : "Click the Shirt to Place an Order"}
          </Text>
        </group>
      </group>
    </group>
  );
};

export default SpacesDisplay;
