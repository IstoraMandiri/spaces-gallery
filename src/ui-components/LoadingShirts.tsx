import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { EnvironmentStoreHook } from "stores/environment";

const TIMEOUT = 0; //ms, 0 for no timeout

const Container = styled.div<{ finished: boolean; start: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  background: white;
  transition: opacity 0.5s ease;
  transition-delay: 0.25s;
  opacity: ${(props) => (props.start ? 0 : 1)};
  pointer-events: ${(props) => (props.start ? "none" : "all")};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Lato", sans-serif;
`;

const Begin = styled.div<{ finished: boolean }>`
  color: darkblue;
  font-size: 1rem;
  outline: none;
  height: auto;
  width: auto;
  padding: 20px 20px 20px 20px;
  opacity: ${(props) => (props.finished ? 1 : 0)};
  transition: opacity 1s ease;
  transition-delay: 0.5s;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
`;

const BeginBackground = styled.div<{ finished: boolean }>`
  padding: 3px 3px 3px 3px;
  margin-top: 3%;
  background-image: linear-gradient(120deg, magenta, rebeccapurple);
  border-radius: 5px;
  opacity: ${(props) => (props.finished ? 1 : 0)};
  transition: opacity 1s ease;
  transition-delay: 0.5s;
`;

const Title = styled.div`
  font-size: 9vw;
  margin: 0 auto 5% auto;
  top: 25%;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 30px;
  border-radius: 15px;
  background-color: #d8d7d8;
`;

const Progress = styled.div<{ loading: number }>`
  width: ${(props) => Math.floor(props.loading * 100)}%;
  height: 100%;
  border-radius: 15px;
  background-image: linear-gradient(to right, magenta, rebeccapurple);
`;

type LoadingProps = {
  loading: number;
};
const LoadingProgress = ({ loading }: LoadingProps) => {
  return (
    <>
      <ProgressBar>
        <Progress loading={loading} />
      </ProgressBar>
    </>
  );
};

type LoadingScreenProps = {
  useEnvStore: EnvironmentStoreHook;
  name?: string;
};

const LoadingShirts = (props: LoadingScreenProps) => {
  const { useEnvStore, name = "Name" } = props;

  const loading = useEnvStore((st) => st.loading);
  const setLoading = useEnvStore((st) => st.setLoading);
  const setPaused = useEnvStore((st) => st.setPaused);
  const [start, setStart] = useState<boolean>(false);

  const handleClick = () => {
    setPaused(false);
    setStart(true);
  };

  useEffect(() => {
    if (TIMEOUT > 0) setTimeout(() => setLoading(1), TIMEOUT);
  }, [setLoading]);

  return (
    <Container finished={loading === 1} start={start}>
      <Title>Spaces x {name}</Title>
      {(loading * 100).toFixed(0)}%
      <LoadingProgress loading={loading} />
      <BeginBackground finished={loading === 1}>
        <Begin finished={loading === 1} onClick={handleClick}>
          Begin Experiment
        </Begin>
      </BeginBackground>
    </Container>
  );
};

export default LoadingShirts;
