import React, { useState } from "react";
import Transition from "./components/Transition";
import Loading from "./components/Loading";
import { useProgress } from "@react-three/drei";
import { useEnvironment } from "@spacesvr/core/utils/hooks";

type LoadingScreenProps = {
  setFixedPath: React.Dispatch<React.SetStateAction<boolean>>;
};

const PortalLoadingScreen = (props: LoadingScreenProps) => {
  const { setFixedPath } = props;

  const { setPaused } = useEnvironment();

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

export default PortalLoadingScreen;
