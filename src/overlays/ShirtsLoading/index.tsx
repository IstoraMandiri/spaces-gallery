import React, { useEffect, useState } from "react";
import { EnvironmentStoreHook } from "stores/environment";
import Transition from "./components/Transition";
import Loading from "./components/Loading";

const TIMEOUT = 0; //ms, 0 for no timeout

type LoadingScreenProps = {
  useEnvStore: EnvironmentStoreHook;
  setFixedPath: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShirtsLoading = (props: LoadingScreenProps) => {
  const { useEnvStore, setFixedPath } = props;

  const loading = useEnvStore((st) => st.loading);
  const setLoading = useEnvStore((st) => st.setLoading);
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

  useEffect(() => {
    if (TIMEOUT > 0) setTimeout(() => setLoading(1), TIMEOUT);
  }, [setLoading]);

  return (
    <>
      <Loading progress={loading} />
      <Transition
        start={start}
        progress={loading}
        beginExperience={beginExperience}
        selfExplore={selfExplore}
      />
    </>
  );
};

export default ShirtsLoading;
