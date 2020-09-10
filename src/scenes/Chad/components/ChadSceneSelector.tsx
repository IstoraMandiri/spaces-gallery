import React from "react";
import { useFrame, useThree } from "react-three-fiber";

import { EnvironmentStoreHook } from "stores/environment";

type SceneSelectorProps = {
  useEnvStore: EnvironmentStoreHook;
  sceneState: "gallery" | "falling" | "piece" | "ending";
  setSceneState: React.Dispatch<
    React.SetStateAction<"gallery" | "falling" | "piece" | "ending">
  >;
};

const ChadSceneSelector = (props: SceneSelectorProps) => {
  const { useEnvStore, sceneState, setSceneState } = props;
  const { camera } = useThree();

  useFrame(() => {
    if (camera.position.y < -50 && sceneState === "gallery") {
      setSceneState("falling");
    }

    if (camera.position.y < -50 && sceneState === "piece") {
      setSceneState("ending");
    }
  });

  return null;
};

export default ChadSceneSelector;
