import { Dispatch, SetStateAction, Suspense, useRef } from "react";
import { Text } from "@react-three/drei";

import SpacesShirt from "scenes/Shop/models/SpacesShirt";
import { isMobile } from "react-device-detect";

type DisplayProps = {
  shopifyState?: any;
  position: [number, number, number];
  overlay: boolean;
  setOverlay: Dispatch<SetStateAction<boolean>>;
};

const SpacesDisplay = (props: DisplayProps) => {
  const { position, overlay, setOverlay } = props;
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
          <SpacesShirt overlay={overlay} setOverlay={setOverlay} />
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
      <group name="floatingCard" position={[0, 1, 1.5]} scale={[1.5, 1.5, 1.5]}>
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
