import React from "react";
import { Physics } from "use-cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "three-components/InfinitePlane";
import Player from "core/Player";
import { SceneComponent } from "types/scene";
import HDRISky from "three-components/HDRI/HDRISky";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
};

const Outside: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  return (
    <>
      <Canvas {...defaultCanvasProps}>
        {children}
        <Physics {...physicsProps}>
          <InfinitePlane height={-0.001} />
          <HDRISky />
          <Player useEnvStore={useEnvStore} initPos={[0, 1, 20]} />
          <pointLight position={[0, 10, 0]} intensity={2} color={0xe2cbff} />
        </Physics>
      </Canvas>
    </>
  );
};

export default Outside;
