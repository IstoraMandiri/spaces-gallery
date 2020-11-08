import React, { Suspense } from "react";
import InfinitePlane from "@spacesvr/components/InfinitePlane";

import { useAnalytics } from "services/analytics";
import RealisticEffects from "@spacesvr/effects/RealisticEffects";
import WolvesCenter from "./models/WolvesCenter";
import { Vector3 } from "three";
import WolvesDecorations from "./models/WolvesDecorations";
import WolvesTitle from "./components/WolvesTitle";
import SpacesTitle from "./components/SpacesTitle";
import StandardEnvironment from "@spacesvr/core/environments/StandardEnvironment";
import Background from "@spacesvr/components/Background";
import Shop from "./components/Shop";

const Wolves = () => {
  useAnalytics();

  return (
    <StandardEnvironment
      canvasProps={{
        camera: { near: 0.1, far: 150 },
      }}
      player={{ pos: new Vector3(6, 5.5, 2) }}
    >
      <Background color={0x66e8ff} />
      <fog attach="fog" args={[0x66e8ff, 10, 60]} />
      <InfinitePlane height={-0.001} />
      <ambientLight intensity={1} />
      <directionalLight intensity={1} />
      <RealisticEffects />
      <WolvesTitle />
      <SpacesTitle />
      <Suspense fallback={null}>
        <WolvesCenter />
      </Suspense>
      <Suspense fallback={null}>
        <WolvesDecorations />
      </Suspense>
      <Shop />
    </StandardEnvironment>
  );
};

export default Wolves;
