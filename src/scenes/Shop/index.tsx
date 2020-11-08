import React, { useState } from "react";
import { Physics, usePlane } from "@react-three/cannon";
import { Canvas } from "react-three-fiber";
import { Sky, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import { useAnalytics } from "services/analytics";
import SpacesDisplay from "./components/SpacesDisplay";
import Prisms from "./components/PrismArray";
import ShopOverlay from "./components/ShopOverlay";

const Shop = () => {
  const [overlay, setOverlay] = useState<boolean>(false);

  const cameraControls = {
    autoRotate: true,
    autoRotateSpeed: 1.25,
    enableKeys2: false,
    enableZoom: true,
    enablePan: false,
    minDistance: 5.5,
    maxDistance: 15,
    minPolarAngle: Math.PI / 6,
    maxPolarAngle: Math.PI / 2.3,
    cancelable: false,
    mouseButtons: {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.ROTATE,
      RIGHT: THREE.MOUSE.ROTATE,
    },
  };

  useAnalytics();

  const Plane = (props: any) => {
    const [ref] = usePlane(() => ({ mass: 0, ...props }));
    return (
      <mesh ref={ref} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[500, 500]} />
        <shadowMaterial attach="material" opacity={0.5} />
      </mesh>
    );
  };

  return (
    <>
      <Canvas camera={{ position: [1, 3, 7], far: 300 }}>
        <Sky />
        <OrbitControls target={[0, 2, 0]} {...cameraControls} />
        <ambientLight intensity={0.2} />
        <pointLight
          position={[0, 75, 0]}
          intensity={1}
          color="white"
          castShadow
        />
        <Prisms />
        <Physics>
          <SpacesDisplay
            position={[0, 0, 0]}
            overlay={overlay}
            setOverlay={setOverlay}
          />
          <Plane position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        </Physics>
      </Canvas>
      <ShopOverlay overlay={overlay} setOverlay={setOverlay} />
    </>
  );
};

export default Shop;
