import React, { Suspense, useCallback, useRef, useState } from "react";
import { Physics, usePlane } from "use-cannon";
import { Canvas, useFrame } from "react-three-fiber";
import { Sky, OrbitControls, softShadows } from "drei";
import { SceneComponent } from "types/scene";
import * as THREE from "three";

import Analytics from "ui-components/Analytics";
import SpacesDisplay from "./components/SpacesDisplay";
import Prism from "./components/Prism";
import ShopOverlay from "../../overlays/ShopOverlay";

const Shop: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  const [overlay, setOverlay] = useState<boolean>(false);

  const cameraControls = {
    autoRotate: true,
    autoRotateSpeed: 1.25,
    enableKeys2: false,
    enableZoom: true,
    minDistance: 5.5,
    maxDistance: 15,
    minPolarAngle: Math.PI / 6,
    maxPolarAngle: Math.PI / 2.3,
    mouseButtons: {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.ROTATE,
      RIGHT: THREE.MOUSE.ROTATE,
    },
  };

  const Plane = (props: any) => {
    const [ref] = usePlane(() => ({ mass: 0, ...props }));
    return (
      <mesh ref={ref} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[500, 500]} />
        <shadowMaterial attach="material" opacity={0.5} />
      </mesh>
    );
  };

  const prismColors = ["#af9fff", "#fcfdfe", "#d7dbe2", "#dc7da8", "#8b8c89"];

  const Prisms = () => {
    const PrismArr = [];
    for (let i = 0; i < 30; i++) {
      PrismArr.push(
        <Prism
          useEnvStore={useEnvStore}
          scale={[Math.random() * 5, Math.random() * 5, Math.random() * 5]}
          position={[
            Math.floor(Math.random() * 40),
            Math.floor(Math.random() * 30) + 1.5,
            Math.floor(Math.random() * 40),
          ]}
          color={prismColors[Math.floor(Math.random() * prismColors.length)]}
        />
      );
      PrismArr.push(
        <Prism
          useEnvStore={useEnvStore}
          scale={[
            Math.random() * 4 + 2,
            Math.random() * 4 + 2,
            Math.random() * 4 + 2,
          ]}
          position={[
            Math.floor(-Math.random() * 40),
            Math.floor(Math.random() * 30) + 1.5,
            Math.floor(Math.random() * 40),
          ]}
          color={prismColors[Math.floor(Math.random() * prismColors.length)]}
        />
      );
      PrismArr.push(
        <Prism
          useEnvStore={useEnvStore}
          scale={[
            Math.random() * 4 + 2,
            Math.random() * 4 + 2,
            Math.random() * 4 + 2,
          ]}
          position={[
            Math.floor(Math.random() * 40),
            Math.floor(Math.random() * 30) + 1.5,
            Math.floor(-Math.random() * 40),
          ]}
          color={prismColors[Math.floor(Math.random() * prismColors.length)]}
        />
      );
      PrismArr.push(
        <Prism
          useEnvStore={useEnvStore}
          scale={[
            Math.random() * 4 + 2,
            Math.random() * 4 + 2,
            Math.random() * 4 + 2,
          ]}
          position={[
            Math.floor(-Math.random() * 40),
            Math.floor(Math.random() * 30) + 1.5,
            Math.floor(-Math.random() * 40),
          ]}
          color={prismColors[Math.floor(Math.random() * prismColors.length)]}
        />
      );
    }
    return <>{PrismArr}</>;
  };

  return (
    <>
      <Analytics />
      <Canvas
        {...defaultCanvasProps}
        camera={{ position: [1, 3, 7], far: 300 }}
      >
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
            useEnvStore={useEnvStore}
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
