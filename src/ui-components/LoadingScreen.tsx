import React, { useEffect } from "react";
import { styled } from "twin.macro";
import { EnvironmentStoreHook } from "stores/environment";

const TIMEOUT = 0; //ms, 0 for no timeout

const Container = styled.div<{ finished: boolean; landing: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  background: white;
  transition: opacity 0.5s ease;
  transition-delay: 0.25s;
  opacity: ${(props) => (props.finished ? 0 : 1)};
  pointer-events: ${(props) => (props.finished ? "none" : "all")};
  display: flex;
  justify-content: ${(props) => (props.landing ? "center" : "flex-end")};
  align-items: center;
  flex-direction: column;
`;

type LoadingScreenProps = {
  useEnvStore: EnvironmentStoreHook;
};

const LoadingScreen = (props: LoadingScreenProps) => {
  const { useEnvStore } = props;

  const loading = useEnvStore((st) => st.loading);
  const setLoading = useEnvStore((st) => st.setLoading);

  useEffect(() => {
    if (TIMEOUT > 0) setTimeout(() => setLoading(1), TIMEOUT);
  }, [setLoading]);

  return (
    <Container finished={loading === 1} landing={false}>
      {(loading * 100).toFixed(0)}%
    </Container>
  );
};

export default LoadingScreen;
