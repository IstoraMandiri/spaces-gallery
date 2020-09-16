import React, { Suspense, useCallback, useRef, useState } from "react";
import { Physics, usePlane } from "use-cannon";
import { Canvas, useFrame } from "react-three-fiber";
import { Sky, OrbitControls } from "drei";
import { SceneComponent } from "types/scene";
import { Raycaster, Vector3 } from "three";
import * as THREE from "three";

import Analytics from "ui-components/Analytics";
import Player from "../../core/Player";
import SpacesDisplay from "./components/SpacesDisplay";
import { useShopify } from "../../services/shopify";

const Shop: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;
  // const shopifyState = useShopify()

  const raycaster = useRef(new Raycaster(new Vector3(), new Vector3(), 0, 3));

  const cameraControls = {
    autoRotate: true,
    autoRotateSpeed: 1.25,
    enableKeys2: false,
    enableZoom: true,
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
        <meshStandardMaterial attach="material" color="green" opacity={0.5} />
      </mesh>
    );
  };

  return (
    <>
      <Analytics />
      <Canvas
        {...defaultCanvasProps}
        camera={{ position: [1, 3, 6], far: 150 }}
      >
        <Sky />
        <OrbitControls {...cameraControls} />
        <ambientLight intensity={0.1} />
        <pointLight position={[7, 7, 0]} intensity={2} castShadow />
        <Physics>
          {/*<Player*/}
          {/*  useEnvStore={useEnvStore}*/}
          {/*  initPos={[0, 1, 0]}*/}
          {/*  initLook={[2, 1, 2]}*/}
          {/*  raycaster={raycaster}*/}
          {/*/>*/}
          <SpacesDisplay
            useEnvStore={useEnvStore}
            position={[0, 0, 0]}
            raycaster={raycaster}
          />
          <Plane position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        </Physics>
      </Canvas>
    </>
  );
};

export default Shop;
