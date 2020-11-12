import { useFrame, useThree } from "react-three-fiber";
import { Vector3 } from "three";
import { useEnvironment } from "spacesvr/core";
import { Dispatch, SetStateAction } from "react";

type SceneSelectorProps = {
  sceneState: "gallery" | "piece";
  setSceneState: Dispatch<SetStateAction<"gallery" | "piece">>;
};

const ChadSceneSelector = (props: SceneSelectorProps) => {
  const { sceneState, setSceneState } = props;
  const { camera } = useThree();
  const { player } = useEnvironment();

  useFrame(() => {
    if (camera.position.y < -80 && sceneState === "gallery") {
      player.controls.lock();
      player.position.set(new Vector3(0, 90, 0));
      player.velocity.set(new Vector3(0, -1, 0));
      setTimeout(() => setSceneState("piece"), 100);
      setTimeout(() => player.controls.unlock(), 2000);
    }

    if (camera.position.y < -80 && sceneState === "piece") {
      player.position.set(new Vector3(0, 90, 30));
      player.velocity.set(new Vector3(0, -1, 30));
      setTimeout(() => setSceneState("gallery"), 100);
    }
  });

  return null;
};

export default ChadSceneSelector;
