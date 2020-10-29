import React from "react";
import { useFrame, useThree } from "react-three-fiber";

import { EnvironmentStoreHook } from "@spacesvr/core/stores/environment";

type SceneSelectorProps = {
  sceneState: "gallery" | "falling" | "piece" | "ending";
  setSceneState: React.Dispatch<
    React.SetStateAction<"gallery" | "falling" | "piece" | "ending">
  >;
};

const ChadSceneSelector = (props: SceneSelectorProps) => {
  const { sceneState, setSceneState } = props;
  const { camera } = useThree();

  useFrame(() => {
    if (camera.position.y < -80 && sceneState === "gallery") {
      setSceneState("falling");
    }

    if (camera.position.y < -80 && sceneState === "piece") {
      setSceneState("ending");
    }
  });

  return null;
};

export default ChadSceneSelector;
