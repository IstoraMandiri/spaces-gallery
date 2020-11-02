import React from "react";
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

const LoadingScreen = () => {
  const { progress } = useProgress();

  return (
    <Container finished={progress === 100} landing={false}>
      {Math.floor(progress)}%
    </Container>
  );
};

export default LoadingScreen;
