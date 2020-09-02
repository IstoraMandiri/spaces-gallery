import React from "react";
import styled from "@emotion/styled";
import { EnvironmentStoreHook } from "stores/environment";

const Container = styled.div<{ paused: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9;
`;

const ClickContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
`;

const Window = styled.div`
  width: 60px;
  height: 60px;
  margin: 10px;
  border-radius: 50%;
  text-align: center;
  background: url("https://spaces-gallery-assets.s3-us-west-1.amazonaws.com/images/spacesLogoReal.png")
    center center no-repeat;
  background-size: cover;
`;

type MobilePauseProps = {
  useEnvStore: EnvironmentStoreHook;
};

const MobilePause = (props: MobilePauseProps) => {
  const { useEnvStore } = props;

  const paused = useEnvStore((st) => st.paused);
  const setPaused = useEnvStore((st) => st.setPaused);

  const togglePause = () => setPaused(!paused);

  return (
    <Container paused={paused}>
      <ClickContainer onClick={togglePause} />
      {!paused ? <Window /> : null}
    </Container>
  );
};

export default MobilePause;
