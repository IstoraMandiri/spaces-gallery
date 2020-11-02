import React, { useState } from "react";
import { EnvironmentStoreHook } from "@spacesvr/core/stores/environment";
import Transition from "./components/Transition";
import Loading from "./components/Loading";
import { useProgress } from "@react-three/drei";

type LoadingScreenProps = {
  useEnvStore: EnvironmentStoreHook;
  setFixedPath: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShirtsLoading = (props: LoadingScreenProps) => {
  const { useEnvStore, setFixedPath } = props;

  const setPaused = useEnvStore((st) => st.setPaused);
  const [start, setStart] = useState(false);

  const beginExperience = () => {
    setPaused(false);
    setStart(true);
  };

  const selfExplore = () => {
    setFixedPath(false);
    beginExperience();
  };

  const { progress } = useProgress();

  return (
    <>
      <Loading progress={progress} />
      <Transition
        start={start}
        beginExperience={beginExperience}
        selfExplore={selfExplore}
      />
    </>
  );
};

export default ShirtsLoading;
