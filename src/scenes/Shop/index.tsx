import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import { Sky, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import { useAnalytics } from "services/analytics";
import SpacesDisplay from "./components/SpacesDisplay";
import Prisms from "./components/PrismArray";
import ShopOverlay from "./components/ShopOverlay";
import styled from "@emotion/styled";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;

  canvas {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    outline: 0;
  }
`;

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

  return (
    <Container>
      <Canvas shadowMap camera={{ position: [1, 3, 7], far: 300 }}>
        <Sky sunPosition={[0, 1, 0]} />
        <OrbitControls target={[0, 2, 0]} {...cameraControls} />
        <ambientLight intensity={0.2} />
        <pointLight
          position={[0, 75, 0]}
          intensity={1}
          color="white"
          castShadow
        />
        <Prisms />
        <SpacesDisplay
          position={[0, 0, 0]}
          overlay={overlay}
          setOverlay={setOverlay}
        />
        <mesh receiveShadow rotation-x={-Math.PI / 2}>
          <planeBufferGeometry attach="geometry" args={[500, 500]} />
          <shadowMaterial attach="material" opacity={0.5} />
        </mesh>
      </Canvas>
      <ShopOverlay overlay={overlay} setOverlay={setOverlay} />
    </Container>
  );
};

export default Shop;
