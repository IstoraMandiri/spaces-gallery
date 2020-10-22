import React from "react";
import styled from "@emotion/styled";
import { EnvironmentStoreHook } from "stores/environment";

const ClickContainer = styled.div<{ paused: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.1);
  opacity: ${(props) => (props.paused ? 1 : 0)};
  pointer-events: ${(props) => (props.paused ? "all" : "none")};
`;

type OverlayProps = {
  useEnvStore: EnvironmentStoreHook;
  artist?: string;
  link?: string;
  title?: string;
};

const PauseMenu: React.FC<OverlayProps> = (props) => {
  const { useEnvStore, artist, title, link } = props;

  const paused = useEnvStore((st) => st.paused);
  const overlay = useEnvStore((st) => st.overlay);
  const setPaused = useEnvStore((st) => st.setPaused);

  const closeOverlay = () => setPaused(false);

  if (overlay) {
    return null;
  }

  return <ClickContainer paused={paused} onClick={closeOverlay} />;
};

export default PauseMenu;
