import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useProgress } from "@react-three/drei";

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
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TIMEOUT = 500;

const LoadingScreen = () => {
  const { progress, total } = useProgress();
  const [prDisplay, setPrDisplay] = useState(Math.floor(progress));
  useEffect(() => {
    console.log(`progress: ${Math.floor(progress)}\nprDisplay: ${prDisplay}`);
    if (Math.floor(progress) > prDisplay) {
      setPrDisplay(Math.floor(progress));
    }
  }, [progress]);
  // wait TIMEOUTms to check if any objects are waiting to be loaded
  const [counter, setCounter] = useState(0);
  const [skip, setSkip] = useState(false);
  useEffect(() => {
    if (total > 0) {
      return;
    } else if (counter > 0) {
      setSkip(true);
    } else {
      setTimeout(() => setCounter(counter + 1), TIMEOUT);
    }
  }, [counter]);

  return (
    <Container finished={skip || progress === 100} landing={false}>
      {prDisplay}%
    </Container>
  );
};

export default LoadingScreen;
